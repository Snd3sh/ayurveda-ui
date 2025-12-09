import { authApi } from './api';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  role: string;
}

let cachedAuth: { authenticated: boolean; isAdmin?: boolean; user?: AdminUser } | null = null;

export const checkAdminAuth = async (forceRefresh = false): Promise<{
  authenticated: boolean;
  isAdmin?: boolean;
  user?: AdminUser;
}> => {
  // Clear cache if force refresh is requested (useful after login)
  if (forceRefresh) {
    cachedAuth = null;
  }
  
  // Don't use cache if force refresh is requested
  if (cachedAuth && !forceRefresh) {
    return cachedAuth;
  }
  
  try {
    // Check if cookies are enabled (basic check)
    if (!navigator.cookieEnabled) {
      console.warn('[checkAdminAuth] Cookies are disabled in browser!');
    }
    
    const auth = await authApi.getMe();
    console.log('[checkAdminAuth] Auth result:', {
      authenticated: auth.authenticated,
      isAdmin: auth.isAdmin,
      email: auth.user?.email,
      forceRefresh,
      cookiesEnabled: navigator.cookieEnabled,
      debug: (auth as any).debug, // Log debug info from backend
    });
    
    // If not authenticated and we have debug info, log it
    if (!auth.authenticated && (auth as any).debug) {
      console.warn('[checkAdminAuth] ⚠️ Authentication failed - Debug info:', (auth as any).debug);
    }
    
    // Only cache successful authentications, not failures
    // This prevents caching "not authenticated" when cookie might not be immediately available
    if (auth.authenticated) {
      cachedAuth = auth;
    } else {
      // Clear cache on failure to allow retries
      cachedAuth = null;
    }
    return auth;
  } catch (error: any) {
    console.error('[checkAdminAuth] Error checking auth:', error);
    
    // Log more details about the error
    if (error.response) {
      console.error('[checkAdminAuth] API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('[checkAdminAuth] Network Error - No response received:', error.message);
    }
    
    cachedAuth = null; // Clear cache on error
    return { authenticated: false };
  }
};

export const clearAuthCache = (): void => {
  cachedAuth = null;
  console.log('[clearAuthCache] Auth cache cleared');
};

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).clearAuthCache = clearAuthCache;
  (window as any).testAuth = async () => {
    console.log('=== Testing Authentication ===');
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const token = localStorage.getItem('auth_token');
    
    console.log('Token in localStorage:', token ? `Found (${token.length} chars)` : 'Not found');
    
    // Test 1: Check /me endpoint with Authorization header
    console.log('Test 1: Checking auth status with Authorization header...');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const authCheck = await fetch(`${apiUrl}/api/auth/me`, {
      credentials: 'include',
      headers,
    }).then(r => r.json());
    console.log('Auth check response:', authCheck);
    
    // Test 2: Check test-cookie endpoint (for cookie testing)
    console.log('Test 2: Testing cookie setting...');
    const testCookie = await fetch(`${apiUrl}/api/auth/test-cookie`, {
      credentials: 'include'
    }).then(r => r.json());
    console.log('Test cookie response:', testCookie);
    
    // Test 3: Check cookies in browser
    console.log('Test 3: Check Application → Cookies in DevTools');
    console.log('Cookies enabled:', navigator.cookieEnabled);
    console.log('localStorage token:', token ? '✅ Present' : '❌ Missing');
    
    return { testCookie, authCheck, hasToken: !!token };
  };
  console.log('[adminAuth] Debug functions available:');
  console.log('  - clearAuthCache() - Clear auth cache');
  console.log('  - testAuth() - Run authentication tests');
}

export const logout = async (): Promise<void> => {
  try {
    await authApi.logout();
  } catch (error) {
    console.error('[logout] Error calling logout API:', error);
  }
  // Clear localStorage token (for cross-origin scenarios)
  localStorage.removeItem('auth_token');
  clearAuthCache();
  console.log('[logout] ✅ Logged out - cleared token and cache');
};
