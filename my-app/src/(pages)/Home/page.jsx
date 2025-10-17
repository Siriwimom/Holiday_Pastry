// src/(pages)/Home/page.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Link,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Masonry } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/Topbar";
import { listProducts } from "../../api/products";

/* ---------- Card ที่ใช้ข้อมูลจาก DB ---------- */
function ImgCardDB({ imgUrl, title, price, onClick, ratio = 1.2 }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          aspectRatio: `${ratio} / 1`,
          backgroundImage: imgUrl
            ? `url(${imgUrl})`
            : "repeating-linear-gradient(45deg,#eee,#eee 10px,#ddd 10px,#ddd 20px)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform .5s ease",
          "&:hover": { transform: "scale(1.04)" },
        }}
        title={title}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
          display: "flex",
          alignItems: "flex-end",
          p: 1.5,
        }}
      >
        {(title || price) && (
          <Box sx={{ color: "#fff" }}>
            {title && (
              <Typography sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                {title}
              </Typography>
            )}
            {price && (
              <Typography sx={{ opacity: 0.9, fontSize: 13 }}>{price}</Typography>
            )}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: 2,
          boxShadow: "0 10px 24px rgba(0,0,0,.22)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

/* ---------- Section wrapper ---------- */
const Section = ({ id, title, children, bg = "transparent", py = { xs: 8, md: 12 } }) => (
  <Box id={id} sx={{ background: bg }}>
    <Container maxWidth="lg" sx={{ py }}>
      {title && (
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          {title}
        </Typography>
      )}
      {children}
    </Container>
  </Box>
);

export default function HomePage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await listProducts(); // [{ _id, name, price, category, imageMain, ...}]
        if (!alive) return;
        setAll(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("listProducts error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const bs = useMemo(() => all.filter((p) => p.category === "BS"), [all]);
  const cf = useMemo(() => all.filter((p) => p.category === "CF"), [all]);
  const lo = useMemo(() => all.filter((p) => p.category === "LO"), [all]);

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", bgcolor: "#fff" }}>
      {/* Topbar */}
      <Topbar />

      {/* Searchbar + icons */}
      <Box
        sx={{
          background: "linear-gradient(180deg,#ffb300 0%, #ffa000 100%)",
          borderBottom: "1px solid rgba(0,0,0,.08)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ py: 1.5, display: "flex", alignItems: "center", gap: 3 }}
        >
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const q = e.currentTarget.value.trim();
                if (q) nav(`/search?q=${encodeURIComponent(q)}`);
              }
            }}
          />
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
              onClick={() => nav("/account")}
            >
              <PersonOutlineIcon fontSize="small" />
              <Typography variant="body2">Account</Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
              onClick={() => nav("/cart")}
            >
              <ShoppingBagOutlinedIcon fontSize="small" />
              <Typography>Shopping bag</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(180deg,#ffa726 0%, #ef6c00 100%)",
          color: "#fff",
          py: { xs: 12, md: 18 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Typography
            sx={{
              color: "#ffa000",
              fontSize: { xs: 52, md: 120 },
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: { xs: 2, md: 6 },
              textTransform: "uppercase",
              textAlign: "center",
              textShadow: "0 8px 28px rgba(0,0,0,.4)",
            }}
          >
            Holiday<br />Pastry
          </Typography>
        </Container>
      </Box>

      {/* Loading */}
      {loading && (
        <Container maxWidth="lg" sx={{ py: 6, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Container>
      )}

      {/* Best Seller */}
      {!loading && (
        <Section id="best-seller" title="Best seller" bg="#ffa000">
          {bs.length === 0 ? (
            <Typography color="text.secondary">No Best Seller items.</Typography>
          ) : (
            <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
              {bs.map((p, i) => (
                <div key={p._id}>
                  <ImgCardDB
                    imgUrl={p.imageMain}
                    title={p.name}
                    price={`${Number(p.price).toLocaleString()} ฿`}
                    ratio={[1.2, 1, 1.4, 0.9][i % 4]}
                    onClick={() => nav(`/product/${p._id}`)} 
                  />
                </div>
              ))}
            </Masonry>
          )}
        </Section>
      )}

      {/* Customer Favorite */}
      {!loading && (
        <Section id="customer-fav" title="Customer Favorite" bg="#fff59d">
          <Box
            sx={{
              display: "grid",
              gap: "3rem",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(12, 1fr)" },
              alignItems: "stretch",
            }}
          >
            {cf.map((p, i) => {
              const gridColumn = {
                xs: "span 2",
                md: i === 0 ? "span 6" : i === cf.length - 1 ? "span 12" : "span 3",
              };
              const ratio = i === cf.length - 1 ? 3 : 1.2;
              return (
                <Box key={p._id} sx={{ gridColumn }}>
                  <ImgCardDB
                    imgUrl={p.imageMain}
                    title={p.name}
                    price={`${Number(p.price).toLocaleString()} ฿`}
                    ratio={ratio}
                    onClick={() => nav(`/product/${p._id}`)}
                  />
                </Box>
              );
            })}
          </Box>
        </Section>
      )}

      {/* Limited-time offer */}
      {!loading && (
        <Section id="limited-offer" title="Limited-time offer!" bg="linear-gradient(180deg,#ffa726 0%, #fb8c00 100%)">
          <Box
            sx={{
              display: "grid",
              gap: "3rem",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(12, 1fr)" },
              alignItems: "stretch",
            }}
          >
            {lo.map((p, i) => {
              const gridColumn = { xs: i === 2 ? "span 2" : "span 1", md: "span 4" };
              const ratio = i === 2 ? 2 : 1.2;
              return (
                <Box key={p._id} sx={{ gridColumn }}>
                  <ImgCardDB
                    imgUrl={p.imageMain}
                    title={p.name}
                    price={`${Number(p.price).toLocaleString()} ฿`}
                    ratio={ratio}
                    onClick={() => nav(`/product/${p._id}`)} 
                  />
                </Box>
              );
            })}
          </Box>
        </Section>
      )}

      {/* Footer */}
      <Box
        sx={{
          background: "linear-gradient(180deg,#ffe57f 0%, #ffa000 100%)",
          color: "#222",
          py: { xs: 6, md: 8 },
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gap: "3rem",
              gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            }}
          >
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                About Us
              </Typography>
              <Typography sx={{ maxWidth: 520 }}>
                Receive our newsletter and discover our stories, collections, and surprises.
              </Typography>
            </Box>
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
              <Typography sx={{ fontWeight: 800, mb: 2 }}>Support</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link underline="hover" href="#">ORDER TRACKING</Link>
                <Link underline="hover" href="#">PRIVACY POLICY</Link>
                <Link underline="hover" href="#">FAQ</Link>
                <Link underline="hover" href="#">CONTACT US</Link>
              </Box>
            </Box>
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 3" } }}>
              <Typography sx={{ fontWeight: 800, mb: 2 }}>Follow</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Link underline="hover" href="#">G</Link>
                <Link underline="hover" href="#">F</Link>
                <Link underline="hover" href="#">IG</Link>
                <Link underline="hover" href="#">TW</Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
