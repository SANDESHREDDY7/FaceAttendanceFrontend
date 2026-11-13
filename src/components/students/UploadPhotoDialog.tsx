import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  AddPhotoAlternateRounded,
  CheckCircleRounded,
  CenterFocusStrongRounded,
} from "@mui/icons-material";
import { useColorMode } from "../../theme/ThemeContext";
import { API } from "../../config";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  student: any;
}

function UploadPhotoDialog({ open, onClose, onSuccess, student }: Props) {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [photo1, setPhoto1] = useState<File | null>(null);
  const [photo2, setPhoto2] = useState<File | null>(null);
  const [photo3, setPhoto3] = useState<File | null>(null);

  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [preview3, setPreview3] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success" as "success" | "error",
    message: "",
  });

  function handlePhotoChange(index: 1 | 2 | 3, file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (index === 1) {
      setPhoto1(file);
      setPreview1(url);
    } else if (index === 2) {
      setPhoto2(file);
      setPreview2(url);
    } else if (index === 3) {
      setPhoto3(file);
      setPreview3(url);
    }
  }

  function handleClear() {
    setPhoto1(null);
    setPhoto2(null);
    setPhoto3(null);
    setPreview1(null);
    setPreview2(null);
    setPreview3(null);
  }

  async function uploadPhotos() {
    if (!photo1 || !photo2 || !photo3) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please select all 3 reference photos for accurate face encodings.",
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
        message: response.data.message || "3 Face Encodings generated successfully!",
      });

      setTimeout(() => {
        handleClear();
        onClose();
        onSuccess();
      }, 1000);
    } catch (e: any) {
      setSnackbar({
        open: true,
        severity: "error",
        message: e.response?.data?.message ?? "Photo encoding registration failed.",
      });
    } finally {
      setUploading(false);
    }
  }

  const slots = [
    { num: 1 as const, label: "Angle 1 (Front)", preview: preview1 },
    { num: 2 as const, label: "Angle 2 (Slight Left)", preview: preview2 },
    { num: 3 as const, label: "Angle 3 (Slight Right)", preview: preview3 },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
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
            <CenterFocusStrongRounded sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
              Register Biometric Face Photos
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
              Student: <b>{student?.student_name}</b> (Roll: {student?.roll_number})
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ color: isDark ? "#94A3B8" : "#64748B", mb: 3 }}>
            Upload 3 clear images from slightly different angles. The AI extracts 128-dimensional facial landmark embeddings for classroom recognition.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {slots.map((slot) => (
              <Box
                key={slot.num}
                component="label"
                sx={{
                  border: `2px dashed ${slot.preview ? "#10B981" : isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(2, 132, 199, 0.3)"}`,
                  borderRadius: "16px",
                  p: 2,
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  background: slot.preview
                    ? "rgba(16, 185, 129, 0.05)"
                    : isDark
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(0, 0, 0, 0.02)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: slot.preview ? "#10B981" : isDark ? "#38BDF8" : "#0284C7",
                    background: isDark ? "rgba(56, 189, 248, 0.06)" : "rgba(2, 132, 199, 0.04)",
                  },
                }}
              >
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(slot.num, e.target.files?.[0] || null)}
                />

                {slot.preview ? (
                  <>
                    <img
                      src={slot.preview}
                      alt={slot.label}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(16, 185, 129, 0.9)",
                        borderRadius: "50%",
                        p: 0.5,
                        display: "flex",
                      }}
                    >
                      <CheckCircleRounded sx={{ color: "#FFF", fontSize: 18 }} />
                    </Box>
                  </>
                ) : (
                  <>
                    <AddPhotoAlternateRounded sx={{ fontSize: 36, color: isDark ? "#38BDF8" : "#0284C7", mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", textAlign: "center" }}>
                      {slot.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? "#64748B" : "#94A3B8", mt: 0.5 }}>
                      Click to browse
                    </Typography>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => {
              handleClear();
              onClose();
            }}
            sx={{ color: isDark ? "#94A3B8" : "#64748B" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={uploadPhotos}
            disabled={uploading || !photo1 || !photo2 || !photo3}
            sx={{
              background: isDark
                ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            {uploading ? "Extracting Encodings..." : "Extract & Save Encodings"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default UploadPhotoDialog;
