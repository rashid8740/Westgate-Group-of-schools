// API utility functions for backend communication

// Normalize base URL: remove trailing slashes
const RAW_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

// Token management
const TOKEN_KEY = 'westgate_admin_token';

export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  }
};

// API request helper
interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
}

async function apiRequest<T>(
  endpoint: string, 
  options: ApiRequestOptions = {}
): Promise<T> {
  const { requireAuth = false, ...fetchOptions } = options;

  // Normalize endpoint: ensure single leading slash and avoid double /api
  let normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const baseEndsWithApi = /\/api$/i.test(API_BASE_URL);
  if (baseEndsWithApi && /^\/api(\/|$)/i.test(normalizedEndpoint)) {
    normalizedEndpoint = normalizedEndpoint.replace(/^\/api/i, '');
    if (!normalizedEndpoint.startsWith('/')) normalizedEndpoint = `/${normalizedEndpoint}`;
  }
  const url = `${API_BASE_URL}${normalizedEndpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Add authorization header if token exists and auth is required
  if (requireAuth) {
    const token = tokenManager.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle token expiry
    if (response.status === 401 && requireAuth) {
      tokenManager.removeToken();
      // Redirect to login if on admin page
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
      throw new Error('Authentication expired. Please login again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Authentication API
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        admin: any;
        token: string;
        expiresIn: string;
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success && response.data.token) {
      tokenManager.setToken(response.data.token);
    }

    return response;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
        requireAuth: true,
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      tokenManager.removeToken();
    }
  },

  verifyToken: async () => {
    return await apiRequest<{
      success: boolean;
      data: { admin: any };
    }>('/auth/verify-token', {
      method: 'POST',
      requireAuth: true,
    });
  },

  getProfile: async () => {
    return await apiRequest<{
      success: boolean;
      data: { admin: any };
    }>('/auth/profile', {
      requireAuth: true,
    });
  }
};

// Applications API
export const applicationsApi = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : '';
    return await apiRequest<{
      success: boolean;
      data: {
        applications: any[];
        pagination: any;
      };
    }>(`/applications${query}`, {
      requireAuth: true,
    });
  },

  getById: async (id: string) => {
    return await apiRequest<{
      success: boolean;
      data: { application: any };
    }>(`/applications/${id}`, {
      requireAuth: true,
    });
  },

  updateStatus: async (id: string, status: string, reviewNotes?: string) => {
    return await apiRequest<{
      success: boolean;
      data: { application: any };
    }>(`/applications/${id}/status`, {
      method: 'PUT',
      requireAuth: true,
      body: JSON.stringify({ status, reviewNotes }),
    });
  },

  create: async (applicationData: any) => {
    return await apiRequest<{
      success: boolean;
      data: { application: any };
    }>('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  getStats: async () => {
    return await apiRequest<{
      success: boolean;
      data: any;
    }>('/applications/stats', {
      requireAuth: true,
    });
  }
};

// Messages API
export const messagesApi = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : '';
    return await apiRequest<{
      success: boolean;
      data: {
        messages: any[];
        pagination: any;
      };
    }>(`/messages${query}`, {
      requireAuth: true,
    });
  },

  getById: async (id: string) => {
    return await apiRequest<{
      success: boolean;
      data: { message: any };
    }>(`/messages/${id}`, {
      requireAuth: true,
    });
  },

  create: async (messageData: any) => {
    return await apiRequest<{
      success: boolean;
      data: { message: any };
    }>('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  respond: async (id: string, response: string) => {
    return await apiRequest<{
      success: boolean;
      data: { message: any };
    }>(`/messages/${id}/respond`, {
      method: 'PUT',
      requireAuth: true,
      body: JSON.stringify({ response }),
    });
  },

  updateStatus: async (id: string, status: string) => {
    return await apiRequest<{
      success: boolean;
      data: { message: any };
    }>(`/messages/${id}/status`, {
      method: 'PUT',
      requireAuth: true,
      body: JSON.stringify({ status }),
    });
  },

  update: async (id: string, updateData: any) => {
    return await apiRequest<{
      success: boolean;
      data: { message: any };
    }>(`/messages/${id}`, {
      method: 'PUT',
      requireAuth: true,
      body: JSON.stringify(updateData),
    });
  },

  getStats: async () => {
    return await apiRequest<{
      success: boolean;
      data: any;
    }>('/messages/stats', {
      requireAuth: true,
    });
  }
};

// Contact API
export const contactApi = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : '';
    return await apiRequest<{
      success: boolean;
      data: {
        contacts: any[];
        pagination: any;
      };
    }>(`/contact/admin${query}`, {
      requireAuth: true,
    });
  },

  getStats: async () => {
    return await apiRequest<{
      success: boolean;
      data: any;
    }>('/contact/admin/stats', {
      requireAuth: true,
    });
  },

  updateStatus: async (id: string, status: string, notes?: string, assignedTo?: string) => {
    return await apiRequest<{
      success: boolean;
      data: { contact: any };
    }>(`/contact/admin/${id}`, {
      method: 'PUT',
      requireAuth: true,
      body: JSON.stringify({ status, notes, assignedTo }),
    });
  }
};

// Gallery API
export const galleryApi = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : '';
    return await apiRequest<{
      success: boolean;
      data: {
        images: any[];
        pagination: any;
      };
    }>(`/gallery${query}`);
  },

  getById: async (id: string) => {
    return await apiRequest<{
      success: boolean;
      data: { image: any };
    }>(`/gallery/${id}`);
  },

  upload: async (formData: FormData) => {
    const token = tokenManager.getToken();
    const headers: Record<string, string> = {};
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // If there are specific validation errors, show them
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const errorMessages = errorData.errors.map((err: any) => err.msg || err.message).join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }
      
      throw new Error(errorData.message || `Upload failed: ${response.statusText}`);
    }

    return await response.json();
  },

  update: async (id: string, updateData: any) => {
    return await apiRequest<{
      success: boolean;
      data: { image: any };
    }>(`/gallery/${id}`, {
      method: 'PUT',
      requireAuth: true,
      body: JSON.stringify(updateData),
    });
  },

  delete: async (id: string) => {
    return await apiRequest<{
      success: boolean;
    }>(`/gallery/${id}`, {
      method: 'DELETE',
      requireAuth: true,
    });
  },

  getCategories: async () => {
    return await apiRequest<{
      success: boolean;
      data: { categories: any[] };
    }>('/gallery/categories');
  },

  getStats: async () => {
    return await apiRequest<{
      success: boolean;
      data: any;
    }>('/gallery/stats', {
      requireAuth: true,
    });
  }
};

// Health check
export const healthApi = {
  check: async () => {
    return await apiRequest<{
      success: boolean;
      message: string;
      timestamp: string;
      environment: string;
    }>('/health');
  }
};

export default {
  auth: authApi,
  applications: applicationsApi,
  messages: messagesApi,
  gallery: galleryApi,
  health: healthApi,
};