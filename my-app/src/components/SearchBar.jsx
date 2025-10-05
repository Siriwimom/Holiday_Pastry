import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../state/cart.jsx";

const SearchBar = ({ placeholder = "Search" }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const urlQ = new URLSearchParams(search).get("q") || "";
  const [value, setValue] = useState(urlQ);
  const { items } = useCart() || {};
  const totalItems = Array.isArray(items) ? items.reduce((s, it) => s + (it.qty || 0), 0) : 0;

  // เก็บ history ใน localStorage
  const pushHistory = (q) => {
    if (!q.trim()) return;
    const key = "searchHistory";
    const old = JSON.parse(localStorage.getItem(key) || "[]");
    const next = [q, ...old.filter((it) => it.toLowerCase() !== q.toLowerCase())].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(next));
  };

  const doSearch = () => {
    const q = value.trim();
    if (!q) return;
    pushHistory(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doSearch();
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#ffb300 0%, #ffa000 100%)",
        borderBottom: "1px solid rgba(0,0,0,.08)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* ช่อง Search */}
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size="small"
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff" },
          }}
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

        {/* ปุ่มขวา */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Account */}
          <Box
            onClick={() => navigate("/account")}
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          >
            <PersonOutlineIcon fontSize="small" />
            <Typography variant="body2">Account</Typography>
          </Box>

          {/* Shopping Bag */}
          <Box
            onClick={() => navigate("/cart")}
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingBagOutlinedIcon fontSize="small" />
            </Badge>
            <Typography variant="body2">Shopping bag</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchBar;
