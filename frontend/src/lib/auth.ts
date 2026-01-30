import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("auth-change"));
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<any>(token);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("auth-change"));
  window.location.href = "/";
}
