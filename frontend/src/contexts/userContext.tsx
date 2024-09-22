"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { IUser, ÏToken } from "@/types/user";
import { setCookies, getCookies, removeCookies } from "@/utils/cookies";

interface UserContextType {
  user: IUser | null;
  token?: ÏToken | null;
  login: (token: ÏToken) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null); // add this for user data to access globally but right now we don't need
  const [token, setToken] = useState<ÏToken | null>(null);

  useEffect(() => {
    const savedToken = getCookies<ÏToken>("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (newToken: ÏToken) => {
    setToken(newToken);
    setCookies("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeCookies("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
