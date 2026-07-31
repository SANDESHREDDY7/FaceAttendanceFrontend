import { useEffect, useState } from "react";

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { getTodayAttendance } from "../../services/attendanceService";

function statusColor(status: string) {
  switch (status) {
    case "Present":
      return "success";

    case "Absent":
      return "error";

    case "Late":
      return "warning";

    default:
      return "default";
  }
}

function AttendanceTable() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      const data = await getTodayAttendance();
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          📋 Today's Attendance
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Student</b>
                </TableCell>

                <TableCell>
                  <b>Roll No</b>
                </TableCell>

                <TableCell>
                  <b>Class</b>
                </TableCell>

                <TableCell>
                  <b>Time</b>
                </TableCell>

                <TableCell>
                  <b>Status</b>
                </TableCell>

                <TableCell>
                  <b>Confidence</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((student: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#16A34A" }}>
                        {student.students.student_name.charAt(0)}
                      </Avatar>

                      {student.students.student_name}
                    </div>
                  </TableCell>

                  <TableCell>
                    {student.students.roll_number}
                  </TableCell>

                  <TableCell>
                    {student.students.class}-
                    {student.students.section}
                  </TableCell>

                  <TableCell>
                    {student.attendance_time}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={student.status}
                      color={statusColor(student.status)}
                    />
                  </TableCell>

                  <TableCell>
                    {Number(student.confidence).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default AttendanceTable;