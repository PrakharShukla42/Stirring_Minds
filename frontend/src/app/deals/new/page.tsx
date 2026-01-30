"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createDeal } from "../../../lib/api";
import { getUser } from "../../../lib/auth";

export default function CreateDealPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "admin") {
      router.replace("/auth/login");
    } else {
      setAllowed(true);
    }
  }, [router]);

  if (!allowed) return null;

  const [title, setTitle] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("cloud");
  const [accessLevel, setAccessLevel] = useState("public");

  async function submit(e: any) {
    e.preventDefault();
    await createDeal({ title, partnerName, description, category, accessLevel });
    router.push("/deals");
  }

  return (
    <form onSubmit={submit} className="container py-10 space-y-4">
      <h1 className="text-2xl font-bold">Create Deal</h1>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Partner" onChange={e => setPartnerName(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <select onChange={e => setCategory(e.target.value)}>
        <option value="cloud">Cloud</option>
        <option value="marketing">Marketing</option>
        <option value="analytics">Analytics</option>
        <option value="productivity">Productivity</option>
        <option value="devtools">DevTools</option>
      </select>
      <select onChange={e => setAccessLevel(e.target.value)}>
        <option value="public">Public</option>
        <option value="locked">Locked</option>
      </select>
      <button>Create</button>
    </form>
  );
}
