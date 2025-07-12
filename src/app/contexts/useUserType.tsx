"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserType } from "@/app/types/cart";

type UserTypeContextType = {
  userType: UserType;
  setUserType: (type: UserType) => void;
};

const UserTypeContext = createContext<UserTypeContextType | undefined>(
  undefined
);

export function UserTypeProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>("common");

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType as UserType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
}

export function useUserType() {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error("useUserType must be used within UserTypeProvider");
  }
  return context;
}
