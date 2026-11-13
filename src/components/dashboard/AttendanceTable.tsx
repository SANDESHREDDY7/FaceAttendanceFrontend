import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
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
  LinearProgress,
} from "@mui/material";
import { TableChartRounded } from "@mui/icons-material";
import { getTodayAttendance } from "../../services/attendanceService";
import { useColorMode } from "../../theme/ThemeContext";

function AttendanceTable() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      const data = await getTodayAttendance();
      setStudents(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      sx={{
        borderRadius: "18px",
        background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
        backdropFilter: isDark ? "blur(16px)" : "none",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: isDark ? "rgba(129, 140, 248, 0.12)" : "rgba(79, 70, 229, 0.08)",
                color: isDark ? "#818CF8" : "#6366F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TableChartRounded sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Today's Verified Attendance
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Real-time synchronized student records
              </Typography>
            </Box>
          </Box>

          <Chip
            label={`${students.length} Records`}
            size="small"
            sx={{
              background: isDark ? "rgba(129, 140, 248, 0.1)" : "rgba(79, 70, 229, 0.08)",
              border: isDark ? "1px solid rgba(129, 140, 248, 0.25)" : "1px solid rgba(79, 70, 229, 0.25)",
              color: isDark ? "#A5B4FC" : "#4F46E5",
              fontWeight: 600,
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress size={32} sx={{ color: isDark ? "#38BDF8" : "#0284C7" }} />
          </Box>
        ) : students.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6, color: isDark ? "#64748B" : "#94A3B8" }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#94A3B8" : "#64748B" }}>
              No attendance records found for today.
            </Typography>
            <Typography variant="caption">
              Upload a group photo in the Group Attendance section to log attendance automatically.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Class & Section</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Confidence Score</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((record: any, index: number) => {
                  const student = record.students || {};
                  const confidence = Number(record.confidence || 0);

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              background: isDark
                                ? "linear-gradient(135deg, #38BDF8, #6366F1)"
                                : "linear-gradient(135deg, #0284C7, #4F46E5)",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              color: "#FFFFFF",
                            }}
                          >
                            {(student.student_name || "S").charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                              {student.student_name || "Unknown"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={student.roll_number || "-"}
                          size="small"
                          sx={{
                            fontFamily: "'JetBrains Mono', monospace",
                            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                            color: isDark ? "#CBD5E1" : "#334155",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 500 }}>
                          {student.class} - {student.section}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontFamily: "'JetBrains Mono', monospace" }}>
                          {record.attendance_time}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={record.status}
                          size="small"
                          sx={{
                            background: "rgba(16, 185, 129, 0.15)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            color: isDark ? "#34D399" : "#059669",
                            fontWeight: 700,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 140 }}>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(confidence, 100)}
                            sx={{
                              flex: 1,
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                              "& .MuiLinearProgress-bar": {
                                background: isDark
                                  ? "linear-gradient(90deg, #38BDF8, #10B981)"
                                  : "linear-gradient(90deg, #0284C7, #059669)",
                                borderRadius: 3,
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontWeight: 700,
                              color: isDark ? "#38BDF8" : "#0284C7",
                              minWidth: 45,
                            }}
                          >
                            {confidence.toFixed(1)}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default AttendanceTable;
