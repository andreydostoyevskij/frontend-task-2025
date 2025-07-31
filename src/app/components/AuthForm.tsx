"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./../components/store/auth";

type Role = "member" | "partner";

const credentials = {
  member: {
    email: "member@valid.email",
    password: "Member123!",
    otp: "151588",
  },
  partner: {
    email: "partner@valid.email",
    password: "Partner123!",
    otp: "262699",
  },
};

export function AuthForm() {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [role, setRole] = useState<Role>("member");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = credentials[role];
    if (email === valid.email && password === valid.password) {
      setStep("otp");
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = credentials[role];
    if (otp === valid.otp) {
      login(email, role);
      router.push("/dashboard");
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <form
      onSubmit={step === "login" ? handleLogin : handleOtp}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">
        {step === "login" ? "Login" : "Enter OTP"}
      </h2>

      {step === "login" && (
        <>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full p-2 border rounded"
          >
            <option value="member">Member</option>
            <option value="partner">Partner</option>
          </select>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
        </>
      )}

      {step === "otp" && (
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-2 border rounded"
          required
        />
      )}

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full p-2 rounded text-white"
        style={{
          backgroundColor: role === "member" ? "#2AFC98" : "#119DA4",
        }}
      >
        {step === "login" ? "Next" : "Verify OTP"}
      </button>
    </form>
  );
}
