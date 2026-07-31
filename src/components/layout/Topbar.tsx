import { Notifications, AccountCircle } from "@mui/icons-material";

function Topbar() {
  return (
    <div
      style={{
        height: 70,
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 24,
            color: "#111827",
          }}
        >
          AI Face Attendance System
        </h2>

        <p
          style={{
            margin: "4px 0 0 0",
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          Real-time face recognition attendance
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Notifications
          style={{
            fontSize: 28,
            color: "#6b7280",
            cursor: "pointer",
          }}
        />

        <AccountCircle
          style={{
            fontSize: 40,
            color: "#2563eb",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default Topbar;