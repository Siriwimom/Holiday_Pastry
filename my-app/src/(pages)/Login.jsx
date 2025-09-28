"use client";
import React, { useState } from "react";
import { Box, Button, TextField, IconButton, InputAdornment, Snackbar, Alert } from "@mui/material";
import "./Login.css";

const LoginPage = () => {


  return (
    <div className="app">
      <main className="content">
        <div className="background" />
        <div className="relative-container">
          <div className="grid-container">
        
            <div className="col-span-12 flex justify-center items-center">
              <Box className="login-box">
                <h2 className="welcome-text">Welcome to Sportify Booking</h2>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ textAlign: "right", marginBottom: "16px" }}>
                  <a href="/forget_password/main" className="link">
                    Forget Password?
                  </a>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    backgroundColor: "#f57c00",
                    "&:hover": {
                      backgroundColor: "#ff9800",
                    },
                  }}
                  className="login-button"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <GoogleOAuthProvider clientId="781146923340-5m1nuui7ccnj3oobg74bgfkprtgiimhe.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleLogin}
                    useOneTap
                    size="large"
                    shape="pill"
                    theme="outline"
                    className="google-login"
                  />
                </GoogleOAuthProvider>
                <Box className="sign-up">
                  <p>
                    Don't have an account?{" "}
                    <a href="/register" className="link">
                      Sign up
                    </a>
                  </p>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </main>

      {/* Snackbar แจ้งเตือน */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
