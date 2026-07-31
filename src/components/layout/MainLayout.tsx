import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#F5F7FB",
      }}
    >
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}

        <Topbar />

        {/* Page Content */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "30px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;