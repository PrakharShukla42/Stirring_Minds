"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDeal } from "../../../lib/api";
import { getUser } from "../../../lib/auth";

export default function CreateDealPage() {
  const router = useRouter();
  const user = getUser();

  if (!user || user.role !== "admin") {
    router.push("/auth/login");
  }

  const [title, setTitle] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("cloud");
  const [accessLevel, setAccessLevel] =
    useState<"public" | "locked">("public");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createDeal({
        title,
        partnerName,
        description,
        category,
        accessLevel,
      });

      router.push("/deals");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl">
        <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <input placeholder="Partner" onChange={e => setPartnerName(e.target.value)} />
        <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />

        <select onChange={e => setCategory(e.target.value)}>
          <option value="cloud">Cloud</option>
          <option value="marketing">Marketing</option>
          <option value="analytics">Analytics</option>
          <option value="productivity">Productivity</option>
          <option value="devtools">Dev Tools</option>
        </select>

        <select onChange={e => setAccessLevel(e.target.value as any)}>
          <option value="public">Public</option>
          <option value="locked">Private</option>
        </select>

        {error && <p className="text-red-400">{error}</p>}
        <button>Create Deal</button>
      </form>
    </main>
  );
}
