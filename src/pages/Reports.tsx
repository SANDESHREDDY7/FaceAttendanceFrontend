import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  LinearProgress,
  Avatar,
  Chip,
  InputAdornment,
} from "@mui/material";
import {
  FileDownloadRounded,
  SearchRounded,
  AssessmentRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { useColorMode } from "../theme/ThemeContext";
import { API } from "../config";

function Reports() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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

  const filteredRecords = records.filter((r) => {
    const student = r.students || {};
    const nameMatch = student.student_name?.toLowerCase().includes(search.toLowerCase());
    const rollMatch = student.roll_number?.toLowerCase().includes(search.toLowerCase());
    const classMatch = `${student.class}-${student.section}`.toLowerCase().includes(search.toLowerCase());
    return !search || nameMatch || rollMatch || classMatch;
  });

  function exportCSV() {
    if (records.length === 0) return;

    const headers = ["Student Name", "Roll Number", "Class", "Section", "Date", "Time", "Status", "Confidence (%)"];
    const rows = filteredRecords.map((r) => [
      r.students?.student_name || "Unknown",
      r.students?.roll_number || "-",
      r.students?.class || "-",
      r.students?.section || "-",
      r.attendance_date,
      r.attendance_time,
      r.status,
      Number(r.confidence || 0).toFixed(2),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const avgConfidence =
    records.length > 0
      ? (
          records.reduce((acc, curr) => acc + Number(curr.confidence || 0), 0) / records.length
        ).toFixed(1)
      : "0";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, pb: 4 }}>
      {/* Title & Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: isDark
                ? "linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)"
                : "linear-gradient(180deg, #0F172A 0%, #334155 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Attendance Logs & Audit Trail
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? "#94A3B8" : "#64748B", mt: 0.5 }}>
            Exportable historical records with facial match confidence metadata.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<FileDownloadRounded />}
          onClick={exportCSV}
          disabled={records.length === 0}
          sx={{
            background: isDark
              ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
              : "linear-gradient(135deg, #059669 0%, #047857 100%)",
            color: "#FFF",
            fontWeight: 700,
            px: 3,
            py: 1.2,
          }}
        >
          Export CSV Log
        </Button>
      </Box>

      {/* Summary KPI Strip */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2.5 }}>
        <Card
          sx={{
            background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
            border: isDark ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid rgba(2, 132, 199, 0.2)",
            boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
            borderRadius: "18px",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 700 }}>
              TOTAL CHECK-IN EVENTS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? "#38BDF8" : "#0284C7", mt: 0.5 }}>
              {records.length}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
            border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(5, 150, 105, 0.2)",
            boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
            borderRadius: "18px",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 700 }}>
              AVERAGE MATCH CONFIDENCE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? "#10B981" : "#059669", mt: 0.5 }}>
              {avgConfidence}%
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
            border: isDark ? "1px solid rgba(129, 140, 248, 0.25)" : "1px solid rgba(79, 70, 229, 0.2)",
            boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
            borderRadius: "18px",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 700 }}>
              VERIFICATION ENGINE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? "#818CF8" : "#4F46E5", mt: 0.5 }}>
              128D Encodings
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Search Bar */}
      <Paper
        sx={{
          p: 2,
          borderRadius: "16px",
          background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
          backdropFilter: isDark ? "blur(16px)" : "none",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        <TextField
          fullWidth
          placeholder="Filter report by student name, roll number, or class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: isDark ? "#64748B" : "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Modern Reports Table */}
      <Paper
        sx={{
          borderRadius: "18px",
          background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
          backdropFilter: isDark ? "blur(16px)" : "none",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={36} sx={{ color: isDark ? "#38BDF8" : "#0284C7" }} />
          </Box>
        ) : filteredRecords.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center", color: isDark ? "#64748B" : "#94A3B8" }}>
            <AssessmentRounded sx={{ fontSize: 44, color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", mb: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 600, color: isDark ? "#94A3B8" : "#64748B" }}>
              No attendance records match your query
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Class & Section</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Confidence Score</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRecords.map((record: any, index: number) => {
                const student = record.students || {};
                const confidence = Number(record.confidence || 0);

                return (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            background: "linear-gradient(135deg, #10B981, #059669)",
                            color: "#FFF",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {(student.student_name || "S").charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                          {student.student_name || "Unknown"}
                        </Typography>
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
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                        {student.class} - {student.section}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: isDark ? "#CBD5E1" : "#334155", fontFamily: "'JetBrains Mono', monospace" }}>
                        {record.attendance_date}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: isDark ? "#CBD5E1" : "#334155", fontFamily: "'JetBrains Mono', monospace" }}>
                        {record.attendance_time}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        icon={<CheckCircleRounded sx={{ fontSize: "14px !important", color: isDark ? "#34D399 !important" : "#059669 !important" }} />}
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
                          value={confidence}
                          sx={{
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                            "& .MuiLinearProgress-bar": {
                              background: isDark
                                ? "linear-gradient(90deg, #38BDF8, #10B981)"
                                : "linear-gradient(90deg, #0284C7, #059669)",
                            },
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: isDark ? "#38BDF8" : "#0284C7" }}
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
        )}
      </Paper>
    </Box>
  );
}

export default Reports;
