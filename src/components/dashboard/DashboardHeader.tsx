import { Box, Typography, Chip } from "@mui/material";
import { FiberManualRecord, CalendarTodayRounded } from "@mui/icons-material";
import ThemeToggle from "../common/ThemeToggle";
import { useColorMode } from "../../theme/ThemeContext";

function DashboardHeader() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
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
        mb: { xs: 2.5, md: 3.5 },
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.125rem" },
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
            fontSize: { xs: "0.85rem", sm: "0.95rem" },
          }}
        >
          Real-time biometric attendance monitoring and analytics.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}>
        <Chip
          icon={<CalendarTodayRounded sx={{ fontSize: "14px !important", color: isDark ? "#94A3B8 !important" : "#64748B !important" }} />}
          label={today}
          size="small"
          sx={{
            background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            color: isDark ? "#CBD5E1" : "#475569",
            fontWeight: 600,
            fontSize: "0.78rem",
            py: 1.8,
            px: 0.5,
          }}
        />

        <Chip
          icon={<FiberManualRecord sx={{ fontSize: "10px !important", color: "#10B981 !important" }} />}
          label="Engine Active"
          size="small"
          sx={{
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: isDark ? "#34D399" : "#059669",
            fontWeight: 700,
            fontSize: "0.78rem",
            py: 1.8,
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
