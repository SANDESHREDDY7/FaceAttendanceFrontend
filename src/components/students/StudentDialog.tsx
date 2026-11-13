import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { PersonAddAlt1Rounded } from "@mui/icons-material";
import { addStudent } from "../../services/studentService";
import { useColorMode } from "../../theme/ThemeContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

function StudentDialog({ open, onClose, onSaved }: Props) {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [student, setStudent] = useState({
    roll_number: "",
    student_name: "",
    class: "10",
    section: "A",
  });

  const [saving, setSaving] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function saveStudent() {
    if (!student.student_name || !student.roll_number) {
      setSnack({
        open: true,
        message: "Student Name and Roll Number are required.",
        severity: "error",
      });
      return;
    }

    try {
      setSaving(true);
      const result = await addStudent(student);

      if (result.success) {
        setSnack({
          open: true,
          message: "Student enrolled successfully!",
          severity: "success",
        });

        setStudent({
          roll_number: "",
          student_name: "",
          class: "10",
          section: "A",
        });

        onSaved();
        onClose();
      } else {
        setSnack({
          open: true,
          message: result.message || "Failed to save student",
          severity: "error",
        });
      }
    } catch (err) {
      setSnack({
        open: true,
        message: "Unable to connect to server.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: isDark ? "#111827" : "#FFFFFF",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              background: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
              color: isDark ? "#38BDF8" : "#0284C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonAddAlt1Rounded sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
              Enroll New Student
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
              Add student details before registering face biometric photos
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2.5} mt={1}>
            <TextField
              name="student_name"
              label="Full Student Name"
              placeholder="e.g. Sophia Chen"
              value={student.student_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="roll_number"
              label="Roll Number / Student ID"
              placeholder="e.g. R-1042"
              value={student.roll_number}
              onChange={handleChange}
              fullWidth
            />

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <TextField
                name="class"
                label="Class / Grade"
                select
                value={student.class}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="10">Class 10</MenuItem>
                <MenuItem value="9">Class 9</MenuItem>
                <MenuItem value="8">Class 8</MenuItem>
                <MenuItem value="7">Class 7</MenuItem>
              </TextField>

              <TextField
                name="section"
                label="Section"
                select
                value={student.section}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="A">Section A</MenuItem>
                <MenuItem value="B">Section B</MenuItem>
                <MenuItem value="C">Section C</MenuItem>
              </TextField>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={onClose} sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveStudent}
            disabled={saving}
            sx={{
              background: isDark
                ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            {saving ? "Enrolling..." : "Enroll Student"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity} variant="filled" sx={{ borderRadius: "12px" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default StudentDialog;
