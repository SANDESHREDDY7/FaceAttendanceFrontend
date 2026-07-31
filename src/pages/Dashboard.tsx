import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import AttendanceTable from "../components/dashboard/AttendanceTable";

function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <StatsCards />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <AttendanceChart />

        <RecentActivity />
      </div>

      <div
        style={{
          marginTop: "25px",
        }}
      >
        <QuickActions />
      </div>

      <div
        style={{
          marginTop: "25px",
        }}
      >
        <AttendanceTable />
      </div>
    </>
  );
}

export default Dashboard;