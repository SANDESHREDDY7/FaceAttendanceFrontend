import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import { useColorMode } from "../../theme/ThemeContext";

function MainLayout() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

      {/* Desktop Permanent Sidebar */}
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "block" },
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* Mobile / Tablet Temporary Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 270,
            background: isDark ? "#0B0F17" : "#FFFFFF",
            borderRight: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: isDark ? "0 0 50px rgba(0, 0, 0, 0.8)" : "0 8px 32px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <Sidebar onClose={handleDrawerToggle} />
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          width: { xs: "100%", md: "calc(100% - 270px)" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Topbar onToggleSidebar={handleDrawerToggle} />

        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
