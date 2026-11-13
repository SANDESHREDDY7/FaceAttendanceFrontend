import { Box, Typography, Chip } from "@mui/material";
import { FiberManualRecord, CalendarTodayRounded } from "@mui/icons-material";
import ThemeToggle from "../common/ThemeToggle";
import { useColorMode } from "../../theme/ThemeContext";

function DashboardHeader() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        mb: 3.5,
      }}
    >
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
          Dashboard Overview
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 0.5,
            color: isDark ? "#94A3B8" : "#64748B",
            fontSize: "0.95rem",
          }}
        >
          Real-time biometric attendance monitoring and analytics.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
        <Chip
          icon={<CalendarTodayRounded sx={{ fontSize: "14px !important", color: isDark ? "#94A3B8 !important" : "#64748B !important" }} />}
          label={today}
          sx={{
            background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            color: isDark ? "#CBD5E1" : "#475569",
            fontWeight: 600,
            fontSize: "0.82rem",
            py: 2,
            px: 0.5,
          }}
        />

        <Chip
          icon={<FiberManualRecord sx={{ fontSize: "10px !important", color: "#10B981 !important" }} />}
          label="Engine Active"
          sx={{
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: isDark ? "#34D399" : "#059669",
            fontWeight: 700,
            fontSize: "0.82rem",
            py: 2,
            px: 0.5,
          }}
        />

        {/* Dashboard Light / Dark Mode Toggle */}
        <ThemeToggle variant="pill" />
      </Box>
    </Box>
  );
}

export default DashboardHeader;
