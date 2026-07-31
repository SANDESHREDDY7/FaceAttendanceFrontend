import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Attendance from "../pages/Attendance";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route
          path="students"
          element={<Students />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;