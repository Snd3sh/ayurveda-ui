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
    });
    
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
};

export const logout = async (): Promise<void> => {
  await authApi.logout();
  clearAuthCache();
};
