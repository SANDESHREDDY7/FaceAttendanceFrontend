export const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://ai-face-attendance-system-production-fc28.up.railway.app");


