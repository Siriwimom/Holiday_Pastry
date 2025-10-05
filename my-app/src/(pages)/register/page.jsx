import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();              // ✅ ใช้ hook ภายในคอมโพเนนต์

  const handleLogin = () => {                  // ✅ ย้าย handler มาไว้ในนี้
    // TODO: ตรวจสอบ email/pw ผ่าน API
    navigate("/home");                         // ไปหน้า Home
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg,#fff176 0%, #ffb300 45%, #ffb300 100%)",
      }}
    >
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h4" align="center" fontWeight={700} mb={3}>
          HOLIDAY PASTRY
        </Typography>

        <Typography variant="h5" align="center" fontWeight={600} mb={2}>
          Sign up
        </Typography>

        <TextField label="Email" fullWidth sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "white" } }} />
        <TextField label="Password" type="password" fullWidth sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "white" } }} />
        <TextField label="Password Confirm" type="password" fullWidth sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "white" } }} />

        <Button
          type="button"                          // ✅ กัน default submit
          fullWidth
          onClick={handleLogin}
          sx={{
            py: 1.2,
            borderRadius: 999,
            bgcolor: "#f57c00",
            color: "white",
            fontWeight: 700,
            "&:hover": { bgcolor: "#ff9800" },
            mb: 2,
          }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
