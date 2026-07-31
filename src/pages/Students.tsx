import { useState } from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import SearchBar from "../components/students/SearchBar";
import StudentTable from "../components/students/StudentTable";
import StudentDialog from "../components/students/StudentDialog";

function Students() {
  const [openDialog, setOpenDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Students
          </Typography>

          <Typography color="text.secondary">
            Manage all students in the system
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.3,
          }}
        >
          Add Student
        </Button>
      </Box>

      <SearchBar />

      <Box mt={3}>
        <StudentTable key={refreshKey} />
      </Box>

      <StudentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />
    </Box>
  );
}

export default Students;