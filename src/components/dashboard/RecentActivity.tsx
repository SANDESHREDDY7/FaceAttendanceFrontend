import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Chip,
} from "@mui/material";
import { AccessTimeRounded, VerifiedUserRounded } from "@mui/icons-material";
import { getTodayAttendance } from "../../services/attendanceService";
import { useColorMode } from "../../theme/ThemeContext";

function RecentActivity() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      const data = await getTodayAttendance();
      setActivities(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      sx={{
        borderRadius: "18px",
        background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
        backdropFilter: isDark ? "blur(16px)" : "none",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
              <AccessTimeRounded sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Recent Activity
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Live verification feed
              </Typography>
            </Box>
          </Box>

          <Chip
            label={`${activities.length} logs`}
            size="small"
            sx={{
              background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
              color: isDark ? "#94A3B8" : "#64748B",
              fontWeight: 600,
              fontSize: "0.72rem",
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, py: 4 }}>
            <CircularProgress size={30} sx={{ color: isDark ? "#38BDF8" : "#0284C7" }} />
          </Box>
        ) : activities.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              py: 5,
              color: isDark ? "#64748B" : "#94A3B8",
              textAlign: "center",
            }}
          >
            <VerifiedUserRounded sx={{ fontSize: 44, color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", mb: 1.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#94A3B8" : "#64748B" }}>
              No check-ins recorded today
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#64748B" : "#94A3B8", mt: 0.5 }}>
              Upload a group photo in Attendance to recognize students
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              maxHeight: 280,
              overflowY: "auto",
              pr: 0.5,
            }}
          >
            {activities.slice(0, 6).map((record: any, index: number) => {
              const studentName = record.students?.student_name || "Unknown";
              const rollNumber = record.students?.roll_number || "-";
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.8,
                    p: 1.5,
                    borderRadius: "12px",
                    background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.04)" : "1px solid rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                      borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: "linear-gradient(135deg, #10B981, #059669)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    {studentName.charAt(0)}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", fontSize: "0.88rem" }}
                    >
                      {studentName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? "#64748B" : "#94A3B8", fontSize: "0.75rem" }}>
                      Roll #{rollNumber} • {record.attendance_time}
                    </Typography>
                  </Box>

                  <Chip
                    label="Verified"
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      color: isDark ? "#34D399" : "#059669",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
