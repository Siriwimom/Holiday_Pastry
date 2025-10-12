// src/(pages)/Login/page.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";
import Topbar from "../../components/Topbar";
import { useAuth } from "../../state/auth";
import { api } from "../../lib/api";
const LoginPage = () => {
  const { setUser } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [sb, setSb] = useState({ open: false, type: "info", msg: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
  try {
    const { user } = await loginApi({ email, password: pw });
    if (!user) throw new Error("Invalid response: missing user");
    setUser(user);
    navigate(user.role === "admin" ? "/admin" : "/home");
  } catch (e) {
    console.error(e);
    // แจ้ง error ตามต้องการ
  }
};



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg,#fff176 0%, #ffb300 45%, #ffb300 100%)",
      }}
    >
      <Topbar />

      {/* Content */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "90%", sm: 460 }, p: { xs: 2.5, sm: 3.5 } }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              color: "#fff",
              fontWeight: 800,
              textShadow: "0 2px 10px rgba(0,0,0,.25)",
              mb: 3,
            }}
          >
            Login
          </Typography>

          <Box sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, backdropFilter: "blur(2px)" }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "#fff" },
              }}
            />

            <TextField
              label="Password"
              type={showPw ? "text" : "password"}
              fullWidth
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw((s) => !s)} edge="end">
                      {showPw ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "#fff" },
              }}
            />

            {/* Login Button */}
            <Box sx={{ position: "relative", mb: 2.5 }}>
              <Box
                sx={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: 999,
                  border: "3px solid #1565d8",
                  pointerEvents: "none",
                }}
              />
              <Button
                fullWidth
                onClick={handleLogin}
                sx={{
                  py: 1.2,
                  borderRadius: 999,
                  bgcolor: "#f57c00",
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  boxShadow: "0 6px 16px rgba(0,0,0,.15)",
                  "&:hover": { bgcolor: "#ff9800" },
                }}
              >
                Login
              </Button>
            </Box>

            {/* Links */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
            >
              <Button
                variant="text"
                onClick={() => navigate("/register")}
                sx={{ fontWeight: 700, color: "#0d47a1" }}
              >
                Create Account
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/forgetpassword")}
                sx={{ fontWeight: 700, color: "#0d47a1" }}
              >
                Forget Password ?
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 1.5 }}>
              <Box sx={{ flex: 1 }}>
                <Divider sx={{ borderColor: "rgba(0,0,0,.35)" }} />
              </Box>
              <Typography sx={{ color: "rgba(0,0,0,.6)", fontWeight: 600 }}>OR</Typography>
              <Box sx={{ flex: 1 }}>
                <Divider sx={{ borderColor: "rgba(0,0,0,.35)" }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={sb.open}
        autoHideDuration={3000}
        onClose={() => setSb((s) => ({ ...s, open: false }))}
      >
        <Alert severity={sb.type} onClose={() => setSb((s) => ({ ...s, open: false }))}>
          {sb.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
