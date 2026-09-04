'use client';

import { useState, useEffect } from 'react';

const AUTH_KEY = 'arohana_admin_auth_v1';
const ADMIN_EMAIL = 'admin@arohana.com';
const ADMIN_PASSWORD = 'Arohana@2026';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  loginAt: string;
}

export function getStoredAuth(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      return JSON.parse(raw) as AdminUser;
    }
  } catch (e) {
    console.error('[Auth] Error reading auth state:', e);
  }
  return null;
}

export function performLogin(email: string, pass: string): { success: boolean; error?: string; user?: AdminUser } {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPass = pass.trim();

  if (trimmedEmail === ADMIN_EMAIL.toLowerCase() && trimmedPass === ADMIN_PASSWORD) {
    const user: AdminUser = {
      email: ADMIN_EMAIL,
      name: 'Ārohana Executive Admin',
      role: 'Principal Consultant & Administrator',
      loginAt: new Date().toISOString(),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    return { success: true, user };
  }

  return {
    success: false,
    error: 'Invalid email or password. Please verify your administrator credentials.',
  };
}

export function performLogout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredAuth());
    setIsLoading(false);
  }, []);

  const login = (email: string, pass: string) => {
    const result = performLogin(email, pass);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    performLogout();
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    demoCredentials: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    },
  };
}
