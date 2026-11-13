import axios from "axios";
import { API } from "../config";
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