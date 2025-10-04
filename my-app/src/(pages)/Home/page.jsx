import React from "react";
import {
  Box, Container, Typography, TextField, InputAdornment, Link
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Masonry } from "@mui/lab";
import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";

/* ===== โหลดรูปจาก src/assets (recursive + case-insensitive) ===== */
const assetModules = import.meta.glob("../../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}", {
  eager: true,
  import: "default",
});

// ทำ key เป็นตัวใหญ่เสมอ เช่น "cf1.jpg" -> "CF1"
const IMAGES = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    const filename = path.split("/").pop();          // e.g. CF1.jpg
    const keyRaw = filename.replace(/\.[^.]+$/, ""); // CF1
    const key = keyRaw.toUpperCase();
    return [key, url];
  })
);

const BEST = ["BS1","BS2","BS3","BS4","BS5","BS6","BS7","BS8"];
const CF   = ["CF1","CF2","CF3","CF4","CF5","CF6"];
const LO   = ["LO1","LO2","LO3"];

/* ===== การ์ดรูปพร้อมเอฟเฟกต์ + placeholder เมื่อไม่เจอรูป ===== */
const ImgCard = ({ imgKey, title, price, ratio = 1 }) => {
  const navigate = useNavigate();
  const key = (imgKey || "").toUpperCase();
  const bgUrl = IMAGES[key];
  return (
    <Box
      sx={{ position: "relative", borderRadius: 2, overflow: "hidden", cursor: "pointer" }}
      onClick={() => navigate(`/product/${key}`)}   // ✅ นำทางไปหน้า Product พร้อม key
    >
      <Box
        sx={{
          aspectRatio: `${ratio} / 1`,
          backgroundImage: bgUrl
            ? `url(${bgUrl})`
            : "repeating-linear-gradient(45deg,#eee,#eee 10px,#ddd 10px,#ddd 20px)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform .5s ease",
          "&:hover": { transform: "scale(1.04)" },
        }}
        title={bgUrl ? key : `Missing: ${key}`}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
          display: "flex",
          alignItems: "flex-end",
          p: 1.5,
        }}
      >
        {(title || price) && (
          <Box sx={{ color: "#fff" }}>
            {title && <Typography sx={{ fontWeight: 700, lineHeight: 1.1 }}>{title}</Typography>}
            {price && <Typography sx={{ opacity: .9, fontSize: 13 }}>{price}</Typography>}
          </Box>
        )}
      </Box>
      <Box sx={{ position: "absolute", inset: 0, borderRadius: 2, boxShadow: "0 10px 24px rgba(0,0,0,.22)", pointerEvents: "none" }} />
    </Box>
  );
};

/* ===== Section wrapper ===== */
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

console.log("Loaded assets:", Object.keys(IMAGES));

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", bgcolor: "#fff" }}>
      {/* 1) Topbar */}
      <Topbar />

      {/* 2) Searchbar */}
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

      {/* 3) HERO – ใช้ LO1 เป็นพื้นหลังถ้ามี */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: IMAGES["LO1"] ? `url(${IMAGES["LO1"]})` : "linear-gradient(180deg,#ffa726 0%, #ef6c00 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: { xs: 12, md: 18 },
          backgroundAttachment: { md: "fixed" },
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.55) 100%)" }} />
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontSize: { xs: 52, md: 120 },
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: { xs: 2, md: 6 },
              textTransform: "uppercase",
              textAlign: "center",
              textShadow: "0 8px 28px rgba(0,0,0,.4)",
            }}
          >
            Holiday<br/>Pastry
          </Typography>
        </Container>
      </Box>

      {/* 4) Best seller – Masonry */}
      <Section id="best-seller" title="Best seller" bg="#ffa000">
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          {BEST.map((key, i) => (
            <div key={key}>
              <ImgCard
                imgKey={key}
                title={`Item ${i + 1}`}
                price={`${(i + 1) * 100} B`}
                ratio={[1.2, 1, 1.4, 0.9][i % 4]}
              />
            </div>
          ))}
        </Masonry>
      </Section>

      {/* 5) Customer Favorite – ใช้ CSS Grid (ไม่ง้อ Grid2) */}
      <Section id="customer-fav" title="Customer Favorite" bg="#fff59d" Color="#ffa000">
        <Box
          sx={{
            display: "grid",
            gap: 24 / 8 + "rem", /* เทียบ spacing=3 ของ MUI (24px) */
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(12, 1fr)" },
            alignItems: "stretch",
          }}
        >
          {CF.map((key, i) => {
            // layout: CF1 ซ้าย 6 คอลัมน์, CF2..CF5 ฝั่งขวาคนละ 3 คอลัมน์, CF6 เต็ม 12
            const gridColumn = {
              xs: "span 2",
              md:
                i === 0
                  ? "span 6"
                  : i === CF.length - 1
                  ? "span 12"
                  : "span 3",
            };
            const ratio = i === CF.length - 1 ? 3 : 1.2;
            return (
              <Box key={key} sx={{ gridColumn }}>
                <ImgCard imgKey={key} title={`CF Item ${i + 1}`} price={`${(i + 1) * 100} B`} ratio={ratio} />
              </Box>
            );
          })}
        </Box>
      </Section>

      {/* 6) Limited-time offer – ใช้ CSS Grid */}
      <Section id="limited-offer" title="Limited-time offer!" bg="linear-gradient(180deg,#ffa726 0%, #fb8c00 100%)">
        <Box
          sx={{
            display: "grid",
            gap: 24 / 8 + "rem",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(12, 1fr)" },
            alignItems: "stretch",
          }}
        >
          {LO.map((key, i) => {
            // layout: 3 คอลัมน์เท่า ๆ กันบน md (span 4), แต่ LO3 ให้สูงเป็นพิเศษ
            const gridColumn = { xs: i === 2 ? "span 2" : "span 1", md: "span 4" };
            const ratio = i === 2 ? 2 : 1.2;
            return (
              <Box key={key} sx={{ gridColumn }}>
                <ImgCard imgKey={key} title={`Limited ${i + 1}`} price={`${(i + 5) * 100} B`} ratio={ratio} />
              </Box>
            );
          })}
        </Box>
      </Section>

      {/* 7) About us / Footer */}
      <Box sx={{ background: "linear-gradient(180deg,#ffe57f 0%, #ffa000 100%)", color: "#222", py: { xs: 6, md: 8 }, mt: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gap: 24 / 8 + "rem",
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
};

export default HomePage;
