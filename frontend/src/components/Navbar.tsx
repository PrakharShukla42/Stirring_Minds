"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logout } from "../lib/auth";

export default function Navbar() {
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
        {user?.role === "admin" && (
          <>
            <Link href="/admin/deals/new">Add Deal</Link>
            <Link href="/admin/claims">Approve Claims</Link>
          </>
        )}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
