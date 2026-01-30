"use client";

import { useEffect, useState } from "react";
import { fetchMyClaims } from "../../lib/api";

export default function DashboardPage() {
  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    fetchMyClaims().then(setClaims);
  }, []);

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">My Claims</h1>

      {claims.map((c) => (
        <div key={c._id} className="border p-4 rounded mb-4">
          <p><b>Deal:</b> {c.dealId?.title}</p>
          <p><b>Status:</b> {c.status}</p>
        </div>
      ))}
    </main>
  );
}
