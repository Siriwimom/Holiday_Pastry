import React from "react";
import {
  Box, Container, Typography, IconButton, Avatar, Grid, Paper
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";

const Stat = ({ icon, label }) => (
  <Box sx={{ textAlign: "center", px: 2 }}>
    {icon}
    <Typography sx={{ mt: 1, fontSize: 13, color: "text.secondary" }}>{label}</Typography>
  </Box>
);

export default function PurchasesPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fffde7", display: "flex", flexDirection: "column" }}>
      <Topbar />
      <SearchBar />

      <Container maxWidth="lg" sx={{ py: 2, flex: 1 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Header gradient */}
        <Box
          sx={{
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            background: "linear-gradient(180deg,#ffd54f 0%, #ffa000 100%)",
            color: "#000",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ position: "relative", width: 96, height: 96 }}>
              <Avatar
                sx={{ width: 96, height: 96 }}
                src="" alt="profile"
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -2, right: -2,
                  width: 28, height: 28,
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,.2)"
                }}
                title="Change photo"
              >
                <PhotoCameraOutlinedIcon sx={{ fontSize: 18, color: "#444" }} />
              </Box>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              SIRIWIMON SANGTHONG
            </Typography>
          </Box>

          {/* My Purchases */}
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              borderRadius: 3,
              bgcolor: "#f3f8cf",
              p: { xs: 2, md: 3 },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              My Purchases
            </Typography>

            <Grid container spacing={2} sx={{ textAlign: "center" }}>
              <Grid item xs={6} md={3}>
                <Stat icon={<PaymentsOutlinedIcon />} label="Amount to be Paid" />
              </Grid>
              <Grid item xs={6} md={3}>
                <Stat icon={<Inventory2OutlinedIcon />} label="Pending Delivery" />
              </Grid>
              <Grid item xs={6} md={3}>
                <Stat icon={<LocalShippingOutlinedIcon />} label="To be received" />
              </Grid>
              <Grid item xs={6} md={3}>
                <Stat icon={<StarBorderOutlinedIcon />} label="Give a rating" />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
