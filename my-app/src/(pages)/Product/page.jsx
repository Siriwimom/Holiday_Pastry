// src/(pages)/Product/page.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Box, Container, Typography, Button, IconButton, Divider, Chip, Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";

import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import { getProduct } from "../../api/products";
import { useCart } from "../../state/cart.jsx";

export default function ProductPage() {
  const nav = useNavigate();
  const { id } = useParams(); // NOTE: ปรับ route เป็น /product/:id แล้วนะ
  const { add } = useCart();

  const [p, setP] = useState(null);
  const [rating, setRating] = useState(4);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getProduct(id);
        if (!alive) return;
        setP(data);
      } catch (e) {
        console.error("getProduct error:", e);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const images = useMemo(() => {
    if (!p) return [];
    const arr = [p.imageMain, ...(Array.isArray(p.imageSides) ? p.imageSides : [])].filter(Boolean);
    return arr.length ? arr : [p.imageMain].filter(Boolean);
  }, [p]);

  const [active, setActive] = useState(null);
  useEffect(() => { setActive(images[0] || null); }, [images]);

  if (!p) {
    return (
      <Box sx={{ minHeight:"100vh", bgcolor:"#fffde7" }}>
        <Topbar /><SearchBar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  const addToBag = () => {
    add({
      key: p._id,
      name: p.name,
      price: Number(p.price) || 0,
      img: p.imageMain,
      qty: 1,
      meta: { base: p.category, size: p.size || '6"' },
    });
  };

  const buyNow = () => {
    addToBag();
    nav("/checkout");
  };

  return (
    <Box sx={{ width:"100%", minHeight:"100vh", bgcolor:"#fffde7", display:"flex", flexDirection:"column", overflowX:"hidden" }}>
      <Topbar />
      <SearchBar />

      <Container maxWidth="xl" sx={{ flex:1, py:{ xs:2, md:4 } }}>
        <IconButton onClick={() => nav(-1)} sx={{ mb: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          sx={{
            display:"grid",
            gap:{ xs:2, md:3 },
            gridTemplateColumns:{ xs:"1fr", md:"110px 1fr 360px", lg:"120px 1fr 420px" },
            alignItems:"start",
          }}
        >
          {/* Thumbnails */}
          <Box sx={{ display:"flex", flexDirection:{ xs:"row", md:"column" }, gap:1, position:"sticky", top:{ md:96 } }}>
            {images.map((src, i) => (
              <Box key={i}
                onClick={() => setActive(src)}
                sx={{
                  width:{ xs:64, md:88 }, height:{ xs:64, md:88 }, borderRadius:1, cursor:"pointer",
                  backgroundImage:`url(${src})`, backgroundSize:"cover", backgroundPosition:"center",
                  outline: active===src ? "2px solid #ffa000" : "1px solid rgba(0,0,0,.15)",
                }}/>
            ))}
          </Box>

          {/* Main image */}
          <Box>
            <Box sx={{
              width:"100%", aspectRatio:"1/1", backgroundImage:`url(${active})`,
              backgroundSize:"cover", backgroundPosition:"center", borderRadius:2, boxShadow:"0 10px 24px rgba(0,0,0,.15)",
            }}/>
            <Typography sx={{ mt:2, fontWeight:700, fontSize:22 }}>
              {Number(p.price).toLocaleString()} ฿
            </Typography>
          </Box>

          {/* Detail */}
          <Box sx={{ p:{ xs:0, md:1 }, position:{ md:"sticky" }, top:{ md:96 } }}>
            <Typography variant="h5" sx={{ fontWeight:800, mb:1 }}>{p.name}</Typography>
            <Typography sx={{ color:"text.secondary", mb:2 }}>Choose your flavor</Typography>

            {/* (ตัวอย่าง) ตัวเลือก */}
            <Box sx={{ display:"flex", gap:1.5, mb:2 }}>
              {["#7a3f00","#ffd700","#d4af37","#fff"].map((c,i)=>(
                <Box key={i} sx={{ width:22, height:22, bgcolor:c, borderRadius:"50%", border:"1px solid #999" }}/>
              ))}
            </Box>

            <Button fullWidth variant="contained"
              sx={{ bgcolor:"#ffa000", "&:hover":{ bgcolor:"#ffb300" }, mb:1 }}
              onClick={buyNow}
            >BUY NOW</Button>

            <Button fullWidth variant="outlined" startIcon={<ShoppingBagOutlinedIcon/>}
              sx={{ mb:1, borderWidth:2 }} onClick={addToBag}
            >ADD YOUR BAG</Button>

            <IconButton aria-label="wishlist" sx={{ mb:2 }}>
              <FavoriteBorderIcon />
            </IconButton>

            <Divider sx={{ my:2 }} />

            <Box sx={{ display:"flex", gap:1, flexWrap:"wrap", mb:1 }}>
              <Chip label="Made fresh daily" variant="outlined" />
              <Chip label="Best seller" color="warning" variant="outlined" />
              <Chip label="Pickup available" variant="outlined" />
            </Box>
            <Typography sx={{ color:"text.secondary" }}>
              Handcrafted pastry with seasonal ingredients. Perfect for celebrations and gifts.
            </Typography>
          </Box>
        </Box>

        {/* Review */}
        <Box sx={{ mt:{ xs:4, md:6 } }}>
          <Typography variant="h6" sx={{ fontWeight:800, mb:1 }}>Product Review</Typography>
          <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:1 }}>
            <Rating value={rating} onChange={(_,v)=>setRating(v)} />
            <Typography sx={{ color:"text.secondary" }}>{rating}.0 / 5</Typography>
          </Box>
          <Typography sx={{ color:"text.secondary", fontSize:14 }}>
            You will be redirected to our Reviews page to complete your review.
          </Typography>
        </Box>

        {/* You might also like (ถ้ามี) */}
        {Array.isArray(p.related) && p.related.length > 0 && (
          <Box sx={{ mt:{ xs:5, md:6 } }}>
            <Typography variant="h6" sx={{ fontWeight:800, mb:2 }}>
              You might also like
            </Typography>
            {/* ใส่การ์ดสินค้าที่เกี่ยวข้องตามต้องการ */}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}

