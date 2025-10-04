import React from "react";
import { Box, Container, TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const SearchBar = () => {
  return (
    <Box sx={{ background: "linear-gradient(180deg,#ffb300 0%, #ffa000 100%)", borderBottom: "1px solid rgba(0,0,0,.08)" }}>
      <Container maxWidth="lg" sx={{ py: 1.5, display: "flex", alignItems: "center", gap: 3 }}>
        <TextField
          placeholder="Search"
          size="small"
          sx={{
            width: { xs: "100%", sm: 480 },
            "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
            <PersonOutlineIcon fontSize="small" />
            <Typography variant="body2">Account</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
            <ShoppingBagOutlinedIcon fontSize="small" />
            <Typography variant="body2">Shopping bag</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchBar;
