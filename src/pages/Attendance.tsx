import { useState } from "react";
import axios from "axios";

import {
  Alert,
  Box,
  Button,
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
} from "@mui/material";

const API = "https://ai-face-attendance-system-production-fc28.up.railway.app";
function Attendance() {
  const [photo, setPhoto] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<any[]>([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success" as "success" | "error",
    message: "",
  });

  async function recognizeAttendance() {
    if (!photo) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please select a group photo.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/attendance/recognize`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const recognized = (response.data.students || []).filter(
        (item: any) => item.student !== null
      );

      setResults(recognized);

      setSnackbar({
        open: true,
        severity: "success",
        message: `${recognized.length} student(s) recognized successfully.`,
      });

    } catch (e: any) {

      setResults([]);

      setSnackbar({
        open: true,
        severity: "error",
        message:
          e.response?.data?.message ??
          "Recognition failed.",
      });

    } finally {

      setLoading(false);

    }
  }

  return (
    <Box p={3}>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Group Attendance
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Button
          variant="outlined"
          component="label"
        >
          Select Group Photo

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPhoto(
                e.target.files?.[0] || null
              )
            }
          />

        </Button>

        <Typography mt={2} color="text.secondary">

          {photo
            ? photo.name
            : "No image selected"}

        </Typography>

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={recognizeAttendance}
          disabled={loading}
        >
          {loading
            ? "Recognizing..."
            : "Recognize Attendance"}
        </Button>

        {loading && (
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        )}

      </Paper>

      <Paper sx={{ p: 3 }}>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Recognition Results
        </Typography>

        {!loading && results.length === 0 ? (

          <Typography color="text.secondary">
            No students recognized yet.
          </Typography>

        ) : (

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Student
                </TableCell>

                <TableCell>
                  Roll No
                </TableCell>

                <TableCell>
                  Class
                </TableCell>

                <TableCell>
                  Section
                </TableCell>

                <TableCell>
                  Confidence
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {results.map((record: any, index: number) => (

                <TableRow key={index}>

                  <TableCell>
                    {record.student.student_name}
                  </TableCell>

                  <TableCell>
                    {record.student.roll_number}
                  </TableCell>

                  <TableCell>
                    {record.student.class}
                  </TableCell>

                  <TableCell>
                    {record.student.section}
                  </TableCell>

                  <TableCell>
                    {record.confidence.toFixed(2)}%
                  </TableCell>

                  <TableCell>

                    <Chip
                      label="Present"
                      color="success"
                    />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        )}

      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}

export default Attendance;