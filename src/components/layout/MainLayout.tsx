import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useColorMode } from "../../theme/ThemeContext";

function MainLayout() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: isDark ? "#0B0F17" : "#F8FAFC",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.25s ease",
      }}
    >
      {/* Ambient background glows */}
      {isDark && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "-15%",
              left: "20%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-10%",
              right: "10%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)",
              filter: "blur(70px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Topbar />

        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2.5, md: 4 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
