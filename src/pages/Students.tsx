import { useState } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import SearchBar from "../components/students/SearchBar";
import StudentTable from "../components/students/StudentTable";
import StudentDialog from "../components/students/StudentDialog";
import { useColorMode } from "../theme/ThemeContext";

function Students() {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const [openDialog, setOpenDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, pb: 4 }}>
      {/* Page Title & Add Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
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
            Student Roster
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? "#94A3B8" : "#64748B", mt: 0.5, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
            Enroll students and configure 128-d biometric facial landmarks.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" } }}>
          <Chip
            icon={<GroupsRoundedIcon sx={{ fontSize: "16px !important", color: isDark ? "#38BDF8 !important" : "#0284C7 !important" }} />}
            label="Biometric Active"
            size="small"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.08)",
              border: isDark ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid rgba(2, 132, 199, 0.25)",
              color: isDark ? "#38BDF8" : "#0284C7",
              fontWeight: 700,
              height: 36,
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              background: isDark
                ? "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
                : "linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              px: 3,
              py: 1.2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      {/* Filter and Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
      />

      {/* Modern Student Table */}
      <StudentTable
        key={refreshKey}
        searchTerm={searchTerm}
        selectedClass={selectedClass}
      />

      {/* Enrollment Dialog */}
      <StudentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />
    </Box>
  );
}

export default Students;
