import React, { useMemo, useState, useEffect } from "react";
import {
  Box, Container, Typography, Button, IconButton, Divider, Chip, Rating
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";

/* โหลดรูปจาก assets แบบเดียวกับ Home */
const assetModules = import.meta.glob("../../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}", {
  eager: true,
  import: "default",
});
const IMAGES = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    const filename = path.split("/").pop();
    const keyRaw = filename.replace(/\.[^.]+$/, "");
    const key = keyRaw.toUpperCase();
    return [key, url];
  })
);

// รายการอื่น ๆ ไว้ทำ "You might also like"
const ALL_KEYS = Object.keys(IMAGES);

const ProductPage = () => {
  const navigate = useNavigate();
  const { key } = useParams(); // key จาก URL (เช่น CF3, BS2, LO1)
  const mainKey = (key || "").toUpperCase();
  const mainUrl = IMAGES[mainKey];

  // ถ้า key ไม่เจอรูป กลับหน้า /home
  useEffect(() => {
    if (!mainUrl && ALL_KEYS.length) navigate("/home");
  }, [mainUrl, navigate]);

  // เลือกรูปย่อย (สมมติจากคีย์ที่ขึ้นต้นด้วยตัวเดียวกัน หรือสุ่มใกล้เคียง)
  const thumbnails = useMemo(() => {
    const prefix = mainKey.replace(/\d+$/, ""); // เช่น CF3 -> CF
    const candidates = ALL_KEYS.filter((k) => k.startsWith(prefix));
    return candidates.length > 0 ? candidates : ALL_KEYS.slice(0, 6);
  }, [mainKey]);

  const [active, setActive] = useState(mainUrl);
  const [rating, setRating] = useState(4);

  useEffect(() => {
    setActive(mainUrl);
  }, [mainUrl]);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#fffde7", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
  <Topbar />
  <SearchBar />

      {/* Main content */}
      <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 2, md: 4 } }}>
        {/* Back */}
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* 3-คอลัมน์เต็มจอบนจอใหญ่ */}
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: {
              xs: "1fr",
              md: "110px 1fr 360px", // ซ้าย thumbnails / กลางภาพใหญ่ / ขวา detail
              lg: "120px 1fr 420px",
            },
            alignItems: "start",
          }}
        >
          {/* Left thumbnails (vertical บน md+) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: 1,
              position: "sticky",
              top: { md: 96 }, // ให้เลื่อนแล้วยังเห็น (96~ สูงของ header + search)
              zIndex: 1,
            }}
          >
            {thumbnails.map((k) => (
              <Box
                key={k}
                onClick={() => setActive(IMAGES[k])}
                sx={{
                  width: { xs: 64, md: 88 },
                  height: { xs: 64, md: 88 },
                  borderRadius: 1,
                  cursor: "pointer",
                  backgroundImage: `url(${IMAGES[k]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  outline: active === IMAGES[k] ? "2px solid #ffa000" : "1px solid rgba(0,0,0,.15)",
                }}
                title={k}
              />
            ))}
          </Box>

          {/* Middle: Main image */}
          <Box>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundImage: `url(${active})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                boxShadow: "0 10px 24px rgba(0,0,0,.15)",
              }}
            />
            {/* ราคา (โชว์ใต้ภาพใหญ่ด้วย เพื่อเด่น) */}
            <Typography sx={{ mt: 2, fontWeight: 700, fontSize: 22 }}>2,290 BATH</Typography>
          </Box>

          {/* Right: Detail panel */}
          <Box
            sx={{
              p: { xs: 0, md: 1 },
              position: { md: "sticky" },
              top: { md: 96 },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              {mainKey.replace(/(\D+)(\d+)/, "$1 $2")}
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              Choose your flavor
            </Typography>

            {/* ตัวเลือกสี/ท็อปปิ้ง (placeholder) */}
            <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
              {["#7a3f00", "#ffd700", "#d4af37", "#fff"].map((c, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 22,
                    height: 22,
                    bgcolor: c,
                    borderRadius: "50%",
                    border: "1px solid #999",
                  }}
                />
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#ffa000", "&:hover": { bgcolor: "#ffb300" }, mb: 1 }}
            >
              BUY NOW
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ShoppingBagOutlinedIcon />}
              sx={{ mb: 1, borderWidth: 2 }}
            >
              ADD YOUR BAG
            </Button>
            <IconButton aria-label="wishlist" sx={{ mb: 2 }}>
              <FavoriteBorderIcon />
            </IconButton>

            <Divider sx={{ my: 2 }} />

            {/* ข้อมูลราคา/สถานะเพิ่มเติม */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
              <Chip label="Made fresh daily" variant="outlined" />
              <Chip label="Best seller" color="warning" variant="outlined" />
              <Chip label="Pickup available" variant="outlined" />
            </Box>
            <Typography sx={{ color: "text.secondary" }}>
              Handcrafted pastry with seasonal ingredients. Perfect for celebrations and gifts.
            </Typography>
          </Box>
        </Box>

        {/* Product Review */}
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Product Review
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Rating value={rating} onChange={(_, v) => setRating(v)} />
            <Typography sx={{ color: "text.secondary" }}>{rating}.0 / 5</Typography>
          </Box>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            You will be redirected to our Reviews page to complete your review.
          </Typography>
        </Box>

        {/* You might also like */}
        <Box sx={{ mt: { xs: 5, md: 6 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            You might also like
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4,1fr)" },
              gap: 2,
            }}
          >
            {ALL_KEYS.slice(0, 8).map((k) => (
              <Box
                key={k}
                component={RouterLink}
                to={`/product/${k}`}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 2,
                    backgroundImage: `url(${IMAGES[k]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                  }}
                />
                <Typography sx={{ mt: 1, fontWeight: 600, fontSize: 14 }}>
                  {k.replace(/(\D+)(\d+)/, "$1 $2")}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                  1,650 B
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default ProductPage;
