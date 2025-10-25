import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import { useCart } from "../../state/cart.jsx";
import { useNavigate } from "react-router-dom";

const qrcode = "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>\
<rect width='100%' height='100%' fill='white'/>\
<rect x='40' y='40' width='80' height='80' fill='black'/>\
<rect x='280' y='40' width='80' height='80' fill='black'/>\
<rect x='40' y='280' width='80' height='80' fill='black'/>\
<rect x='120' y='120' width='160' height='160' fill='black' opacity='0.1'/>\
</svg>";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const { clear } = useCart();
  // นับถอยหลัง 15:00
  const [sec, setSec] = useState(15 * 60);
  useEffect(() => {
    const t = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const mmss = useMemo(() => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m} : ${s}`;
  }, [sec]);

  const shipping = 0;
  const grand = total + shipping;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fffde7", display: "flex", flexDirection: "column" }}>
      <Topbar />
      <SearchBar />

      <Container maxWidth="lg" sx={{ py: 3, flex: 1, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 380px" }, gap: 3 }}>
        {/* ซ้าย: QR + ปุ่ม */}
        <Box sx={{ bgcolor: "#fff176", borderRadius: 4, p: 3 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Checkout
          </Typography>

          <Typography fontWeight={700} align="right" sx={{ mb: 1 }}>
            {mmss}
          </Typography>

          <Box
            sx={{
              mx: "auto",
              width: { xs: 280, md: 360 },
              height: { xs: 280, md: 360 },
              borderRadius: 3,
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 0 10px rgba(0,0,0,.06)",
            }}
          >
            <img src={qrcode} alt="QR" style={{ width: "75%", height: "75%", objectFit: "contain" }} />
          </Box>

          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                background: "#ffa000",
                color: "#fff",
                border: 0,
                borderRadius: 12,
                padding: "10px 22px",
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => { clear(); navigate("/purchases"); }}
            >
              PAYMENT COMPLETED
            </button>
          </Box>
        </Box>

        {/* ขวา: สรุปตะกร้า */}
        <Box sx={{ bgcolor: "#ffb74d", borderRadius: 2.5, p: 2.5, color: "#fff" }}>
          <Typography variant="h5" fontWeight={800} mb={2}>
            Shopping Bag
          </Typography>

          {items.map((it) => (
            <Box key={it.key} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
              <img
                src={it.img || "/placeholder.png"}
                alt={it.name}
                style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover" }}
                onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />

              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={700}>{it.name}</Typography>
                <Typography sx={{ fontSize: 12 }}>
                  {it.meta?.base} • {it.meta?.size}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>{it.price.toLocaleString()} ฿</Typography>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,.5)" }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", rowGap: 0.5 }}>
            <Typography>Subtotal</Typography>
            <Typography>{total.toLocaleString()} ฿</Typography>

            <Typography>Shipping</Typography>
            <Typography>{shipping === 0 ? "Free" : `${shipping.toLocaleString()} ฿`}</Typography>

            <Divider sx={{ gridColumn: "1 / -1", my: 1, borderColor: "rgba(255,255,255,.5)" }} />

            <Typography fontWeight={800}>Total</Typography>
            <Typography fontWeight={800}>{grand.toLocaleString()} ฿</Typography>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
