// src/services/userService.ts
import { toast } from 'react-toastify';
import { User } from '../types/user';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/users";

interface UserResponse {
  success: boolean;
  message?: string;
  user?: User;
  users?: User[];
  error?: string;
  details?: unknown;
}

interface UsersListResponse extends UserResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface SearchUsersResponse extends UserResponse {
  users: User[];
  count: number;
}

interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
}

interface SearchUsersParams {
  query: string;
  role?: string;
  isActive?: boolean;
  limit?: number;
}

const handleError = async (res: Response): Promise<UserResponse> => {
  const data = await res.json();
  toast.error(data.error || 'Something went wrong');
  return {
    success: false,
    error: data.error || 'Unknown error',
    details: data.details
  };
};

export const getAllUsers = async (
  token: string, 
  params: GetAllUsersParams = {}
): Promise<UsersListResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.role) searchParams.append('role', params.role);
    if (params.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());

    const url = `${BASE_URL}?${searchParams.toString()}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res) as UsersListResponse;
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching users');
    return { 
      success: false, 
      error: String(error),
      users: [],
      pagination: { page: 1, limit: 10, total: 0, pages: 0 }
    };
  }
};

export const getUserById = async (token: string, id: string): Promise<UserResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching user');
    return { success: false, error: String(error) };
  }
};

export const searchUsers = async (
  token: string, 
  params: SearchUsersParams
): Promise<SearchUsersResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('query', params.query);
    
    if (params.role) searchParams.append('role', params.role);
    if (params.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const url = `${BASE_URL}/search?${searchParams.toString()}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res) as SearchUsersResponse;
    return await res.json();
  } catch (error) {
    toast.error('Network error while searching users');
    return { 
      success: false, 
      error: String(error),
      users: [],
      count: 0
    };
  }
};

export const deleteUser = async (token: string, id: string): Promise<UserResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'User deleted successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while deleting user');
    return { success: false, error: String(error) };
  }
};

export const deactivateUser = async (token: string, id: string): Promise<UserResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/deactivate`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'User deactivated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while deactivating user');
    return { success: false, error: String(error) };
  }
};

export const activateUser = async (token: string, id: string): Promise<UserResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/activate`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'User activated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while activating user');
    return { success: false, error: String(error) };
  }
};

// Re-export getProfile from authService for convenience
export { getProfile } from './authService';