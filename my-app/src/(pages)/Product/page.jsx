// src/(pages)/Product/page.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Divider,
  Chip,
  Rating,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";

import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";

import { getProduct, listProducts } from "../../api/products";
// ถ้ามี cart state แล้วใช้ได้เลย (ไม่มีก็ลบส่วนเกี่ยวกับ useCart ออก)
import { useCart } from "../../state/cart.jsx";

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();              // รับ _id จาก URL
  const { add: addToCart } = useCart?.() || { add: null };

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [prod, setProd] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState("");
  const [rating, setRating] = useState(4);

  // โหลดสินค้า
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    setProd(null);
    setActiveImg("");

    (async () => {
      try {
        const p = await getProduct(id); // { _id, name, price, category, imageMain, imageSide:[] ... }
        if (!alive) return;
        setProd(p);
        const thumb0 = p.imageMain || p.imageSide?.[0] || "";
        setActiveImg(thumb0);

        // โหลดสินค้าที่เกี่ยวข้อง
        const all = await listProducts();
        if (!alive) return;
        const sameCat = (all || []).filter((x) => x.category === p.category && x._id !== p._id).slice(0, 8);
        setRelated(sameCat);
      } catch (e) {
        if (!alive) return;
        setErr(e?.response?.data || e?.message || "Load product failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  // รวมรูปสำหรับแกลเลอรี
  const thumbs = useMemo(() => {
    if (!prod) return [];
    const arr = [];
    if (prod.imageMain) arr.push(prod.imageMain);
    if (Array.isArray(prod.imageSide)) {
      for (const u of prod.imageSide) if (u) arr.push(u);
    }
    // unique
    return [...new Set(arr)];
  }, [prod]);

  const onAddBag = () => {
    if (!prod) return;
    if (addToCart) {
      addToCart({
        key: prod._id,
        name: prod.name,
        price: Number(prod.price) || 0,
        qty: 1,
        img: prod.imageMain || thumbs[0] || "",
        meta: { base: "Classic", size: '6"' }, // ใส่ค่าเริ่มต้นได้ ปรับเองภายหลัง
      });
      navigate("/cart");
    } else {
      // ถ้าไม่มี useCart ให้แค่นำทางไป /cart เพื่อไม่ให้พัง
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#fffde7", display: "flex", flexDirection: "column" }}>
        <Topbar />
        <SearchBar />
        <Container maxWidth="lg" sx={{ py: 6, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  if (err || !prod) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#fffde7", display: "flex", flexDirection: "column" }}>
        <Topbar />
        <SearchBar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Product
          </Typography>
          <Typography color="error" sx={{ mb: 2 }}>
            {err || "Product not found"}
          </Typography>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#fffde7", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Topbar />
      <SearchBar />

      <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 2, md: 4 } }}>
        {/* Back */}
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Grid 3 คอลัมน์ */}
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: {
              xs: "1fr",
              md: "110px 1fr 380px", // ซ้าย thumbs / กลางภาพใหญ่ / ขวา details
              lg: "120px 1fr 420px",
            },
            alignItems: "start",
          }}
        >
          {/* Left thumbnails */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: 1,
              position: "sticky",
              top: { md: 96 },
              zIndex: 1,
            }}
          >
            {thumbs.map((u) => (
              <Box
                key={u}
                onClick={() => setActiveImg(u)}
                sx={{
                  width: { xs: 64, md: 88 },
                  height: { xs: 64, md: 88 },
                  borderRadius: 1,
                  cursor: "pointer",
                  backgroundImage: `url(${u})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  outline: activeImg === u ? "2px solid #ffa000" : "1px solid rgba(0,0,0,.15)",
                }}
                title="thumbnail"
              />
            ))}
          </Box>

          {/* Middle: Main image + ราคา */}
          <Box>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundImage: `url(${activeImg || thumbs[0] || ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                boxShadow: "0 10px 24px rgba(0,0,0,.15)",
              }}
            />
            <Typography sx={{ mt: 2, fontWeight: 700, fontSize: 22 }}>
              {Number(prod.price).toLocaleString()} ฿
            </Typography>
          </Box>

          {/* Right: Detail */}
          <Box
            sx={{
              p: { xs: 0, md: 1 },
              position: { md: "sticky" },
              top: { md: 96 },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              {prod.name}
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              {prod.description || "Choose your flavor"}
            </Typography>

            {/* ตัวเลือกสี/ท็อปปิ้ง (ตกแต่ง) */}
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
              onClick={() => alert("BUY NOW clicked")}
            >
              BUY NOW
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<ShoppingBagOutlinedIcon />}
              sx={{ mb: 1, borderWidth: 2 }}
              onClick={onAddBag}
            >
              ADD YOUR BAG
            </Button>

            <IconButton aria-label="wishlist" sx={{ mb: 2 }}>
              <FavoriteBorderIcon />
            </IconButton>

            <Divider sx={{ my: 2 }} />

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
          {related.length === 0 ? (
            <Typography color="text.secondary">No related items.</Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4,1fr)" },
                gap: 2,
              }}
            >
              {related.map((r) => (
                <Box
                  key={r._id}
                  component={RouterLink}
                  to={`/product/${r._id}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: 2,
                      backgroundImage: `url(${r.imageMain || r.imageSide?.[0] || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                    }}
                  />
                  <Typography sx={{ mt: 1, fontWeight: 600, fontSize: 14, color: "#ffa000" }}>
                    {r.name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                    {Number(r.price).toLocaleString()} ฿
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
