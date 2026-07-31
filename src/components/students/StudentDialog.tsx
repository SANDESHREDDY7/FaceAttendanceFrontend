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
} from "@mui/material";

import { addStudent } from "../../services/studentService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

function StudentDialog({ open, onClose, onSaved }: Props) {
  const [student, setStudent] = useState({
    roll_number: "",
    student_name: "",
    class: "",
    section: "",
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
    try {
      setSaving(true);

      const result = await addStudent(student);

      if (result.success) {
        setSnack({
          open: true,
          message: result.message,
          severity: "success",
        });

        setStudent({
          roll_number: "",
          student_name: "",
          class: "",
          section: "",
        });

        onSaved();
        onClose();
      } else {
        setSnack({
          open: true,
          message: result.message,
          severity: "error",
        });
      }
    } catch (err) {
      setSnack({
        open: true,
        message: "Unable to connect to server",
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
      >
        <DialogTitle>Add Student</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              name="student_name"
              label="Student Name"
              value={student.student_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="roll_number"
              label="Roll Number"
              value={student.roll_number}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="class"
              label="Class"
              select
              value={student.class}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="8">8</MenuItem>
            </TextField>

            <TextField
              name="section"
              label="Section"
              select
              value={student.section}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveStudent}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Student"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnack({
            ...snack,
            open: false,
          })
        }
      >
        <Alert severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default StudentDialog;