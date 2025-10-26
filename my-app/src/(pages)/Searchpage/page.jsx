// src/(pages)/Searchpage/page.jsx
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import { listProducts } from "../../api/products";

export default function SearchPage() {
  const { search } = useLocation();
  const q = new URLSearchParams(search).get("q") || "";
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const data = await listProducts(q);
      if (!alive) return;
      setRows(Array.isArray(data) ? data : []);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [q]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fffde7" }}>
      <Topbar />
      <SearchBar placeholder={`Search: ${q || ""}`} />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} mb={2}>
          Search Results {q ? `for "${q}"` : ""}
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress/>
          </Box>
        ) : rows.length === 0 ? (
          <Typography color="text.secondary">No results.</Typography>
        ) : (
          <Grid container spacing={2}>
            {rows.map(p => (
              <Grid item xs={6} md={3} key={p._id} onClick={() => nav(`/product/${p._id}`)} sx={{ cursor: "pointer" }}>
                <Box sx={{
                  aspectRatio: "1/1", borderRadius: 2, backgroundImage:`url(${p.imageMain})`,
                  backgroundSize:"cover", backgroundPosition:"center", boxShadow:"0 6px 16px rgba(0,0,0,.12)"
                }}/>
                <Typography sx={{ mt: 1, fontWeight: 600, color:"#ffa000" }}>{p.name}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                  {Number(p.price).toLocaleString()} ฿
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
