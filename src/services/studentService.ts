import axios from "axios";

const API = "https://ai-face-attendance-system-production-fc28.up.railway.app";

export async function getStudents() {
  const response = await axios.get(`${API}/students`);
  return response.data;
}

export async function addStudent(student: any) {
  const response = await axios.post(`${API}/students`, student);
  return response.data;
}

export async function deleteStudent(studentId: number) {
  const response = await axios.delete(`${API}/students/${studentId}`);
  return response.data;
}