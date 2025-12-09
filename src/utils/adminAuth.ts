import { authApi } from './api';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  role: string;
}

let cachedAuth: { authenticated: boolean; isAdmin?: boolean; user?: AdminUser } | null = null;

export const checkAdminAuth = async (): Promise<{
  authenticated: boolean;
  isAdmin?: boolean;
  user?: AdminUser;
}> => {
  if (cachedAuth) {
    return cachedAuth;
  }
  
  const auth = await authApi.getMe();
  cachedAuth = auth;
  return auth;
};

export const clearAuthCache = (): void => {
  cachedAuth = null;
};

export const logout = async (): Promise<void> => {
  await authApi.logout();
  clearAuthCache();
};
