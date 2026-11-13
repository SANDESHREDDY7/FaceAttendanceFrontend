import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";
export async function getTodayAttendance() {
  const response = await axios.get(
    `${API}/attendance/today`
  );

  return response.data.data;
}

export async function getAttendanceStats() {
  const response = await axios.get(
    `${API}/attendance/stats`
  );

  return response.data;
}