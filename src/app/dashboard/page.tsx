"use client";

import { useAuthStore } from "./../components/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { email, role, loggedIn, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {role}!</h1>
      <p>Your email: {email}</p>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
