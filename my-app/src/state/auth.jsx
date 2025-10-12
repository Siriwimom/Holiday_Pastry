// src/state/auth.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";              // <-- ใช้ default import
import { api } from "../lib/api";                // axios instance

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // <== สำคัญ

  // รีไฮเดรตจาก localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("✅ Decoded JWT:", decoded);
        setUser(decoded);
      } catch (err) {
        console.error("❌ JWT Decode error:", err);
      }
    }
  }, []);

  const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
