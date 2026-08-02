import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";

const API = "https://ai-face-attendance-system-production-fc28.up.railway.app";
function AttendanceChart() {
  const [stats, setStats] = useState({
    total_students: 0,
    present_today: 0,
    absent_today: 0,
    attendance_rate: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const response = await axios.get(`${API}/attendance/stats`);
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const data = [
    {
      title: "Present Today",
      value: stats.present_today,
      max: stats.total_students,
      percentage: stats.attendance_rate,
    },
    {
      title: "Absent Today",
      value: stats.absent_today,
      max: stats.total_students,
      percentage:
        stats.total_students === 0
          ? 0
          : Number(
              (
                (stats.absent_today / stats.total_students) *
                100
              ).toFixed(2)
            ),
    },
  ];

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
          📊 Attendance Analytics
        </Typography>

        {data.map((item) => (
          <Box
            key={item.title}
            sx={{
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography fontWeight={600}>
                {item.title}
              </Typography>

              <Typography fontWeight="bold">
                {item.value} / {item.max}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={item.percentage}
              sx={{
                height: 12,
                borderRadius: 10,
              }}
            />

            <Typography
              mt={1}
              textAlign="right"
              color="text.secondary"
            >
              {item.percentage}%
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default AttendanceChart;