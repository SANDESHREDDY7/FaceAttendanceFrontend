import axios from "axios";

const API = "http://127.0.0.1:8000";

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