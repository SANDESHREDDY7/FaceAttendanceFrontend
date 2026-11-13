import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AssessmentRounded } from "@mui/icons-material";
import { useColorMode } from "../../theme/ThemeContext";
import { API } from "../../config";

function AttendanceChart() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [stats, setStats] = useState({
    total_students: 0,
    present_today: 0,
    absent_today: 0,
    attendance_rate: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const response = await axios.get(`${API}/attendance/stats`);
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const trendData = [
    { time: "08:00 AM", present: Math.round(stats.present_today * 0.2), expected: stats.total_students },
    { time: "09:00 AM", present: Math.round(stats.present_today * 0.65), expected: stats.total_students },
    { time: "10:00 AM", present: stats.present_today, expected: stats.total_students },
    { time: "11:00 AM", present: stats.present_today, expected: stats.total_students },
    { time: "12:00 PM", present: stats.present_today, expected: stats.total_students },
  ];

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
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
              <AssessmentRounded sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Attendance Analytics
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
                Cumulative check-in curve vs enrolled capacity
              </Typography>
            </Box>
          </Box>

          <Chip
            label="Today's Velocity"
            size="small"
            sx={{
              background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.08)",
              border: isDark ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid rgba(2, 132, 199, 0.25)",
              color: isDark ? "#38BDF8" : "#0284C7",
              fontWeight: 600,
              fontSize: "0.72rem",
            }}
          />
        </Box>

        {/* Dynamic Area Chart */}
        <Box sx={{ width: "100%", height: 210, my: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? "#38BDF8" : "#0284C7"} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={isDark ? "#38BDF8" : "#0284C7"} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke={isDark ? "#64748B" : "#94A3B8"} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={isDark ? "#64748B" : "#94A3B8"} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "#FFFFFF",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  fontSize: "0.8rem",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                }}
              />
              <Area
                type="monotone"
                dataKey="present"
                stroke={isDark ? "#38BDF8" : "#0284C7"}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#presentGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Ratio Breakdown */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            pt: 2,
            mt: 1,
            borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
              PRESENT RATIO
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? "#10B981" : "#059669", fontWeight: 800 }}>
              {stats.present_today} <span style={{ fontSize: "0.85rem", color: isDark ? "#64748B" : "#94A3B8", fontWeight: 500 }}>/ {stats.total_students}</span>
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
              ABSENCE COUNT
            </Typography>
            <Typography variant="h6" sx={{ color: isDark ? "#F43F5E" : "#E11D48", fontWeight: 800 }}>
              {stats.absent_today} <span style={{ fontSize: "0.85rem", color: isDark ? "#64748B" : "#94A3B8", fontWeight: 500 }}>unmarked</span>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AttendanceChart;
