import { Button, IconButton, Tooltip } from "@mui/material";
import { LightModeRounded, DarkModeRounded } from "@mui/icons-material";
import { useColorMode } from "../../theme/ThemeContext";

interface Props {
  variant?: "icon" | "pill";
}

export function ThemeToggle({ variant = "icon" }: Props) {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === "dark";

  if (variant === "pill") {
    return (
      <Button
        onClick={toggleColorMode}
        startIcon={isDark ? <LightModeRounded sx={{ color: "#FBBF24" }} /> : <DarkModeRounded sx={{ color: "#6366F1" }} />}
        sx={{
          borderRadius: "12px",
          px: 2,
          py: 0.9,
          fontSize: "0.82rem",
          fontWeight: 700,
          background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          color: isDark ? "#F8FAFC" : "#0F172A",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
          "&:hover": {
            background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        {isDark ? "Switch to Light" : "Switch to Dark"}
      </Button>
    );
  }

  return (
    <Tooltip title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}>
      <IconButton
        onClick={toggleColorMode}
        sx={{
          p: 1.1,
          borderRadius: "12px",
          background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          color: isDark ? "#FBBF24" : "#4F46E5",
          transition: "all 0.25s ease",
          "&:hover": {
            background: isDark ? "rgba(251, 191, 36, 0.12)" : "rgba(79, 70, 229, 0.1)",
            transform: "rotate(15deg)",
          },
        }}
      >
        {isDark ? <LightModeRounded sx={{ fontSize: 20 }} /> : <DarkModeRounded sx={{ fontSize: 20 }} />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
