import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, Divider, IconButton, InputAdornment, Snackbar, Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState("");
  const [sbType, setSbType] = useState("info");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !pw) throw new Error("Please enter email and password.");
      // TODO: call API login ด้วย axios/fetch
      setSbType("success"); setSbMsg("Login success!"); setOpenSb(true);
      // navigate("/dashboard");
    } catch (e) {
      setSbType("error"); setSbMsg(e.message || "Login failed"); setOpenSb(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg,#fff176 0%, #ffb300 45%, #ffb300 100%)",
      }}
    >
      {/* Topbar */}
      <Topbar />

      {/* Content */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "90%", sm: 460 }, p: { xs: 2.5, sm: 3.5 } }}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "white", fontWeight: 800, textShadow: "0 2px 10px rgba(0,0,0,.25)", mb: 3 }}
          >
            Login
          </Typography>

          <Box sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, backdropFilter: "blur(2px)" }}>
            {/* Email */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "white" },
              }}
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPw ? "text" : "password"}
              fullWidth
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw((s) => !s)} edge="end" aria-label="toggle password">
                      {showPw ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "white" },
              }}
            />

            {/* Login button with blue ring */}
            <Box sx={{ position: "relative", mb: 2.5 }}>
              <Box
                sx={{ position: "absolute", inset: -3, borderRadius: 999, border: "3px solid #1565d8", pointerEvents: "none" }}
              />
              <Button
                fullWidth
                onClick={handleLogin}
                sx={{
                  py: 1.2,
                  borderRadius: 999,
                  bgcolor: "#f57c00",
                  color: "white",
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  boxShadow: "0 6px 16px rgba(0,0,0,.15)",
                  "&:hover": { bgcolor: "#ff9800" },
                }}
              >
                Login
              </Button>
            </Box>

            {/* Create / Forgot with navigate() */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Button variant="text" onClick={() => navigate("/register")} sx={{ fontWeight: 700, color: "#0d47a1" }}>
                Create Account
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/ForgetPassword/")}
                sx={{ fontWeight: 700, color: "#0d47a1" }}
              >
                Forget Password ?
              </Button>
            </Box>

            {/* OR divider */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 1.5 }}>
              <Box sx={{ flex: 1 }}><Divider sx={{ borderColor: "rgba(0,0,0,.35)" }} /></Box>
              <Typography sx={{ color: "rgba(0,0,0,.6)", fontWeight: 600 }}>OR</Typography>
              <Box sx={{ flex: 1 }}><Divider sx={{ borderColor: "rgba(0,0,0,.35)" }} /></Box>
            </Box>

            {/* Google button */}
            <Box sx={{ mt: 2, borderRadius: 999, border: "3px solid #2a6af5", p: 0.5 }}>
              <GoogleOAuthProvider clientId="YOUR_GOOGLE_OAUTH_CLIENT_ID">
                <GoogleLogin
                  onSuccess={(res) => { setSbType("success"); setSbMsg("Google login success"); setOpenSb(true); }}
                  onError={() => { setSbType("error"); setSbMsg("Google login error"); setOpenSb(true); }}
                  ux_mode="popup"
                  shape="pill"
                  text="signin_with"
                  width="100%"
                />
              </GoogleOAuthProvider>
            </Box>

            <Typography sx={{ mt: 1.5, textAlign: "center", color: "rgba(0,0,0,.5)", fontSize: 13 }}>
              Forgot email or trouble signing in ? Get help.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar open={openSb} autoHideDuration={3000} onClose={() => setOpenSb(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setOpenSb(false)} severity={sbType} sx={{ width: "100%" }}>
          {sbMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
