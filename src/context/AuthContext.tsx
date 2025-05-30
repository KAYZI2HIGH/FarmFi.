"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JWT {
  user: User;
  exp: number;
  iat: number;
}

interface Farm {
  type: string;
  address: string;
}

interface Location {
  home: string;
  state: string;
}

interface User {
  _v: number;
  _id: string;
  name: string;
  email: string;
  imgUrl: string;
  kycVerified: boolean;
  NIN: string;
  farm: Farm;
  location: Location;
  role?: string;
  suiWalletAddress: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isTokenExpired: (token?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isTokenExpired = (token?: string) => {
    const checkToken = token || Cookies.get("authToken");
    if (!checkToken) return true;

    try {
      const { exp } = jwtDecode<JWT>(checkToken);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      const token = Cookies.get("authToken");

      if (!token || isTokenExpired(token)) {
        logout();
        setIsLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<JWT>(token);
        setUser(decoded.user);
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string) => {
    if (isTokenExpired(token)) {
      logout();
      return;
    }

    Cookies.set("authToken", token, {
      expires: 5,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const decoded = jwtDecode<JWT>(token);
    setUser(decoded.user);
  };

  const logout = () => {
    Cookies.remove("authToken", {
      path: "/",
      domain: window.location.hostname,
    });
    setUser(null);
  };

  const isAuthenticated = !!user && !isTokenExpired();

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
        isTokenExpired,
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
