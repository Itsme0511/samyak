import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000",
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth endpoints
export const loginRequest = (payload) =>
  api.post("/api/auth/login", payload).then((r) => r.data);

export const registerRequest = (payload) =>
  api.post("/api/auth/register", payload).then((r) => r.data);

// Levels
export const fetchLevels = () => api.get("/api/levels").then((r) => r.data);

// Progress
export const getProgress = () => api.get("/api/progress").then((r) => r.data);
export const completeLevel = (levelNumber) => api.post("/api/progress/complete", { levelNumber }).then((r) => r.data);

// Blogs
export const fetchBlogs = () => api.get("/api/blogs").then((r) => r.data);
export const createBlog = (payload) => api.post("/api/blogs", payload).then((r) => r.data);
export const voteBlog = (id, value) => api.patch(`/api/blogs/${id}/vote`, { value }).then((r) => r.data);
