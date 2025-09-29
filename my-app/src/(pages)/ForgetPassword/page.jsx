import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, Snackbar, Alert
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import Topbar from "../../components/Topbar";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState("");
  const [sbType, setSbType] = useState("info");

  const handleReset = () => {
    if (!email) {
      setSbType("error");
      setSbMsg("Please enter your email address");
      setOpenSb(true);
      return;
    }
    // TODO: call API reset password
    setSbType("success");
    setSbMsg("Password reset link sent to your email");
    setOpenSb(true);
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
      {/* ✅ Topbar */}
      <Topbar />

      {/* Content */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "90%", sm: 460 }, p: { xs: 2.5, sm: 3.5 } }}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "white", fontWeight: 800, textShadow: "0 2px 10px rgba(0,0,0,.25)", mb: 3 }}
          >
            Reset Your Password
          </Typography>

          <Box sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, backdropFilter: "blur(2px)" }}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "white" },
              }}
            />

            {/* Reset button */}
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
                onClick={handleReset}
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
                endIcon={<LockResetIcon />}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Snackbar แจ้งเตือน */}
      <Snackbar open={openSb} autoHideDuration={3000} onClose={() => setOpenSb(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setOpenSb(false)} severity={sbType} sx={{ width: "100%" }}>
          {sbMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResetPasswordPage;
