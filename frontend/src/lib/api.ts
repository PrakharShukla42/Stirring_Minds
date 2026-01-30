import { getToken } from "./auth";

const API_BASE_URL = "http://localhost:5000/api";

/* ================= DEALS ================= */

export async function fetchDeals() {
  const res = await fetch(`${API_BASE_URL}/deals`, { cache: "no-store" });
  return res.ok ? res.json() : [];
}

export async function fetchDealById(id: string) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/deals/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });

  return res.ok ? res.json() : null;
}

/* ================= AUTH ================= */

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Login failed");
  }

  return res.json();
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "user" | "admin"
) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Registration failed");
  }

  return res.json();
}

/* ================= DEAL CREATE (ADMIN) ================= */

export async function createDeal(deal: {
  title: string;
  description: string;
  partnerName: string;
  category: string;
  accessLevel: "public" | "locked";
}) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/deals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deal),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create deal");
  }

  return res.json();
}

/* ================= CLAIMS ================= */

export async function fetchMyClaims() {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/claims/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch claims");
  }

  return res.json();
}

/* ================= ADMIN CLAIMS ================= */

export async function fetchAllClaims() {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch("http://localhost:5000/api/claims", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch claims");
  return res.json();
}

export async function updateClaimStatus(
  claimId: string,
  status: "approved" | "rejected"
) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(
    `http://localhost:5000/api/claims/${claimId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) throw new Error("Failed to update claim");
  return res.json();
}
