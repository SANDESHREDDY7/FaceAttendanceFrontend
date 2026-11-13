import { useEffect, useState } from "react";
import axios from "axios";
import {
  SchoolRounded,
  CheckCircleRounded,
  CancelRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { useColorMode } from "../../theme/ThemeContext";
import { API } from "../../config";

function StatsCards() {
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
      const res = await axios.get(`${API}/attendance/stats`);
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const cards = [
    {
      title: "Total Students",
      value: stats.total_students,
      tag: "Enrolled Roster",
      icon: <SchoolRounded sx={{ fontSize: 26 }} />,
      glowColor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.08)",
      borderColor: isDark ? "rgba(56, 189, 248, 0.25)" : "rgba(2, 132, 199, 0.2)",
      iconColor: isDark ? "#38BDF8" : "#0284C7",
      iconBg: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
    },
    {
      title: "Present Today",
      value: stats.present_today,
      tag: stats.total_students > 0 ? `${Math.round((stats.present_today / stats.total_students) * 100)}% of total` : "Live",
      icon: <CheckCircleRounded sx={{ fontSize: 26 }} />,
      glowColor: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(5, 150, 105, 0.08)",
      borderColor: isDark ? "rgba(16, 185, 129, 0.25)" : "rgba(5, 150, 105, 0.2)",
      iconColor: isDark ? "#10B981" : "#059669",
      iconBg: isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(5, 150, 105, 0.08)",
    },
    {
      title: "Absent Today",
      value: stats.absent_today,
      tag: stats.absent_today > 0 ? "Pending log" : "No absentees",
      icon: <CancelRounded sx={{ fontSize: 26 }} />,
      glowColor: isDark ? "rgba(244, 63, 94, 0.15)" : "rgba(225, 29, 72, 0.08)",
      borderColor: isDark ? "rgba(244, 63, 94, 0.25)" : "rgba(225, 29, 72, 0.2)",
      iconColor: isDark ? "#F43F5E" : "#E11D48",
      iconBg: isDark ? "rgba(244, 63, 94, 0.12)" : "rgba(225, 29, 72, 0.08)",
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendance_rate}%`,
      tag: stats.attendance_rate >= 75 ? "Optimal rate" : "Below target",
      icon: <TrendingUpRounded sx={{ fontSize: 26 }} />,
      glowColor: isDark ? "rgba(129, 140, 248, 0.15)" : "rgba(79, 70, 229, 0.08)",
      borderColor: isDark ? "rgba(129, 140, 248, 0.25)" : "rgba(79, 70, 229, 0.2)",
      iconColor: isDark ? "#818CF8" : "#4F46E5",
      iconBg: isDark ? "rgba(129, 140, 248, 0.12)" : "rgba(79, 70, 229, 0.08)",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "repeat(4, 1fr)",
        },
        gap: 2.5,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            position: "relative",
            overflow: "hidden",
            background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
            backdropFilter: isDark ? "blur(16px)" : "none",
            border: `1px solid ${card.borderColor}`,
            borderRadius: "18px",
            boxShadow: isDark ? `0 8px 30px ${card.glowColor}` : "0 4px 20px rgba(0, 0, 0, 0.04)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: `0 12px 35px ${card.glowColor}`,
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: card.iconBg,
                  color: card.iconColor,
                  border: `1px solid ${card.borderColor}`,
                }}
              >
                {card.icon}
              </Box>

              <Chip
                label={card.tag}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
                  color: isDark ? "#94A3B8" : "#64748B",
                }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: isDark ? "#94A3B8" : "#64748B",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
                mb: 0.5,
              }}
            >
              {card.title}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: isDark ? "#F8FAFC" : "#0F172A",
                letterSpacing: "-0.03em",
                fontSize: { xs: "2rem", md: "2.3rem" },
              }}
            >
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default StatsCards;
