import {
    Dashboard,
    Groups,
    PhotoCamera,
    Assessment,
    Settings,
  } from "@mui/icons-material";
  
  import { NavLink } from "react-router-dom";
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <Dashboard />,
      path: "/",
    },
    {
      title: "Students",
      icon: <Groups />,
      path: "/students",
    },
    {
      title: "Group Attendance",
      icon: <PhotoCamera />,
      path: "/attendance",
    },
    {
      title: "Reports",
      icon: <Assessment />,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: <Settings />,
      path: "/settings",
    },
  ];
  
  function Sidebar() {
    return (
      <div
        style={{
          width: 260,
          background: "#111827",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "30px 20px",
            fontSize: 24,
            fontWeight: 700,
            borderBottom: "1px solid #374151",
          }}
        >
          🎓 Face Attendance
        </div>
  
        <div
          style={{
            padding: 15,
          }}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 15,
                padding: "14px 16px",
                marginBottom: 8,
                borderRadius: 12,
                textDecoration: "none",
                color: "white",
                background: isActive ? "#2563EB" : "transparent",
                transition: "0.2s",
              })}
            >
              {item.icon}
  
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
  
  export default Sidebar;