import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import { useCart } from "../../state/cart.jsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { items, inc, dec, remove, total } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#fffde7" }}>
      <Topbar />
      <SearchBar />

      {/* เนื้อหา + กันชนด้านล่างเผื่อแถบสรุป */}
      <Box sx={{ flex: 1, p: 4, pb: 12 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Shopping Bag
        </Typography>

        {items.length === 0 ? (
          <Typography color="text.secondary">Your bag is empty.</Typography>
        ) : (
          items.map((it) => (
            <Box
              key={it.key}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                p: 2,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src={it.img}
                  alt={it.name}
                  style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover" }}
                />
                <Box>
                  <Typography fontWeight={600}>{it.name}</Typography>
                  <Typography color="text.secondary">
                    {it.meta?.base} • {it.meta?.size}
                  </Typography>
                  <Typography color="text.secondary">{it.price.toLocaleString()} ฿</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button onClick={() => dec(it.key)}>-</Button>
                <Typography>{it.qty}</Typography>
                <Button onClick={() => inc(it.key)}>+</Button>
              </Box>

              <Button color="error" onClick={() => remove(it.key)}>
                Remove
              </Button>
            </Box>
          ))
        )}
      </Box>

      {/* 🔶 แถบสรุปแบบ STICKY (ไม่ทับ Footer) */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 1000,
          background: "#fffde7",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 -4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Total: <span style={{ color: "#ffa000" }}>{total.toLocaleString()} ฿</span>
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/checkout")}
          sx={{
            bgcolor: "#ffa000",
            "&:hover": { bgcolor: "#ffb300" },
            px: 4,
            py: 1,
            fontWeight: 700,
            borderRadius: 2,
          }}
        >
          PAYMENT
        </Button>
      </Box>

      <Footer />
    </Box>
  );
};

export default CartPage;
