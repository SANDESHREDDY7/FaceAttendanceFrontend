import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { getStudents, deleteStudent } from "../../services/studentService";
import UploadPhotoDialog from "./UploadPhotoDialog";
import { useColorMode } from "../../theme/ThemeContext";

interface Props {
  searchTerm?: string;
  selectedClass?: string;
}

function StudentTable({ searchTerm = "", selectedClass = "All" }: Props) {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadStudent, setUploadStudent] = useState<any>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function openDelete(student: any) {
    setSelectedStudent(student);
    setDeleteDialog(true);
  }

  async function confirmDelete() {
    try {
      await deleteStudent(selectedStudent.id);
      setSnackbar({
        open: true,
        message: `Student ${selectedStudent.student_name} removed.`,
        severity: "success",
      });
      setDeleteDialog(false);
      loadStudents();
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Unable to delete student record.",
        severity: "error",
      });
    }
  }

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !searchTerm ||
      s.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll_number?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "All" || s.class?.toString() === selectedClass;

    return matchesSearch && matchesClass;
  });

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress size={36} sx={{ color: isDark ? "#38BDF8" : "#0284C7" }} />
      </Box>
    );

  return (
    <>
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
        {filteredStudents.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center", color: isDark ? "#64748B" : "#94A3B8" }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: isDark ? "#94A3B8" : "#64748B" }}>
              No students found
            </Typography>
            <Typography variant="caption">
              Try adjusting your search query or click "Add Student" to create a profile.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Class & Section</TableCell>
                <TableCell>Biometric Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredStudents.map((student) => {
                const isEncoded = Boolean(student.is_encoded);

                return (
                  <TableRow hover key={student.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            background: isDark
                              ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                              : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {(student.student_name || "S").charAt(0)}
                        </Avatar>

                        <Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                              {student.student_name}
                            </Typography>

                            {/* Badge beside student's name */}
                            {isEncoded ? (
                              <Chip
                                icon={<VerifiedRoundedIcon sx={{ fontSize: "13px !important", color: "#10B981 !important" }} />}
                                label="Encoded"
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  background: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(5, 150, 105, 0.1)",
                                  border: isDark ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(5, 150, 105, 0.25)",
                                  color: isDark ? "#34D399" : "#059669",
                                  px: 0.2,
                                }}
                              />
                            ) : (
                              <Tooltip title="Face encodings missing. Click to upload 3 reference photos.">
                                <Chip
                                  icon={<WarningAmberRoundedIcon sx={{ fontSize: "13px !important", color: "#F59E0B !important" }} />}
                                  label="Complete Encoding"
                                  size="small"
                                  onClick={() => {
                                    setUploadStudent(student);
                                    setUploadDialogOpen(true);
                                  }}
                                  sx={{
                                    height: 20,
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    background: isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(217, 119, 6, 0.1)",
                                    border: isDark ? "1px solid rgba(245, 158, 11, 0.35)" : "1px solid rgba(217, 119, 6, 0.3)",
                                    color: isDark ? "#FBBF24" : "#D97706",
                                    cursor: "pointer",
                                    px: 0.2,
                                    "&:hover": {
                                      background: isDark ? "rgba(245, 158, 11, 0.25)" : "rgba(217, 119, 6, 0.2)",
                                    },
                                  }}
                                />
                              </Tooltip>
                            )}
                          </Box>

                          <Typography variant="caption" sx={{ color: isDark ? "#64748B" : "#94A3B8" }}>
                            Student ID: #{student.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={student.roll_number}
                        size="small"
                        sx={{
                          fontFamily: "'JetBrains Mono', monospace",
                          background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                          color: isDark ? "#CBD5E1" : "#334155",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
                        Class {student.class} - {student.section}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {isEncoded ? (
                        <Chip
                          icon={<VerifiedRoundedIcon sx={{ fontSize: "14px !important", color: isDark ? "#34D399 !important" : "#059669 !important" }} />}
                          label="Ready for Recognition"
                          size="small"
                          sx={{
                            background: isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(5, 150, 105, 0.08)",
                            border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(5, 150, 105, 0.2)",
                            color: isDark ? "#34D399" : "#059669",
                            fontWeight: 600,
                          }}
                        />
                      ) : (
                        <Tooltip title="Click to upload photos now">
                          <Chip
                            icon={<WarningAmberRoundedIcon sx={{ fontSize: "14px !important", color: isDark ? "#FBBF24 !important" : "#D97706 !important" }} />}
                            label="Missing Photos"
                            size="small"
                            onClick={() => {
                              setUploadStudent(student);
                              setUploadDialogOpen(true);
                            }}
                            sx={{
                              background: isDark ? "rgba(245, 158, 11, 0.12)" : "rgba(217, 119, 6, 0.08)",
                              border: isDark ? "1px solid rgba(245, 158, 11, 0.25)" : "1px solid rgba(217, 119, 6, 0.2)",
                              color: isDark ? "#FBBF24" : "#D97706",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Tooltip title="Upload & Register Face Photos">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setUploadStudent(student);
                              setUploadDialogOpen(true);
                            }}
                            sx={{
                              color: isDark ? "#38BDF8" : "#0284C7",
                              background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.08)",
                              "&:hover": {
                                background: isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(2, 132, 199, 0.15)",
                              },
                            }}
                          >
                            <PhotoCameraRoundedIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Student Record">
                          <IconButton
                            size="small"
                            onClick={() => openDelete(student)}
                            sx={{
                              color: isDark ? "#F43F5E" : "#E11D48",
                              background: isDark ? "rgba(244, 63, 94, 0.1)" : "rgba(225, 29, 72, 0.08)",
                              "&:hover": {
                                background: isDark ? "rgba(244, 63, 94, 0.2)" : "rgba(225, 29, 72, 0.15)",
                              },
                            }}
                          >
                            <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: {
            background: isDark ? "#111827" : "#FFFFFF",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "18px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
          Delete Student Record
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
            Are you sure you want to remove <b>{selectedStudent?.student_name}</b> (Roll: {selectedStudent?.roll_number})? All registered face encodings and attendance logs associated with this student will also be permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDeleteDialog(false)} sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmDelete}
            sx={{
              background: "#F43F5E",
              color: "#FFF",
              "&:hover": { background: "#E11D48" },
            }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <UploadPhotoDialog
        open={uploadDialogOpen}
        student={uploadStudent}
        onClose={() => {
          setUploadDialogOpen(false);
          setUploadStudent(null);
        }}
        onSuccess={() => {
          loadStudents();
        }}
      />

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
    </>
  );
}

export default StudentTable;
