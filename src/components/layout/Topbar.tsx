import {
  NotificationsNoneRounded,
  SearchRounded,
  BoltRounded,
} from "@mui/icons-material";
import { Box, Typography, IconButton, Badge, Chip, Avatar } from "@mui/material";
import ThemeToggle from "../common/ThemeToggle";
import { useColorMode } from "../../theme/ThemeContext";

function Topbar() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        height: 72,
        px: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: isDark ? "rgba(11, 15, 23, 0.75)" : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
        zIndex: 10,
      }}
    >
      {/* Left: System Status & Search */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 0.8,
            borderRadius: "10px",
            background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.08)",
            color: isDark ? "#94A3B8" : "#64748B",
            width: 280,
            cursor: "pointer",
            "&:hover": {
              borderColor: isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(2, 132, 199, 0.3)",
              color: isDark ? "#E2E8F0" : "#1E293B",
            },
            transition: "all 0.2s ease",
          }}
        >
          <SearchRounded sx={{ fontSize: 19 }} />
          <Typography variant="body2" sx={{ flex: 1, fontSize: "0.85rem" }}>
            Search student or roll no...
          </Typography>
          <Typography
            variant="caption"
            sx={{
              px: 0.8,
              py: 0.2,
              borderRadius: "4px",
              background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
              fontSize: "0.68rem",
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ⌘K
          </Typography>
        </Box>

        <Chip
          icon={<BoltRounded sx={{ fontSize: "16px !important", color: isDark ? "#10B981 !important" : "#059669 !important" }} />}
          label="AI Model Online • 0.46 Thresh"
          size="small"
          sx={{
            background: isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.08)",
            border: isDark ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(16, 185, 129, 0.3)",
            color: isDark ? "#34D399" : "#059669",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      {/* Right: Actions, Theme Toggle & Admin Profile */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* Global Light / Dark Mode Toggle */}
        <ThemeToggle variant="icon" />

        <IconButton
          sx={{
            color: isDark ? "#94A3B8" : "#64748B",
            background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "10px",
            "&:hover": {
              color: isDark ? "#38BDF8" : "#0284C7",
              background: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.06)",
            },
          }}
        >
          <Badge
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: isDark ? "#38BDF8" : "#0284C7",
                boxShadow: isDark ? "0 0 8px #38BDF8" : "none",
              },
            }}
          >
            <NotificationsNoneRounded sx={{ fontSize: 21 }} />
          </Badge>
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pl: 1.5,
            borderLeft: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: isDark
                ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.85rem",
            }}
          >
            A
          </Avatar>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.2, color: isDark ? "#F8FAFC" : "#0F172A" }}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#64748B" : "#94A3B8", fontSize: "0.7rem" }}>
              Academic Head
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
