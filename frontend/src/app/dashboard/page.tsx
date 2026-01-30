"use client";

import { useEffect, useState } from "react";
import { fetchMyClaims } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [claims, setClaims] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMyClaims()
      .then(setClaims)
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        My Claimed Deals
      </h1>

      {claims.length === 0 && (
        <p className="text-neutral-400">
          No claimed deals yet.
        </p>
      )}

      <div className="space-y-4">
        {claims.map((c) => (
          <div
            key={c._id}
            className="border border-neutral-800 p-4 rounded-xl"
          >
            <h3 className="font-semibold">
              {c.dealId?.title || "Deal"}
            </h3>

            <p className="text-sm text-neutral-400">
              Status: {c.status || "claimed"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
