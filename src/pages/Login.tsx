import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { checkAdminAuth } from '../utils/adminAuth';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const [authState, setAuthState] = useState<{ authenticated: boolean; isAdmin?: boolean; user?: any } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Force refresh to avoid cached false negatives
        const auth = await checkAdminAuth(true);
        setAuthState(auth);
        setIsChecking(false);
        
        const error = searchParams.get('error');
        
        // If user is authenticated, redirect based on role
        if (auth.authenticated) {
          console.log('[Login] User authenticated, redirecting:', { isAdmin: auth.isAdmin, error });
          if (auth.isAdmin) {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        } else {
          // If not authenticated and there's an error, show error message
          if (error) {
            console.log('[Login] Authentication failed with error:', error);
          } else {
            console.log('[Login] User not authenticated, showing login button');
          }
        }
      } catch (error) {
        console.error('[Login] Error checking auth:', error);
        setIsChecking(false);
      }
    };
    
    checkAuth();
  }, [navigate, searchParams]);

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const loginUrl = `${apiUrl}/api/auth/google`;
    console.log('[Login] Redirecting to OAuth:', loginUrl);
    window.location.href = loginUrl;
  };

  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2C7A3B] to-[#9CCC65] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-lightText mb-2">Login</h1>
          <p className="text-gray-600">Sign in with your Google account</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error === 'auth_failed' && 'Authentication failed. Please try again.'}
              {error === 'unauthorized' && 'You are not authorized to access this account.'}
              {error === 'server_error' && 'Server error. Please try again later.'}
              {!['auth_failed', 'unauthorized', 'server_error'].includes(error) && 'An error occurred. Please try again.'}
            </p>
          </div>
        )}
        
        {isChecking && (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600">Checking authentication...</p>
          </div>
        )}
        
        {!isChecking && authState?.authenticated && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">
              You are already logged in as {authState.user?.name || 'User'}.
            </p>
            <div className="mt-2 flex gap-2">
              <Link
                to="/"
                className="text-xs text-green-700 dark:text-green-300 hover:underline"
              >
                Go to Homepage
              </Link>
              {authState.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-xs text-green-700 dark:text-green-300 hover:underline"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
        
        {(!isChecking && !authState?.authenticated) && (
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center"
          >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
