import { useState } from "react";
import axios from "axios";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  student: any;
}

const API = "http://127.0.0.1:8000";

function UploadPhotoDialog({
  open,
  onClose,
  onSuccess,
  student,
}: Props) {
  const [photo1, setPhoto1] = useState<File | null>(null);
  const [photo2, setPhoto2] = useState<File | null>(null);
  const [photo3, setPhoto3] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success" as "success" | "error",
    message: "",
  });

  async function uploadPhotos() {
    if (!photo1 || !photo2 || !photo3) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please select all 3 photos.",
      });
      return;
    }

    const formData = new FormData();

    formData.append("roll_number", student.roll_number);
    formData.append("photos", photo1);
    formData.append("photos", photo2);
    formData.append("photos", photo3);

    try {
      setUploading(true);

      const response = await axios.post(
        `${API}/students/${student.id}/register-face`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSnackbar({
        open: true,
        severity: "success",
        message: response.data.message,
      });

      setTimeout(() => {
        setPhoto1(null);
        setPhoto2(null);
        setPhoto3(null);

        onClose();
        onSuccess();
      }, 1000);

    } catch (e: any) {

      setSnackbar({
        open: true,
        severity: "error",
        message:
          e.response?.data?.message ??
          "Upload Failed",
      });

    } finally {

      setUploading(false);

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
        <DialogTitle>
          Upload Student Photos
        </DialogTitle>

        <DialogContent>

          <Typography mb={3}>
            Student:
            <b> {student?.student_name}</b>
          </Typography>

          <Stack spacing={2}>

            <Button
              variant="outlined"
              component="label"
            >
              Select Photo 1

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhoto1(
                    e.target.files?.[0] || null
                  )
                }
              />
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {photo1
                ? photo1.name
                : "No file selected"}
            </Typography>

            <Button
              variant="outlined"
              component="label"
            >
              Select Photo 2

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhoto2(
                    e.target.files?.[0] || null
                  )
                }
              />
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {photo2
                ? photo2.name
                : "No file selected"}
            </Typography>
            <Button
              variant="outlined"
              component="label"
            >
              Select Photo 3

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhoto3(
                    e.target.files?.[0] || null
                  )
                }
              />
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {photo3
                ? photo3.name
                : "No file selected"}
            </Typography>

          </Stack>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => {
              setPhoto1(null);
              setPhoto2(null);
              setPhoto3(null);
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={uploadPhotos}
            disabled={uploading}
          >
            {uploading
              ? "Uploading..."
              : "Upload & Register Face"}
          </Button>

        </DialogActions>

      </Dialog>

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

    </>
  );
}

export default UploadPhotoDialog;