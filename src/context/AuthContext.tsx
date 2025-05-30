"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JWT {
  user: User;
  exp: number;
}

interface Farm {}
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
  kycVerified: string;
  NIN: string;
  farm: Farm;
  location: Location;
  role?: string;
  suiWallteAddress: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JWT>(token);
        console.log(decoded);
        setUser(decoded.user);
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    Cookies.set("authToken", token, { expires: 5 });
    const decoded = jwtDecode<JWT>(token);
    setUser(decoded.user);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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
