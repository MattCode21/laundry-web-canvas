
import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  adminId: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  // Mock login function
  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    if (username && password) {
      const mockUser = {
        id: "250878",
        name: "Athel Sumoj",
        adminId: "250878",
        role: "Washing Man",
        avatar: "/profile-image.png"
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
