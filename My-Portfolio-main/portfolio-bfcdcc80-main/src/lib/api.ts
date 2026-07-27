const API_BASE = "http://localhost:8080/api";

async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers as Record<string, string> },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getProjects: () => fetchApi<any[]>("/projects"),
  getProfile: () => fetchApi<any>("/profile"),
  getSkillCategories: () => fetchApi<any[]>("/skill-categories"),
  getTools: () => fetchApi<any[]>("/tools"),
  getHero: () => fetchApi<any>("/hero"),
  submitContact: (data: { name: string; email: string; message: string }) =>
    fetchApi<any>("/contact", { method: "POST", body: JSON.stringify(data) }),
};
