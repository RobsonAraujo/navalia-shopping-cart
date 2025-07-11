"use client";

import { Typography } from "@mui/material";
import { UserTypeToggle } from "@/app/components/userTypeToggle/UserTypeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen from-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full space-y-6 p-8 bg-white shadow-xl rounded-xl">
        <Typography variant="h4" fontWeight={700}>
          🛒 Super Shop
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Welcome! Choose your user type to begin shopping:
        </Typography>

        <UserTypeToggle />
      </div>
    </main>
  );
}
