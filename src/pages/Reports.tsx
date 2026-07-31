import { useEffect, useState } from "react";
import axios from "axios";

import {
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const API = "http://127.0.0.1:8000";

function Reports() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      const response = await axios.get(`${API}/attendance`);

      setRecords(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Attendance Reports
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>Student</b></TableCell>
              <TableCell><b>Roll No</b></TableCell>
              <TableCell><b>Class</b></TableCell>
              <TableCell><b>Section</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Time</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Confidence</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {records.map((record: any, index: number) => (

              <TableRow key={index}>

                <TableCell>
                  {record.students.student_name}
                </TableCell>

                <TableCell>
                  {record.students.roll_number}
                </TableCell>

                <TableCell>
                  {record.students.class}
                </TableCell>

                <TableCell>
                  {record.students.section}
                </TableCell>

                <TableCell>
                  {record.attendance_date}
                </TableCell>

                <TableCell>
                  {record.attendance_time}
                </TableCell>

                <TableCell>
                  <Chip
                    label={record.status}
                    color={
                      record.status === "Present"
                        ? "success"
                        : "error"
                    }
                  />
                </TableCell>

                <TableCell>
                  {Number(record.confidence).toFixed(2)}%
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </Paper>
    </div>
  );
}

export default Reports;