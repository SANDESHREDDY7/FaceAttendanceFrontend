import { createTheme } from "@mui/material/styles";

export function getAppTheme(mode: "light" | "dark") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#38BDF8" : "#0284C7",
        light: isDark ? "#7DD3FC" : "#38BDF8",
        dark: isDark ? "#0284C7" : "#0369A1",
        contrastText: isDark ? "#0B0F17" : "#FFFFFF",
      },
      secondary: {
        main: isDark ? "#818CF8" : "#6366F1",
        light: "#A5B4FC",
        dark: "#4F46E5",
      },
      success: {
        main: isDark ? "#10B981" : "#059669",
        light: "#34D399",
        dark: "#047857",
      },
      error: {
        main: isDark ? "#F43F5E" : "#E11D48",
        light: "#FB7185",
        dark: "#BE123C",
      },
      warning: {
        main: isDark ? "#F59E0B" : "#D97706",
        light: "#FBBF24",
        dark: "#B45309",
      },
      background: {
        default: isDark ? "#0B0F17" : "#F8FAFC",
        paper: isDark ? "rgba(19, 26, 42, 0.8)" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#F8FAFC" : "#0F172A",
        secondary: isDark ? "#94A3B8" : "#64748B",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      h4: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h5: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h6: {
        fontWeight: 700,
      },
      subtitle1: {
        color: isDark ? "#94A3B8" : "#64748B",
      },
      subtitle2: {
        color: isDark ? "#94A3B8" : "#64748B",
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#0B0F17" : "#F8FAFC",
            color: isDark ? "#F8FAFC" : "#0F172A",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
            backdropFilter: isDark ? "blur(16px)" : "none",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.25)" : "0 4px 20px rgba(0, 0, 0, 0.04)",
            borderRadius: 18,
            backgroundImage: "none",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              borderColor: isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.15)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
            backdropFilter: isDark ? "blur(16px)" : "none",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
            borderRadius: 18,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "10px 20px",
            fontWeight: 600,
            boxShadow: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: isDark ? "0 4px 14px rgba(56, 189, 248, 0.25)" : "0 4px 14px rgba(2, 132, 199, 0.2)",
              transform: "translateY(-1px)",
            },
          },
          containedPrimary: {
            background: isDark
              ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
              : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
            color: "#FFFFFF",
            fontWeight: 700,
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #7DD3FC 0%, #818CF8 100%)"
                : "linear-gradient(135deg, #0369A1 0%, #4338CA 100%)",
            },
          },
          outlined: {
            borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
            color: isDark ? "#F8FAFC" : "#0F172A",
            "&:hover": {
              borderColor: isDark ? "#38BDF8" : "#0284C7",
              backgroundColor: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.06)",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.06)",
            padding: "16px 20px",
            color: isDark ? "#F8FAFC" : "#0F172A",
          },
          head: {
            color: isDark ? "#94A3B8" : "#64748B",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#F1F5F9",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.03) !important" : "rgba(0, 0, 0, 0.02) !important",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 8,
            fontSize: "0.75rem",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? "#111827" : "#FFFFFF",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 20,
            boxShadow: isDark
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.75)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isDark ? "#94A3B8" : "#64748B",
            "&.MuiInputLabel-shrink": {
              backgroundColor: isDark ? "#111827" : "#FFFFFF",
              padding: "0 6px",
              borderRadius: "4px",
              marginLeft: "-2px",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.5)" : "#FFFFFF",
            "& fieldset": {
              borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
            },
            "&:hover fieldset": {
              borderColor: isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)",
            },
            "&.Mui-focused fieldset": {
              borderColor: isDark ? "#38BDF8" : "#0284C7",
              boxShadow: isDark ? "0 0 0 3px rgba(56, 189, 248, 0.15)" : "0 0 0 3px rgba(2, 132, 199, 0.15)",
            },
          },
          input: {
            color: isDark ? "#F8FAFC" : "#0F172A",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              backgroundColor: isDark ? "rgba(15, 23, 42, 0.5)" : "#FFFFFF",
              "& fieldset": {
                borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)",
              },
              "&.Mui-focused fieldset": {
                borderColor: isDark ? "#38BDF8" : "#0284C7",
                boxShadow: isDark ? "0 0 0 3px rgba(56, 189, 248, 0.15)" : "0 0 0 3px rgba(2, 132, 199, 0.15)",
              },
            },
          },
        },
      },
      MuiSnackbar: {
        defaultProps: {
          anchorOrigin: { vertical: "top", horizontal: "right" },
        },
        styleOverrides: {
          root: {
            zIndex: 99999,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            fontWeight: 600,
            boxShadow: isDark ? "0 8px 30px rgba(0, 0, 0, 0.5)" : "0 8px 30px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
  });
}
