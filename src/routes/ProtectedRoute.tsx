import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAdminAuth } from '../utils/adminAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Check if we might be coming from an OAuth redirect
    // OAuth redirects often happen right after page load
    const isLikelyOAuthRedirect = document.referrer.includes('accounts.google.com') || 
                                   document.referrer.includes('api-kritiayurveda') ||
                                   performance.getEntriesByType('navigation')[0]?.type === 'reload';
    
    const verifyAuth = async (retry = 0) => {
      // Force refresh on first check and retries to avoid cached false negatives
      const auth = await checkAdminAuth(retry === 0);
      
      // If not authenticated and we haven't retried yet, wait a bit and retry
      // This handles the case where cookie might not be immediately available after OAuth redirect
      // Increase retries and delay for cross-origin cookie timing
      if (!auth.authenticated && retry < 5) {
        // Longer delays for OAuth redirects (cross-origin cookies take time)
        const baseDelay = isLikelyOAuthRedirect ? 1500 : 500;
        const delay = retry === 0 ? baseDelay : Math.min(baseDelay, 1000);
        console.log(`[ProtectedRoute] Auth check failed, retrying in ${delay}ms... (attempt ${retry + 1}/5, likelyOAuth: ${isLikelyOAuthRedirect})`);
        setTimeout(() => {
          verifyAuth(retry + 1);
          setRetryCount(retry + 1);
        }, delay);
        return;
      }
      
      console.log('[ProtectedRoute] Auth check result:', {
        authenticated: auth.authenticated,
        isAdmin: auth.isAdmin,
        email: auth.user?.email,
        retries: retry,
        likelyOAuth: isLikelyOAuthRedirect,
      });
      
      setIsAuthenticated(auth.authenticated);
      setIsAdmin(auth.isAdmin || false);
    };
    
    // Longer initial delay if coming from OAuth redirect (cross-origin cookie timing)
    const initialDelay = isLikelyOAuthRedirect ? 500 : 100;
    console.log(`[ProtectedRoute] Starting auth check (initial delay: ${initialDelay}ms, likelyOAuth: ${isLikelyOAuthRedirect})`);
    
    const timer = setTimeout(() => {
      verifyAuth();
    }, initialDelay);
    
    return () => clearTimeout(timer);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary">
          {retryCount > 0 ? 'Verifying authentication...' : 'Loading...'}
        </div>
      </div>
    );
  }

  // Only allow authenticated admin users to access admin pages
  if (!isAuthenticated) {
    console.log('[ProtectedRoute] User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    console.log('[ProtectedRoute] User is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
