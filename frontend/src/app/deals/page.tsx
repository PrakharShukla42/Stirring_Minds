"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDeal } from "../../lib/api";

export default function CreateDealPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("cloud"); // ✅ FIX
  const [accessLevel, setAccessLevel] =
    useState<"public" | "locked">("public");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createDeal({
        title,
        partnerName,
        description,
        category, // ✅ FIX
        accessLevel,
      });

      router.push("/deals");
    } catch (err: any) {
      setError(err.message || "Failed to create deal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <h1 className="text-2xl font-bold mb-2">Create New Deal</h1>
        <p className="opacity-70 mb-6">
          Admin panel – add startup benefits.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Deal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-2"
          />

          <input
            placeholder="Partner name"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            required
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-2"
          />

          <textarea
            placeholder="Deal description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-2"
          />

          {/* ✅ CATEGORY SELECT */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-2"
          >
            <option value="cloud">Cloud</option>
            <option value="marketing">Marketing</option>
            <option value="analytics">Analytics</option>
            <option value="productivity">Productivity</option>
            <option value="devtools">Dev Tools</option>
          </select>

          <select
            value={accessLevel}
            onChange={(e) =>
              setAccessLevel(e.target.value as "public" | "locked")
            }
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-2"
          >
            <option value="public">Public Deal</option>
            <option value="locked">Private / Verified Only</option>
          </select>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[var(--accent)] py-2 text-white font-medium hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Create Deal"}
          </button>
        </form>
      </div>
    </main>
  );
}
