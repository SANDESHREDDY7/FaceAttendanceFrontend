import { Box } from "@mui/material";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import AttendanceTable from "../components/dashboard/AttendanceTable";

function Dashboard() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, pb: 4 }}>
      <DashboardHeader />

      <StatsCards />

      {/* Middle row: Analytics and Recent Activity */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.8fr 1.2fr" },
          gap: 3,
        }}
      >
        <AttendanceChart />
        <RecentActivity />
      </Box>

      {/* Quick operational actions */}
      <QuickActions />

      {/* Today's verified attendance table */}
      <AttendanceTable />
    </Box>
  );
}

export default Dashboard;
