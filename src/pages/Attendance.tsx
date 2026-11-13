import { useState, useRef } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
} from "@mui/material";
import {
  CloudUploadRounded,
  CenterFocusStrongRounded,
  CheckCircleOutlineRounded,
  HelpOutlineRounded,
  PhotoCameraRounded,
  RestartAltRounded,
} from "@mui/icons-material";
import { useColorMode } from "../theme/ThemeContext";
import { API } from "../config";

function Attendance() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rawStudents, setRawStudents] = useState<any[]>([]);
  const [recognizedStudents, setRecognizedStudents] = useState<any[]>([]);
  const [detectedFacesCount, setDetectedFacesCount] = useState<number>(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success" as "success" | "error" | "warning",
    message: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(file: File) {
    setPhoto(file);
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setRawStudents([]);
    setRecognizedStudents([]);
    setDetectedFacesCount(0);
  }

  function handleReset() {
    setPhoto(null);
    setPhotoPreview(null);
    setRawStudents([]);
    setRecognizedStudents([]);
    setDetectedFacesCount(0);
  }

  async function recognizeAttendance() {
    if (!photo) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please upload or capture a group photograph first.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      setLoading(true);

      const response = await axios.post(`${API}/attendance/recognize`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const allDetected = response.data.students || [];
      const recognized = allDetected.filter((item: any) => item.student !== null);

      setRawStudents(allDetected);
      setRecognizedStudents(recognized);
      setDetectedFacesCount(response.data.faces_detected || allDetected.length);

      if (recognized.length > 0) {
        setSnackbar({
          open: true,
          severity: "success",
          message: `Successfully recognized and logged attendance for ${recognized.length} student(s)!`,
        });
      } else {
        setSnackbar({
          open: true,
          severity: "warning",
          message: "Faces detected, but no registered student matches exceeded the confidence threshold.",
        });
      }
    } catch (e: any) {
      setRawStudents([]);
      setRecognizedStudents([]);
      setSnackbar({
        open: true,
        severity: "error",
        message: e.response?.data?.message ?? "AI Face recognition service error.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, pb: 4 }}>
      {/* Page Title */}
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
            AI Group Attendance Scanner
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? "#94A3B8" : "#64748B", mt: 0.5 }}>
            Upload classroom or group photo to detect, verify, and mark attendance simultaneously.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Chip
            icon={<CenterFocusStrongRounded sx={{ fontSize: "16px !important", color: isDark ? "#38BDF8 !important" : "#0284C7 !important" }} />}
            label="Multi-Face AI Active"
            sx={{
              background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.08)",
              border: isDark ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid rgba(2, 132, 199, 0.25)",
              color: isDark ? "#38BDF8" : "#0284C7",
              fontWeight: 700,
            }}
          />
        </Box>
      </Box>

      {/* Main Interactive Stage: Upload & Scan */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: photoPreview ? "1.2fr 1fr" : "1fr" },
          gap: 3,
        }}
      >
        {/* Left: Upload Dropzone & Photo Viewport */}
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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Classroom Viewport
              </Typography>
              {photoPreview && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<RestartAltRounded />}
                  onClick={handleReset}
                  sx={{ borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)", color: isDark ? "#94A3B8" : "#64748B" }}
                >
                  Clear Photo
                </Button>
              )}
            </Box>

            {!photoPreview ? (
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: `2px dashed ${isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(2, 132, 199, 0.35)"}`,
                  borderRadius: "16px",
                  p: 6,
                  textAlign: "center",
                  cursor: "pointer",
                  background: isDark ? "rgba(56, 189, 248, 0.02)" : "rgba(2, 132, 199, 0.02)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: isDark ? "#38BDF8" : "#0284C7",
                    background: isDark ? "rgba(56, 189, 248, 0.06)" : "rgba(2, 132, 199, 0.06)",
                    transform: "scale(1.005)",
                  },
                }}
              >
                <input
                  ref={fileInputRef}
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
                  }}
                />

                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "16px",
                    background: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
                    color: isDark ? "#38BDF8" : "#0284C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <CloudUploadRounded sx={{ fontSize: 32 }} />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", mb: 0.5 }}>
                  Click or drag group photo here
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? "#64748B" : "#94A3B8", maxWidth: 400, mx: "auto" }}>
                  Supports high-resolution PNG, JPG, or JPEG classroom snapshots with multiple faces.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.1)" }}>
                {/* Uploaded Photo */}
                <img
                  src={photoPreview}
                  alt="Classroom Group"
                  style={{
                    width: "100%",
                    maxHeight: 460,
                    objectFit: "contain",
                    display: "block",
                    backgroundColor: "#000",
                  }}
                />

                {/* Laser scanning line animation when processing */}
                {loading && <Box className="scanner-line" />}

                {/* Status Overlay */}
                {loading && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(11, 15, 23, 0.7)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <CircularProgress size={48} sx={{ color: "#38BDF8" }} />
                    <Typography variant="body2" sx={{ color: "#38BDF8", fontWeight: 700, letterSpacing: "0.05em" }}>
                      ANALYZING FACIAL VECTORS...
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Action Bar */}
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PhotoCameraRounded />}
                onClick={recognizeAttendance}
                disabled={loading || !photo}
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 700,
                  background: isDark
                    ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                    : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
                }}
              >
                {loading ? "Analyzing Faces..." : "Recognize & Mark Attendance"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Right: Live Recognition Summary Stats */}
        {photoPreview && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
                  border: isDark ? "1px solid rgba(56, 189, 248, 0.2)" : "1px solid rgba(2, 132, 199, 0.2)",
                  boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 700, letterSpacing: "0.05em" }}>
                  TOTAL DETECTED
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? "#38BDF8" : "#0284C7", mt: 0.5 }}>
                  {detectedFacesCount}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
                  border: isDark ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(5, 150, 105, 0.2)",
                  boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 700, letterSpacing: "0.05em" }}>
                  VERIFIED PRESENT
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? "#10B981" : "#059669", mt: 0.5 }}>
                  {recognizedStudents.length}
                </Typography>
              </Paper>
            </Box>

            <Card
              sx={{
                borderRadius: "18px",
                background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
                backdropFilter: isDark ? "blur(16px)" : "none",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
                flex: 1,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", mb: 2 }}>
                  Recognition Breakdown
                </Typography>

                {rawStudents.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: "center", color: isDark ? "#64748B" : "#94A3B8" }}>
                    <Typography variant="body2">
                      Click "Recognize & Mark Attendance" to initiate vector comparisons.
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxHeight: 310, overflowY: "auto" }}>
                    {rawStudents.map((item: any, idx: number) => {
                      const isMatch = item.student !== null;
                      const confidence = Number(item.confidence || 0);

                      return (
                        <Box
                          key={idx}
                          sx={{
                            p: 1.5,
                            borderRadius: "12px",
                            background: isMatch
                              ? isDark ? "rgba(16, 185, 129, 0.05)" : "rgba(5, 150, 105, 0.05)"
                              : isDark ? "rgba(244, 63, 94, 0.05)" : "rgba(225, 29, 72, 0.05)",
                            border: `1px solid ${isMatch ? (isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.2)") : (isDark ? "rgba(244, 63, 94, 0.2)" : "rgba(225, 29, 72, 0.2)")}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1.5,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            {isMatch ? (
                              <CheckCircleOutlineRounded sx={{ color: isDark ? "#10B981" : "#059669", fontSize: 22 }} />
                            ) : (
                              <HelpOutlineRounded sx={{ color: isDark ? "#F43F5E" : "#E11D48", fontSize: 22 }} />
                            )}
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                                {isMatch ? item.student.student_name : `Face #${idx + 1} (Unregistered)`}
                              </Typography>
                              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                                {isMatch ? `Roll: ${item.student.roll_number} • Class ${item.student.class}-${item.student.section}` : "No matching enrolled profile"}
                              </Typography>
                            </Box>
                          </Box>

                          <Chip
                            label={isMatch ? `${confidence.toFixed(1)}%` : "Unknown"}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              background: isMatch ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.15)",
                              color: isMatch ? (isDark ? "#34D399" : "#059669") : (isDark ? "#FB7185" : "#E11D48"),
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      {/* Verified Attendance Results Table */}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Verified Attendance Session Roster
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Students automatically committed to today's database logs
              </Typography>
            </Box>

            <Chip
              label={`${recognizedStudents.length} Marked Present`}
              size="small"
              sx={{
                background: isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(5, 150, 105, 0.08)",
                color: isDark ? "#34D399" : "#059669",
                border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(5, 150, 105, 0.25)",
                fontWeight: 700,
              }}
            />
          </Box>

          {recognizedStudents.length === 0 ? (
            <Box sx={{ py: 5, textAlign: "center", color: isDark ? "#64748B" : "#94A3B8" }}>
              <Typography variant="body2">No students marked in this session yet.</Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Confidence</TableCell>
                  <TableCell>Attendance Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recognizedStudents.map((record: any, index: number) => {
                  const student = record.student;
                  const confidence = Number(record.confidence || 0);

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                          {student.student_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={student.roll_number}
                          size="small"
                          sx={{
                            fontFamily: "'JetBrains Mono', monospace",
                            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                            color: isDark ? "#CBD5E1" : "#334155",
                          }}
                        />
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
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
                      <TableCell>
                        <Chip
                          label="Present"
                          size="small"
                          sx={{
                            background: "rgba(16, 185, 129, 0.15)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            color: isDark ? "#34D399" : "#059669",
                            fontWeight: 700,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        sx={{ zIndex: 99999 }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Attendance;
