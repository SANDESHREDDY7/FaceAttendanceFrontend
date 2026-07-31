import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import { getTodayAttendance } from "../../services/attendanceService";

function RecentActivity() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      const data = await getTodayAttendance();
      setActivities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          🕒 Recent Activity
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : activities.length === 0 ? (
          <Typography>No attendance today.</Typography>
        ) : (
          activities.map((record: any, index: number) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 1.5,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#16A34A",
                  }}
                >
                  {record.students.student_name.charAt(0)}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>
                    {record.students.student_name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {record.attendance_time}
                  </Typography>
                </Box>

                <Typography
                  fontWeight="bold"
                  sx={{
                    color: "#16A34A",
                  }}
                >
                  {record.status}
                </Typography>
              </Box>

              {index !== activities.length - 1 && (
                <Divider />
              )}
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default RecentActivity;