import { useNavigate } from "react-router-dom";
import {
  PersonAddRounded,
  AddPhotoAlternateRounded,
  CenterFocusStrongRounded,
  AssessmentRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useColorMode } from "../../theme/ThemeContext";

const actions = [
  {
    title: "Add Student",
    description: "Enroll student & register facial biometric vectors",
    icon: <PersonAddRounded sx={{ fontSize: 24 }} />,
    color: "#38BDF8",
    lightColor: "#0284C7",
    bg: "rgba(56, 189, 248, 0.1)",
    border: "rgba(56, 189, 248, 0.25)",
    path: "/students",
  },
  {
    title: "Upload Group Photo",
    description: "Run multi-face detection & identify classroom attendees",
    icon: <AddPhotoAlternateRounded sx={{ fontSize: 24 }} />,
    color: "#10B981",
    lightColor: "#059669",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.25)",
    path: "/attendance",
  },
  {
    title: "Mark Attendance",
    description: "Review recognition results & verify confidence logs",
    icon: <CenterFocusStrongRounded sx={{ fontSize: 24 }} />,
    color: "#818CF8",
    lightColor: "#6366F1",
    bg: "rgba(129, 140, 248, 0.1)",
    border: "rgba(129, 140, 248, 0.25)",
    path: "/attendance",
  },
  {
    title: "Export Reports",
    description: "Generate structured attendance logs in CSV/PDF",
    icon: <AssessmentRounded sx={{ fontSize: 24 }} />,
    color: "#F59E0B",
    lightColor: "#D97706",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
    path: "/reports",
  },
];

function QuickActions() {
  const navigate = useNavigate();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Card
      sx={{
        borderRadius: "18px",
        background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
        backdropFilter: isDark ? "blur(16px)" : "none",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: isDark ? "#F8FAFC" : "#0F172A" }}>
            ⚡ Operational Quick Actions
          </Typography>
          <Typography variant="caption" sx={{ color: isDark ? "#94A3B8" : "#64748B" }}>
            Frequently used attendance and enrollment workflows
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          {actions.map((action) => (
            <Box
              key={action.title}
              onClick={() => navigate(action.path)}
              sx={{
                p: 2.5,
                borderRadius: "14px",
                background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:hover": {
                  background: action.bg,
                  borderColor: action.border,
                  transform: "translateY(-3px)",
                  boxShadow: `0 8px 24px ${action.bg}`,
                  "& .action-arrow": {
                    transform: "translateX(4px)",
                    color: isDark ? action.color : action.lightColor,
                  },
                },
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: action.bg,
                    color: isDark ? action.color : action.lightColor,
                    border: `1px solid ${action.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {action.icon}
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A", fontSize: "0.95rem", mb: 0.5 }}
                >
                  {action.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#64748B" : "#94A3B8", fontSize: "0.8rem", lineHeight: 1.4 }}
                >
                  {action.description}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <ArrowForwardRounded
                  className="action-arrow"
                  sx={{
                    fontSize: 18,
                    color: isDark ? "#64748B" : "#94A3B8",
                    transition: "all 0.2s ease",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default QuickActions;
