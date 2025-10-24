// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Box, Container, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar({ placeholder = "Search" }) {
  const nav = useNavigate();
  const { search } = useLocation();
  const urlQ = new URLSearchParams(search).get("q") || "";
  const [value, setValue] = useState(urlQ);

  const doSearch = () => {
    const q = value.trim();
    if (!q) return;
    nav(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <Box sx={{ background: "linear-gradient(180deg,#ffb300 0%, #ffa000 100%)", borderBottom: "1px solid rgba(0,0,0,.08)" }}>
      <Container maxWidth="lg" sx={{ py: 1.5, display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && doSearch()}
          placeholder={placeholder}
          size="small"
          sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search" onClick={doSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </Box>
  );
}
