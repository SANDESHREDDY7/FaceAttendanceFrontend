import { useNavigate } from "react-router-dom";

import {
  Add,
  Assessment,
  CloudUpload,
  Person,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const actions = [
  {
    title: "Add Student",
    icon: <Person />,
    color: "#2563EB",
  },
  {
    title: "Upload Group Photo",
    icon: <CloudUpload />,
    color: "#059669",
  },
  {
    title: "Mark Attendance",
    icon: <Add />,
    color: "#EA580C",
  },
  {
    title: "View Reports",
    icon: <Assessment />,
    color: "#7C3AED",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  function handleClick(title: string) {
    switch (title) {
      case "Add Student":
        navigate("/students");
        break;

      case "Upload Group Photo":
      case "Mark Attendance":
        navigate("/attendance");
        break;

      case "View Reports":
        navigate("/reports");
        break;

      default:
        break;
    }
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          ⚡ Quick Actions
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {actions.map((action) => (
            <Box
              key={action.title}
              sx={{
                flex: "1 1 220px",
                minWidth: 220,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={action.icon}
                onClick={() => handleClick(action.title)}
                sx={{
                  height: 70,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  background: action.color,

                  "&:hover": {
                    background: action.color,
                    opacity: 0.9,
                  },
                }}
              >
                {action.title}
              </Button>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default QuickActions;