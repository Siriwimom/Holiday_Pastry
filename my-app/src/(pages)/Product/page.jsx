import React, { useMemo, useState, useEffect } from "react";
import {
  Box, Container, Typography, Button, IconButton, Divider, Chip, Rating, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import { useCart } from "../../state/cart.jsx";

/* โหลดรูปจาก assets */
const assetModules = import.meta.glob("../../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}", {
  eager: true,
  import: "default",
});
const IMAGES = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    const filename = path.split("/").pop();
    const key = filename.replace(/\.[^.]+$/, "").toUpperCase();
    return [key, url];
  })
);
const ALL_KEYS = Object.keys(IMAGES);

export default function ProductPage() {
  const navigate = useNavigate();
  const { key } = useParams();
  const mainKey = (key || "").toUpperCase();
  const mainUrl = IMAGES[mainKey];

  const [active, setActive] = useState(mainUrl);
  const [rating, setRating] = useState(4);
  const [base, setBase] = useState("Sponge");        // ✅ choose your cake base
  const [size, setSize] = useState("6\"");           // ✅ size
  const price = 2290;                                // demo price

  const { addItem } = useCart();

  useEffect(() => {
    if (!mainUrl && ALL_KEYS.length) navigate("/home");
  }, [mainUrl, navigate]);

  useEffect(() => setActive(mainUrl), [mainUrl]);

  const thumbnails = useMemo(() => {
    const prefix = mainKey.replace(/\d+$/, "");
    const group = ALL_KEYS.filter((k) => k.startsWith(prefix));
    return group.length ? group : ALL_KEYS.slice(0, 6);
  }, [mainKey]);

  const addToBag = () => {
    addItem({
      key: mainKey,
      name: mainKey.replace(/(\D+)(\d+)/, "$1 $2"),
      img: mainUrl,
      price,
      qty: 1,
      meta: { base, size },
    });
  };

  const buyNow = () => {
    addToBag();
    navigate("/checkout");
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#fffde7", overflowX: "hidden" }}>
      <Topbar />
      <SearchBar />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* layout หลัก */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "120px 1fr 360px" },
            gap: 2,
            alignItems: "start",
          }}
        >
          {/* thumbnails */}
          <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, gap: 1 }}>
            {thumbnails.map((k) => (
              <Box
                key={k}
                onClick={() => setActive(IMAGES[k])}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1,
                  backgroundImage: `url(${IMAGES[k]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  outline: active === IMAGES[k] ? "2px solid #ffa000" : "1px solid #ccc",
                  cursor: "pointer",
                }}
                title={k}
              />
            ))}
          </Box>

          {/* main image + ราคา */}
          <Box>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                backgroundImage: `url(${active})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                boxShadow: "0 10px 24px rgba(0,0,0,.15)",
              }}
            />
            <Typography sx={{ mt: 2, fontWeight: 700, fontSize: 22 }}>
              {price.toLocaleString()} BATH
            </Typography>
          </Box>

          {/* detail panel */}
          <Box sx={{ p: { xs: 0, md: 1 } }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {mainKey.replace(/(\D+)(\d+)/, "$1 $2")}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              Choose your flavor
            </Typography>

            {/* ✅ Choose your cake base */}
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Choose your cake base</Typography>
            <ToggleButtonGroup
              color="warning"
              value={base}
              exclusive
              onChange={(_, v) => v && setBase(v)}
              sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
            >
              {["Sponge", "Chocolate", "Vanilla"].map((b) => (
                <ToggleButton key={b} value={b} sx={{ borderRadius: 2 }}>
                  {b}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* ✅ Size */}
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Size</Typography>
            <ToggleButtonGroup
              color="warning"
              value={size}
              exclusive
              onChange={(_, v) => v && setSize(v)}
              sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
            >
              {['6"', '8"', '10"'].map((s) => (
                <ToggleButton key={s} value={s} sx={{ borderRadius: 2 }}>
                  {s}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Button
              fullWidth
              variant="contained"
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={addToBag}
              sx={{ bgcolor: "#ffa000", "&:hover": { bgcolor: "#ffb300" }, mb: 1 }}
            >
              ADD YOUR BAG
            </Button>

            {/* ✅ Payment / Buy now */}
            <Button fullWidth variant="outlined" onClick={buyNow} sx={{ mb: 1, borderWidth: 2 }}>
              Payment
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

        {/* ✅ Product Review */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Product Review
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Rating value={rating} onChange={(_, v) => setRating(v)} />
            <Typography sx={{ color: "text.secondary" }}>{rating}.0 / 5</Typography>
          </Box>
        </Box>

        {/* ✅ You might also like */}
        <Box sx={{ mt: 6 }}>
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
                <Typography sx={{ mt: 1, fontWeight: 600, fontSize: 14, color: "#ffa000" }}>
                  {k.replace(/(\D+)(\d+)/, "$1 $2")}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 13 }}>1,650 B</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
