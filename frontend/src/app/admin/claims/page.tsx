"use client";

import { useEffect, useState } from "react";
import { fetchAllClaims, updateClaimStatus } from "../../../lib/api";
import { getUser } from "../../../lib/auth";
import { useRouter } from "next/navigation";

export default function AdminClaimsPage() {
  const router = useRouter();
  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "admin") {
      router.replace("/auth/login");
      return;
    }

    fetchAllClaims().then(setClaims);
  }, [router]);

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Claim Requests</h1>

      {claims.map((c) => (
        <div key={c._id} className="border p-4 rounded mb-4">
          <p><b>Deal:</b> {c.dealId?.title}</p>
          <p><b>User:</b> {c.userId?.email}</p>
          <p><b>Status:</b> {c.status}</p>

          {c.status === "pending" && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateClaimStatus(c._id, "approved")}
              >
                Approve
              </button>
              <button
                onClick={() => updateClaimStatus(c._id, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
