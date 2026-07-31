import { useEffect, useState } from "react";
import axios from "axios";

import {
  School,
  CheckCircle,
  Cancel,
  TrendingUp,
} from "@mui/icons-material";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const API = "http://127.0.0.1:8000";

function StatsCards() {
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
      const res = await axios.get(`${API}/attendance/stats`);
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const cards = [
    {
      title: "Total Students",
      value: stats.total_students,
      icon: <School sx={{ fontSize: 42, color: "#2563eb" }} />,
    },
    {
      title: "Present Today",
      value: stats.present_today,
      icon: <CheckCircle sx={{ fontSize: 42, color: "#16a34a" }} />,
    },
    {
      title: "Absent Today",
      value: stats.absent_today,
      icon: <Cancel sx={{ fontSize: 42, color: "#dc2626" }} />,
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendance_rate}%`,
      icon: <TrendingUp sx={{ fontSize: 42, color: "#ea580c" }} />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        marginTop: 30,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            flex: "1 1 220px",
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent>
            {card.icon}

            <Typography
              sx={{
                mt: 2,
                color: "#6B7280",
              }}
            >
              {card.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default StatsCards;