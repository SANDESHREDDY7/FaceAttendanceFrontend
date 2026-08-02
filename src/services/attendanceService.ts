import axios from "axios";

const API = "https://ai-face-attendance-system-production-fc28.up.railway.app";
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