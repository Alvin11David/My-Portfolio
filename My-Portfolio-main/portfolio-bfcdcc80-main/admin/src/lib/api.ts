const API_BASE = "http://localhost:8081/api";

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    request<{ token: string; username: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  // Projects
  getProjects: () => request<any[]>("/projects"),
  getProject: (id: number) => request<any>(`/projects/${id}`),
  createProject: (data: any) =>
    request<any>("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id: number, data: any) =>
    request<any>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id: number) =>
    request<void>(`/projects/${id}`, { method: "DELETE" }),

  // Profile
  getProfile: () => request<any>("/profile"),
  updateProfile: (data: any) =>
    request<any>("/profile", { method: "PUT", body: JSON.stringify(data) }),

  // Skill Categories
  getSkillCategories: () => request<any[]>("/skill-categories"),
  createSkillCategory: (data: any) =>
    request<any>("/skill-categories", { method: "POST", body: JSON.stringify(data) }),
  updateSkillCategory: (id: number, data: any) =>
    request<any>(`/skill-categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkillCategory: (id: number) =>
    request<void>(`/skill-categories/${id}`, { method: "DELETE" }),

  // Tools
  getTools: () => request<any[]>("/tools"),
  createTool: (data: any) =>
    request<any>("/tools", { method: "POST", body: JSON.stringify(data) }),
  updateTool: (id: number, data: any) =>
    request<any>(`/tools/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTool: (id: number) =>
    request<void>(`/tools/${id}`, { method: "DELETE" }),

  // Hero
  getHero: () => request<any>("/hero"),
  updateHero: (data: any) =>
    request<any>("/hero", { method: "PUT", body: JSON.stringify(data) }),

  // Contact Messages
  getMessages: () => request<any[]>("/contact/messages"),
  markMessageRead: (id: number) =>
    request<void>(`/contact/messages/${id}/read`, { method: "PUT" }),
  deleteMessage: (id: number) =>
    request<void>(`/contact/messages/${id}`, { method: "DELETE" }),

  // Upload
  uploadFile: async (file: File) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json() as Promise<{ url: string }>;
  },
};
