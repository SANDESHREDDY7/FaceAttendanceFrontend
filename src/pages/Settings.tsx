import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Slider,
  Snackbar,
  Alert,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  TuneRounded,
  StorageRounded,
  ScheduleRounded,
  SaveRounded,
} from "@mui/icons-material";
import { useColorMode } from "../theme/ThemeContext";
import { API } from "../config";

function Settings() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [threshold, setThreshold] = useState<number>(0.46);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [highPrecision, setHighPrecision] = useState(true);

  const [snack, setSnack] = useState(false);

  useEffect(() => {
    const savedThresh = localStorage.getItem("face_match_threshold");
    if (savedThresh) setThreshold(parseFloat(savedThresh));
  }, []);

  function handleSave() {
    localStorage.setItem("face_match_threshold", threshold.toString());
    setSnack(true);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, pb: 4, maxWidth: 900 }}>
      {/* Title */}
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
            System & AI Parameters
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? "#94A3B8" : "#64748B", mt: 0.5 }}>
            Configure recognition sensitivity, database routes, and localization.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<SaveRounded />}
          onClick={handleSave}
          sx={{
            background: isDark
              ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
              : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
            color: "#FFFFFF",
            fontWeight: 700,
            px: 3,
            py: 1.2,
          }}
        >
          Save Changes
        </Button>
      </Box>

      {/* Card 1: AI Recognition Engine Calibration */}
      <Card
        sx={{
          borderRadius: "18px",
          background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
          backdropFilter: isDark ? "blur(16px)" : "none",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        <CardContent sx={{ p: 3.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
                color: isDark ? "#38BDF8" : "#0284C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TuneRounded sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Biometric Distance Threshold
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Calibrate the Euclidean tolerance cutoff for face recognition
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: 2.5,
              borderRadius: "14px",
              background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.04)" : "1px solid rgba(0, 0, 0, 0.05)",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Current Tolerance: <span style={{ color: isDark ? "#38BDF8" : "#0284C7", fontFamily: "'JetBrains Mono', monospace" }}>{threshold}</span>
              </Typography>
              <Chip
                label={threshold <= 0.45 ? "Strict / Low False Positives" : threshold <= 0.5 ? "Balanced (Recommended)" : "Relaxed"}
                size="small"
                sx={{
                  background: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
                  color: isDark ? "#38BDF8" : "#0284C7",
                  fontWeight: 700,
                }}
              />
            </Box>
            <Slider
              value={threshold}
              min={0.3}
              max={0.65}
              step={0.01}
              onChange={(_, v) => setThreshold(v as number)}
              sx={{
                color: isDark ? "#38BDF8" : "#0284C7",
                "& .MuiSlider-thumb": {
                  boxShadow: isDark ? "0 0 12px #38BDF8" : "0 2px 8px rgba(2, 132, 199, 0.3)",
                },
              }}
            />
            <Typography variant="caption" sx={{ color: isDark ? "#64748B" : "#94A3B8", display: "block", mt: 1 }}>
              Lower values (e.g. 0.40) require tighter match accuracy; higher values allow for lower lighting and angle variances. Default is 0.46.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                High-Precision Face Landmarks
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Extract 68 multi-point landmarks (dlib 5-point vs 68-point model)
              </Typography>
            </Box>
            <Switch
              checked={highPrecision}
              onChange={(e) => setHighPrecision(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: isDark ? "#38BDF8" : "#0284C7",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: isDark ? "#38BDF8" : "#0284C7",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Card 2: Database & API Backend Routing */}
      <Card
        sx={{
          borderRadius: "18px",
          background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
          backdropFilter: isDark ? "blur(16px)" : "none",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        <CardContent sx={{ p: 3.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(5, 150, 105, 0.08)",
                color: isDark ? "#10B981" : "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StorageRounded sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Backend Connectivity & Storage
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Service endpoints and data persistence tier
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Connected Backend API"
              value={API}
              disabled
              fullWidth
              InputProps={{
                endAdornment: (
                  <Chip
                    label="Online"
                    size="small"
                    sx={{
                      background: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(5, 150, 105, 0.1)",
                      color: isDark ? "#34D399" : "#059669",
                      fontWeight: 700,
                    }}
                  />
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                  Storage Mode
                </Typography>
                <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                  Local SQLite (local_attendance.db) with seamless Supabase synchronization fallback
                </Typography>
              </Box>
              <Chip
                label="Local SQLite Active"
                sx={{
                  background: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
                  color: isDark ? "#38BDF8" : "#0284C7",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Card 3: Localization & Timezone */}
      <Card
        sx={{
          borderRadius: "18px",
          background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
          backdropFilter: isDark ? "blur(16px)" : "none",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        <CardContent sx={{ p: 3.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: isDark ? "rgba(129, 140, 248, 0.12)" : "rgba(79, 70, 229, 0.08)",
                color: isDark ? "#818CF8" : "#6366F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScheduleRounded sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Session Timestamp Localization
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Ensure timestamps align with institutional school hours
              </Typography>
            </Box>
          </Box>

          <TextField
            select
            label="Default Session Timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            fullWidth
          >
            <MenuItem value="Asia/Kolkata">India Standard Time (IST - Asia/Kolkata)</MenuItem>
            <MenuItem value="UTC">Coordinated Universal Time (UTC)</MenuItem>
            <MenuItem value="America/New_York">Eastern Time (EST - America/New_York)</MenuItem>
            <MenuItem value="Europe/London">Greenwich Mean Time (GMT - Europe/London)</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      <Snackbar
        open={snack}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setSnack(false)}
        sx={{ zIndex: 99999 }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
          System parameters updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Settings;
