"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../lib/api";
import { saveToken } from "../../../lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await registerUser(name, email, password, role);
      saveToken(data.token);
      router.push("/deals");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md border p-6 rounded-xl space-y-4"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>

        {error && <p className="text-red-400">{error}</p>}

        <input
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="w-full border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[var(--accent)] text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
