// src/(pages)/Search/page.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Container, Typography, Chip, Link, IconButton
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useSearchParams, Link as RouterLink } from "react-router-dom";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";

/* โหลดรูปจาก assets ทั้งโฟลเดอร์ */
const assetModules = import.meta.glob("../../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}", {
  eager: true,
  import: "default",
});
const IMAGES = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    const filename = path.split("/").pop() || "";
    const key = filename.replace(/\.[^.]+$/, "").toUpperCase(); // เช่น BS1, CF3
    return [key, url];
  })
);
const ALL_KEYS = Object.keys(IMAGES);

/* แปลงคีย์เป็นชื่ออ่านง่าย */
const keyToName = (k) =>
  k.replace(/(\D+)(\d+)/, "$1 $2")
    .replace(/BS/i, "Mayongchid Cheese Pie ")
    .replace(/CF/i, "Cake ")
    .replace(/LO/i, "Limited Offer ");

/* แปลงเป็นรายการสินค้า */
const PRODUCTS = ALL_KEYS.map((k, idx) => ({
  key: k,
  name: keyToName(k).trim() || `Item ${idx + 1}`,
  price: 1000 + (idx % 10) * 100,
  image: IMAGES[k],
}));

const SearchPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );

  useEffect(() => {
    // sync กันกรณี searchbar เพิ่งบันทึก
    setHistory(JSON.parse(localStorage.getItem("searchHistory") || "[]"));
  }, [q]);

  const results = useMemo(() => {
    if (!q) return [];
    const qq = q.toLowerCase();
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(qq) || p.key.toLowerCase().includes(qq)
    );
  }, [q]);

  const clearHistory = () => {
    localStorage.setItem("searchHistory", "[]");
    setHistory([]);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f7f8e1", overflowX: "clip" }}>
      <Topbar />
      <SearchBar />

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Back */}
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* แถว history + ลบ */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          {history.length > 0 && (
            <Link component="button" underline="hover" onClick={clearHistory}>
              Delete Search History
            </Link>
          )}
        </Box>

        {/* chips ประวัติคำค้น */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, mb: 3 }}>
          {history.map((item) => (
            <Chip
              key={item}
              label={item}
              onClick={() => navigate(`/search?q=${encodeURIComponent(item)}`)}
              variant="outlined"
              sx={{ bgcolor: "#eee", "&:hover": { bgcolor: "#e6e6e6" } }}
            />
          ))}
        </Box>

        {/* ผลลัพธ์การค้นหา (ถ้ามี q) */}
        {q && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Results for “{q}”
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                gap: 2,
                mb: 5,
              }}
            >
              {results.length === 0 ? (
                <Typography sx={{ gridColumn: "1 / -1", color: "text.secondary" }}>
                  No results. Try another keyword.
                </Typography>
              ) : (
                results.map((p) => (
                  <Box
                    key={p.key}
                    component={RouterLink}
                    to={`/product/${p.key}`}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        borderRadius: 2,
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                      }}
                    />
                    <Typography sx={{ mt: 1, fontSize: 13.5 }}>
                      {p.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                      {p.price.toLocaleString()} B
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </>
        )}

        {/* Recommend box */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Recommend
        </Typography>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: "#eee6a8",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {PRODUCTS.slice(0, 6).map((p) => (
              <Box
                key={p.key}
                component={RouterLink}
                to={`/product/${p.key}`}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    mx: "auto",
                    borderRadius: 1.5,
                    backgroundImage: `url(${p.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,.12)",
                  }}
                />
                <Typography sx={{ mt: 1, fontSize: 12.5, textAlign: "center" }}>
                  {p.name.length > 28 ? p.name.slice(0, 27) + "…" : p.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchPage;
