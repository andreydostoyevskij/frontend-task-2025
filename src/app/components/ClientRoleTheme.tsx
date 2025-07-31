"use client";

import { useEffect } from "react";
import { useAuthStore } from "./store/auth";

const ROLE_CLASSES = ["theme-member", "theme-partner"];

function ClientRoleTheme() {
  const { role } = useAuthStore();

  useEffect(() => {
    const body = document.body;

    // Remove all role-based classes to prevent conflicts
    ROLE_CLASSES.forEach((cls) => body.classList.remove(cls));

    // Add the current role's theme class, if a role is set
    if (role) {
      body.classList.add(`theme-${role}`);
    }
  }, [role]);

  return null; // This component doesn't render any visible UI
}
