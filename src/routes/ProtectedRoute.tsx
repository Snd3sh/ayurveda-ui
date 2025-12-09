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
    const verifyAuth = async (retry = 0) => {
      // Force refresh on first check and retries to avoid cached false negatives
      const auth = await checkAdminAuth(retry === 0);
      
      // If not authenticated and we haven't retried yet, wait a bit and retry
      // This handles the case where cookie might not be immediately available after OAuth redirect
      if (!auth.authenticated && retry < 2) {
        console.log(`[ProtectedRoute] Auth check failed, retrying... (attempt ${retry + 1})`);
        setTimeout(() => {
          verifyAuth(retry + 1);
          setRetryCount(retry + 1);
        }, 500); // Wait 500ms before retry
        return;
      }
      
      console.log('[ProtectedRoute] Auth check result:', {
        authenticated: auth.authenticated,
        isAdmin: auth.isAdmin,
        email: auth.user?.email,
      });
      
      setIsAuthenticated(auth.authenticated);
      setIsAdmin(auth.isAdmin || false);
    };
    verifyAuth();
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
