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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import {
  getStudents,
  deleteStudent,
} from "../../services/studentService";
import UploadPhotoDialog from "./UploadPhotoDialog";


function StudentTable() {
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
    }

    setLoading(false);
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
        message: "Student deleted successfully",
        severity: "success",
      });

      setDeleteDialog(false);

      loadStudents();
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Unable to delete student",
        severity: "error",
      });
    }
  }

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead
            sx={{
              background: "#F8FAFC",
            }}
          >
            <TableRow>
              <TableCell><b>Student</b></TableCell>
              <TableCell><b>Roll No</b></TableCell>
              <TableCell><b>Class</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((student) => (
              <TableRow hover key={student.id}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#2563EB" }}>
                      {(student.student_name || "S").charAt(0)}
                    </Avatar>

                    <Typography fontWeight={600}>
                      {student.student_name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  {student.roll_number}
                </TableCell>

                <TableCell>
                  {student.class} - {student.section}
                </TableCell>

                <TableCell>
                  {student.phone || "-"}
                </TableCell>

                <TableCell>
                  <Chip
                    label="Active"
                    color="success"
                  />
                </TableCell>

                <TableCell align="center">
                <IconButton
  color="success"
  onClick={() => {
    setUploadStudent(student);
    setUploadDialogOpen(true);
  }}
>
  <PhotoCameraIcon />
</IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => openDelete(student)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>

<TablePagination
  component="div"
  count={students.length}
  page={0}
  rowsPerPage={5}
  rowsPerPageOptions={[5]}
  onPageChange={() => {}}
  onRowsPerPageChange={() => {}}
/>
</Paper>

<Dialog
open={deleteDialog}
onClose={() => setDeleteDialog(false)}
>
<DialogTitle>
  Delete Student
</DialogTitle>

<DialogContent>
  Are you sure you want to delete{" "}
  <b>{selectedStudent?.student_name}</b>?
</DialogContent>

<DialogActions>
  <Button
    onClick={() => setDeleteDialog(false)}
  >
    Cancel
  </Button>

  <Button
    color="error"
    variant="contained"
    onClick={confirmDelete}
  >
    Delete
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
autoHideDuration={2500}
onClose={() =>
  setSnackbar({
    ...snackbar,
    open: false,
  })
}
>
<Alert severity={snackbar.severity}>
  {snackbar.message}
</Alert>
</Snackbar>
</>
);
}

export default StudentTable;