import {
  DashboardRounded,
  GroupsRounded,
  PhotoCameraRounded,
  AssessmentRounded,
  SettingsRounded,
  CenterFocusStrongRounded,
  FiberManualRecordRounded,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";
import { useColorMode } from "../../theme/ThemeContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardRounded sx={{ fontSize: 22 }} />,
    path: "/",
  },
  {
    title: "Students",
    icon: <GroupsRounded sx={{ fontSize: 22 }} />,
    path: "/students",
  },
  {
    title: "Group Attendance",
    icon: <PhotoCameraRounded sx={{ fontSize: 22 }} />,
    path: "/attendance",
  },
  {
    title: "Reports",
    icon: <AssessmentRounded sx={{ fontSize: 22 }} />,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: <SettingsRounded sx={{ fontSize: 22 }} />,
    path: "/settings",
  },
];

function Sidebar() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        width: 270,
        height: "100vh",
        background: isDark ? "rgba(11, 15, 23, 0.95)" : "#FFFFFF",
        backdropFilter: "blur(20px)",
        borderRight: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
        zIndex: 20,
      }}
    >
      <Box>
        {/* Brand Header */}
        <Box
          sx={{
            p: 3,
            pb: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: isDark
                ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: isDark
                ? "0 0 20px rgba(56, 189, 248, 0.35)"
                : "0 4px 14px rgba(2, 132, 199, 0.25)",
            }}
          >
            <CenterFocusStrongRounded sx={{ fontSize: 26 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                background: isDark
                  ? "linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)"
                  : "linear-gradient(180deg, #0F172A 0%, #334155 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FaceAttend AI
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isDark ? "#38BDF8" : "#0284C7",
                fontWeight: 600,
                fontSize: "0.72rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <FiberManualRecordRounded sx={{ fontSize: 8 }} /> Biometric v2.0
            </Typography>
          </Box>
        </Box>

        {/* Navigation Section */}
        <Box sx={{ p: 2, mt: 1 }}>
          <Typography
            variant="caption"
            sx={{
              px: 1.5,
              mb: 1.5,
              display: "block",
              color: isDark ? "#64748B" : "#94A3B8",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.7rem",
            }}
          >
            Navigation
          </Typography>

          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.8,
                    px: 2,
                    py: 1.4,
                    mb: 1,
                    borderRadius: "12px",
                    color: isActive
                      ? isDark ? "#F8FAFC" : "#0284C7"
                      : isDark ? "#94A3B8" : "#64748B",
                    background: isActive
                      ? isDark
                        ? "linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.08) 100%)"
                        : "linear-gradient(90deg, rgba(2, 132, 199, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%)"
                      : "transparent",
                    border: isActive
                      ? isDark
                        ? "1px solid rgba(56, 189, 248, 0.3)"
                        : "1px solid rgba(2, 132, 199, 0.25)"
                      : "1px solid transparent",
                    boxShadow: isActive
                      ? isDark
                        ? "0 4px 16px rgba(56, 189, 248, 0.12)"
                        : "0 2px 8px rgba(2, 132, 199, 0.08)"
                      : "none",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.92rem",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      color: isDark ? "#F8FAFC" : "#0F172A",
                      background: isActive
                        ? isDark
                          ? "linear-gradient(90deg, rgba(56, 189, 248, 0.2) 0%, rgba(99, 102, 241, 0.12) 100%)"
                          : "rgba(2, 132, 199, 0.14)"
                        : isDark
                          ? "rgba(255, 255, 255, 0.04)"
                          : "rgba(0, 0, 0, 0.03)",
                      transform: "translateX(3px)",
                    },
                    "& svg": {
                      color: isActive
                        ? isDark ? "#38BDF8" : "#0284C7"
                        : isDark ? "#64748B" : "#94A3B8",
                      transition: "color 0.2s ease",
                    },
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Box>
              )}
            </NavLink>
          ))}
        </Box>
      </Box>

      {/* Bottom Profile Bar */}
      <Box
        sx={{
          p: 2,
          m: 2,
          borderRadius: "14px",
          background: isDark ? "rgba(19, 26, 42, 0.6)" : "rgba(0, 0, 0, 0.03)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.06)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #6366F1, #EC4899)",
            fontSize: "0.9rem",
            fontWeight: 700,
          }}
        >
          AD
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            noWrap
            sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}
          >
            Administrator
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#10B981", display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.7rem" }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }}></span>
            Online
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
