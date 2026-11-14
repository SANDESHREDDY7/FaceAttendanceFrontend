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
  CircularProgress,
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

// Client-side image compressor: Resizes large smartphone photos to prevent mobile timeouts and server OOM crashes
async function compressImage(file: File, maxDimension = 1024, quality = 0.85): Promise<File> {
  return new Promise((resolve) => {
    // If file is already reasonably small, pass through
    if (file.size < 250 * 1024 && file.type === "image/jpeg") {
      return resolve(file);
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                type: "image/jpeg",
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          quality
        );
      } else {
        resolve(file);
      }
    };
    img.onerror = () => resolve(file);
    img.src = url;
  });
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
        message: "Please select all 3 photos (Front, Left, Right angles) before saving.",
      });
      return;
    }

    try {
      setUploading(true);

      // Fast client-side compression to prevent uploading 30MB+ raw mobile images
      const [cPhoto1, cPhoto2, cPhoto3] = await Promise.all([
        compressImage(photo1),
        compressImage(photo2),
        compressImage(photo3),
      ]);

      const formData = new FormData();
      formData.append("roll_number", student.roll_number);
      formData.append("photos", cPhoto1);
      formData.append("photos", cPhoto2);
      formData.append("photos", cPhoto3);

      const response = await axios.post(
        `${API}/students/${student.id}/register-face`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success || (response.data.faces_registered && response.data.faces_registered === 0)) {
        throw new Error(response.data.message || "No face detected in the photos.");
      }

      setSnackbar({
        open: true,
        severity: "success",
        message: response.data.message || "3 Face Encodings generated successfully!",
      });

      setTimeout(() => {
        handleClear();
        onClose();
        onSuccess();
      }, 1200);
    } catch (e: any) {
      const msg = e.response?.data?.message || e.message || "Photo encoding registration failed.";
      setSnackbar({
        open: true,
        severity: "error",
        message: msg,
      });
    } finally {
      setUploading(false);
    }
  }

  const slots = [
    { num: 1 as const, label: "Photo 1 (Front View)", preview: preview1 },
    { num: 2 as const, label: "Photo 2 (Left Angle)", preview: preview2 },
    { num: 3 as const, label: "Photo 3 (Right Angle)", preview: preview3 },
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
            maxHeight: "92vh",
            m: { xs: 1.5, sm: 2 },
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1, px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 2.5 } }}>
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
              flexShrink: 0,
            }}
          >
            <CenterFocusStrongRounded sx={{ fontSize: 22 }} />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", fontSize: { xs: "1rem", sm: "1.15rem" } }}>
              Register Biometric Face Photos
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", display: "block" }}>
              Student: <b>{student?.student_name}</b> (Roll: {student?.roll_number})
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 1, overflowY: "auto", maxHeight: "calc(92vh - 160px)" }}>
          <Typography variant="body2" sx={{ color: isDark ? "#94A3B8" : "#64748B", mb: 2, fontSize: { xs: "0.82rem", sm: "0.88rem" } }}>
            Upload 3 clear images showing the student's face from front and angled views. The AI model extracts 128-dimensional facial vectors.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 1.5,
            }}
          >
            {slots.map((slot) => (
              <Box
                key={slot.num}
                component="label"
                sx={{
                  border: `2px dashed ${slot.preview ? "#10B981" : isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(2, 132, 199, 0.3)"}`,
                  borderRadius: "14px",
                  p: 1.5,
                  height: { xs: 125, sm: 160 },
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
                        top: 6,
                        right: 6,
                        background: "rgba(16, 185, 129, 0.95)",
                        borderRadius: "50%",
                        p: 0.4,
                        display: "flex",
                      }}
                    >
                      <CheckCircleRounded sx={{ color: "#FFF", fontSize: 16 }} />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                        py: 0.5,
                        px: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#FFF", fontWeight: 700, fontSize: "0.72rem" }}>
                        {slot.label}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <AddPhotoAlternateRounded sx={{ fontSize: 30, color: isDark ? "#38BDF8" : "#0284C7", mb: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", textAlign: "center", fontSize: "0.8rem" }}>
                      {slot.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? "#64748B" : "#94A3B8", mt: 0.3, fontSize: "0.7rem" }}>
                      Tap to select photo
                    </Typography>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: 2, gap: 1 }}>
          <Button
            onClick={() => {
              handleClear();
              onClose();
            }}
            disabled={uploading}
            sx={{ color: isDark ? "#94A3B8" : "#64748B" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={uploadPhotos}
            disabled={uploading || !photo1 || !photo2 || !photo3}
            startIcon={uploading ? <CircularProgress size={16} sx={{ color: "#FFF" }} /> : null}
            sx={{
              background: isDark
                ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              px: { xs: 2, sm: 3 },
            }}
          >
            {uploading ? "Extracting Encodings..." : "Extract & Save Encodings"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
