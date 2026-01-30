"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logout } from "../lib/auth";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sync = () => setUser(getUser());
    sync();
    window.addEventListener("auth-change", sync);
    return () => window.removeEventListener("auth-change", sync);
  }, []);

  return (
    <nav className="border-b p-4 flex justify-between">
      <Link href="/">Startup Benefits</Link>

      <div className="flex gap-4">
        <Link href="/deals">Deals</Link>
        {user && <Link href="/dashboard">Dashboard</Link>}
        {user?.role === "admin" && <Link href="/admin/deals/new">Add Deal</Link>}

        <button onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {!user ? (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Sign Up</Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
