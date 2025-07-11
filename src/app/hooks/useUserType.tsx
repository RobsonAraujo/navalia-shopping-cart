"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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
