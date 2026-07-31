import axios from "axios";

const API = "http://127.0.0.1:8000";

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