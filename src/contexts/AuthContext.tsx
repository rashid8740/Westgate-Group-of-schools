"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi, tokenManager } from "@/lib/api";

interface Admin {
  _id: string;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
  createdAt: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a valid token on app load
    const initializeAuth = async () => {
      const token = tokenManager.getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await authApi.verifyToken();

        if (response.success && response.data.admin) {
          setIsAuthenticated(true);
          setAdmin(response.data.admin);
        } else {
          // Token is invalid, clear it
          tokenManager.removeToken();
        }
      } catch (error) {
        console.warn("Token verification failed:", error);
        tokenManager.removeToken();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await authApi.login(username, password);

      if (response.success && response.data.admin) {
        setIsAuthenticated(true);
        setAdmin(response.data.admin);

        // Log successful login
        console.log("✅ Admin login successful:", response.data.admin.username);

        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: response.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.",
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
      console.log("📝 Admin logout successful");
    } catch (error) {
      console.warn("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        admin,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
