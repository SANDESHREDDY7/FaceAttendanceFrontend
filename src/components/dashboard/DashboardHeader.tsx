import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { NotificationsNone, Search } from "@mui/icons-material";

function DashboardHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      {/* Left */}

      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Dashboard
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 16,
          }}
        >
          Welcome back! Here's today's attendance overview.
        </Typography>
      </Box>

      {/* Right */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          sx={{
            bgcolor: "#fff",
            border: "1px solid #E5E7EB",
          }}
        >
          <Search />
        </IconButton>

        <IconButton
          sx={{
            bgcolor: "#fff",
            border: "1px solid #E5E7EB",
          }}
        >
          <NotificationsNone />
        </IconButton>

        <Avatar
          sx={{
            bgcolor: "#2563EB",
            width: 45,
            height: 45,
            fontWeight: "bold",
          }}
        >
          A
        </Avatar>
      </Box>
    </Box>
  );
}

export default DashboardHeader;