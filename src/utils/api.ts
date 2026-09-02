import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include token from localStorage in Authorization header
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (for cross-origin cookie issues)
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Log only for auth endpoints to avoid spam
      if (config.url?.includes("/auth/")) {
        console.log(
          "[apiClient] Adding Authorization header to request:",
          config.url,
        );
      }
    } else if (config.url?.includes("/auth/me")) {
      console.warn("[apiClient] No token in localStorage for auth request");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Product API
export const productApi = {
  getAll: async (params?: {
    category?: string;
    featured?: boolean;
  }): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get("/api/products", { params });
    return response.data;
  },
  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },
  create: async (data: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.post("/api/products", data);
    return response.data;
  },
  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.put(`/api/products/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  },
};

// Order API
export const orderApi = {
  create: async (data: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.post("/api/orders", data);
    return response.data;
  },
  getAll: async (): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get("/api/orders");
    return response.data;
  },
  getMy: async (): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get("/api/orders/my");
    return response.data;
  },
  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  },
  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.put(`/api/orders/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/api/orders/${id}`);
    return response.data;
  },
};

// Recommendation API
export const recommendationApi = {
  getForProduct: async (
    productId: string,
    limit = 6,
  ): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get(`/api/recommendations/${productId}`, {
      params: { limit },
    });
    return response.data;
  },
};

// Auth API
export const authApi = {
  getMe: async (): Promise<{
    authenticated: boolean;
    isAdmin?: boolean;
    user?: any;
  }> => {
    try {
      console.log("[authApi.getMe] Making request to /api/auth/me");
      console.log("[authApi.getMe] API URL:", apiClient.defaults.baseURL);
      console.log(
        "[authApi.getMe] withCredentials:",
        apiClient.defaults.withCredentials,
      );

      const response = await apiClient.get("/api/auth/me");
      console.log("[authApi.getMe] Response received:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
      return response.data;
    } catch (error: any) {
      // Log error details for debugging
      console.error("[authApi.getMe] ===== ERROR DETAILS =====");
      if (error.response) {
        console.error("[authApi.getMe] API error:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        console.error("[authApi.getMe] Network error - No response:", {
          message: error.message,
          request: error.request,
        });
      } else {
        console.error("[authApi.getMe] Error:", error.message);
      }
      console.error("[authApi.getMe] Full error:", error);
      console.error("[authApi.getMe] ===== END ERROR =====");
      return { authenticated: false };
    }
  },
  logout: async (): Promise<void> => {
    await apiClient.post("/api/auth/logout");
  },
};

// Cart API
export const cartApi = {
  getCart: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get("/api/cart");
    return response.data;
  },
  addToCart: async (data: {
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }): Promise<ApiResponse<any>> => {
    const response = await apiClient.post("/api/cart/add", data);
    return response.data;
  },
  updateQuantity: async (
    productId: string,
    quantity: number,
  ): Promise<ApiResponse<any>> => {
    const response = await apiClient.put(`/api/cart/${productId}`, {
      quantity,
    });
    return response.data;
  },
  removeFromCart: async (productId: string): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete(`/api/cart/${productId}`);
    return response.data;
  },
  clearCart: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete("/api/cart");
    return response.data;
  },
};

// Upload API
export const uploadApi = {
  uploadImage: async (
    file: File,
  ): Promise<ApiResponse<{ url: string; publicId: string }>> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post("/api/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default apiClient;
