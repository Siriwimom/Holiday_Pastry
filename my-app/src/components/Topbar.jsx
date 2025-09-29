import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Topbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(180deg,#fff176 0%, #ffb300 60%, #ffb300 100%)",
        height: 100,
        justifyContent: "center",
        
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Kanit','Noto Sans Thai',sans-serif",  // ✅ สำคัญ
            fontWeight: 600,
            letterSpacing: 2,
            color: "white",
            textAlign: "center",
          }}
        >
          HOLIDAY PASTRY
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
