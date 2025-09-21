// src/services/authService.ts
import { toast } from 'react-toastify';
import { User } from '../../types/user';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/auth"

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  error?: string;
}

const handleError = async (res: Response): Promise<AuthResponse> => {
  const data = await res.json();
  toast.error(data.error || 'Something went wrong');
  return {
    success: false,
    error: data.error || 'Unknown error',
  };
};

export const register = async (token: string): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error during registration');
    return { success: false, error: String(error) };
  }
};

export const login = async (token: string): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error during login');
    return { success: false, error: String(error) };
  }
};

export const getProfile = async (token: string): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching profile');
    return { success: false, error: String(error) };
  }
};

export const logout = async (token: string): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error during logout');
    return { success: false, error: String(error) };
  }
};
