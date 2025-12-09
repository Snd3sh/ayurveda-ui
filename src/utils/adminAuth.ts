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
  
  if (cachedAuth) {
    return cachedAuth;
  }
  
  try {
    const auth = await authApi.getMe();
    // Only cache successful authentications, not failures
    // This prevents caching "not authenticated" when cookie might not be immediately available
    if (auth.authenticated) {
      cachedAuth = auth;
    }
    return auth;
  } catch (error) {
    console.error('[checkAdminAuth] Error checking auth:', error);
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
