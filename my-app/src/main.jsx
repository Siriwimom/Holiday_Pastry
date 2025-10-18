import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserProfile from "./pages/UserProfile.jsx";
import "./index.css"; // Import CSS หลักเข้ามา

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProfile />
  </StrictMode>
);