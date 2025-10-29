import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Grid,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Slide,
  Container,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";

const DEFAULT_PROFILE_IMAGE = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";
const DEFAULT_BANK_IMAGE = "https://cdn-icons-png.flaticon.com/512/166/166527.png";

function SuccessAlert({ open, onClose }) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={Slide}
      autoHideDuration={2000}
    >
      <Alert severity="success" sx={{ width: 300, fontSize: 18 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            Success
          </Typography>
          <Typography sx={{ fontSize: 14, mb: 1 }}>
            Well done, you save your address now
          </Typography>
          <Button
            sx={{ mt: 0.5, fontWeight: 700 }}
            variant="contained"
            color="success"
            onClick={onClose}
          >
            OK
          </Button>
        </Box>
      </Alert>
    </Snackbar>
  );
}

export default function UserPages() {
  const [page, setPage] = useState("account");
  const [successOpen, setSuccessOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [bankImage, setBankImage] = useState(DEFAULT_BANK_IMAGE);
  const profileInputRef = useRef();
  const bankInputRef = useRef();

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleBankImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBankImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const [userData, setUserData] = useState({
    username: "Jennie Lee",
    email: "SE@gmail.com",
    phone: "0123456789",
    bankFirst: "Jennie",
    bankLast: "Lee",
    bankNumber: "1234567890",
    bankType: "SCB",
    address: "",
    name: "",
    province: "",
    street: "",
  });

  function handleChange(field, value) {
    setUserData({ ...userData, [field]: value });
  }

  const handleSave = (targetPage) => {
    setSuccessOpen(true);
    setTimeout(() => setPage(targetPage || "account"), 2000);
  };

  function renderBackBtn() {
    return (
      <IconButton
        onClick={() => setPage("account")}
        sx={{
          position: "absolute",
          top: 32,
          left: 24,
          color: "#333"
        }}
        aria-label="back"
        size="large"
      >
        <ArrowBackIosNewIcon fontSize="medium" />
      </IconButton>
    );
  }

  function AccountPage() {
    return (
      <Card sx={mainCardStyle}>
        <Typography variant="h6" sx={cardTitleStyle}>
          HOLIDAY PASTRY
        </Typography>
        <Box sx={profileBoxStyle}>
          <Avatar src={profileImage} sx={avatarStyle} />
          <IconButton
            sx={cameraIconStyle}
            onClick={() => profileInputRef.current.click()}
            aria-label="upload"
          >
            <CameraAltIcon />
            <input
              type="file"
              accept="image/*"
              ref={profileInputRef}
              onChange={handleProfileImageUpload}
              style={{ display: "none" }}
            />
          </IconButton>
          <Typography sx={{ fontSize: 12, mb: 2 }}>Edit Profile</Typography>
        </Box>
        <CardContent>
          <Typography> User name</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.username}
            onChange={e => handleChange("username", e.target.value)}
          />
          <Typography>Email</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.email}
            onChange={e => handleChange("email", e.target.value)}
          />
          <Typography>Phone</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.phone}
            onChange={e => handleChange("phone", e.target.value)}
          />
          <Typography>Address</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.address}
            onChange={e => handleChange("address", e.target.value)}
            placeholder="Province, District, Subdistrict, House number, Street"
          />
          <Typography>Bank Information</Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField
                size="small"
                sx={fieldStyle}
                value={userData.bankFirst}
                onChange={e => handleChange("bankFirst", e.target.value)}
                placeholder="First Name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                sx={fieldStyle}
                value={userData.bankLast}
                onChange={e => handleChange("bankLast", e.target.value)}
                placeholder="Last Name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                sx={fieldStyle}
                value={userData.bankType}
                onChange={e => handleChange("bankType", e.target.value)}
                placeholder="Bank"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button onClick={() => setPage("password")} color="primary" variant="contained" sx={btnStyle}>
              Change Password
            </Button>
            <Button onClick={() => setPage("setting")} color="warning" variant="contained" sx={btnStyle}>
              Edit
            </Button>
            <Button onClick={() => setPage("location")} color="success" variant="contained" sx={btnStyle}>
              Address
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  function LocationPage() {
    return (
      <Card sx={mainCardStyle}>
        {renderBackBtn()}
        <Typography variant="h6" sx={cardTitleStyle}>
          HOLIDAY PASTRY
        </Typography>
        <Box sx={profileBoxStyle}>
          <Avatar src={profileImage} sx={avatarStyle} />
          <IconButton
            sx={cameraIconStyle}
            onClick={() => profileInputRef.current.click()}
            aria-label="upload"
          >
            <CameraAltIcon />
          </IconButton>
          <Typography sx={{ fontSize: 12, mb: 2 }}>Edit Profile</Typography>
        </Box>
        <CardContent>
          <Typography>Name–Surname</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.name}
            onChange={e => handleChange("name", e.target.value)}
          />
          <Typography>Province/District/Subdistrict</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.province}
            onChange={e => handleChange("province", e.target.value)}
            placeholder="Province, District, Subdistrict"
          />
          <Typography>House number/Street</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.street}
            onChange={e => handleChange("street", e.target.value)}
            placeholder="House number, Street"
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 3, width: "100%" }}
            onClick={() => handleSave("account")}
          >
            Save
          </Button>
        </CardContent>
      </Card>
    );
  }

  function SettingPage() {
    return (
      <Card sx={mainCardStyle}>
        {renderBackBtn()}
        <Typography variant="h6" sx={cardTitleStyle}>
          HOLIDAY PASTRY
        </Typography>
        <Box sx={profileBoxStyle}>
          <Avatar src={profileImage} sx={avatarStyle} />
          <IconButton
            sx={cameraIconStyle}
            onClick={() => profileInputRef.current.click()}
            aria-label="upload"
          >
            <CameraAltIcon />
          </IconButton>
          <Typography sx={{ fontSize: 12, mb: 2 }}>Edit Profile</Typography>
        </Box>
        <CardContent>
          <Typography>User name</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.username}
            onChange={e => handleChange("username", e.target.value)}
          />
          <Typography>Phone</Typography>
          <TextField
            size="small"
            fullWidth
            sx={fieldStyle}
            value={userData.phone}
            onChange={e => handleChange("phone", e.target.value)}
          />
          <Typography>Bank Information</Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField
                size="small"
                sx={fieldStyle}
                value={userData.bankFirst}
                onChange={e => handleChange("bankFirst", e.target.value)}
                placeholder="First Name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                sx={fieldStyle}
                value={userData.bankLast}
                onChange={e => handleChange("bankLast", e.target.value)}
                placeholder="Last Name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                sx={fieldStyle}
                value={userData.bankNumber}
                onChange={e => handleChange("bankNumber", e.target.value)}
                placeholder="Account Number"
              />
            </Grid>
          </Grid>
          <Typography sx={{ mt: 1 }}>Upload Bank Account Image</Typography>
          <Box sx={{ position: "relative", mb: 2, mt: 1 }}>
            <img
              src={bankImage}
              alt="bank slip"
              style={{
                width: 120,
                height: 68,
                borderRadius: 6,
                border: "1.5px solid #ddd",
                background: "#fff"
              }}
              onClick={() => bankInputRef.current.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={bankInputRef}
              style={{ display: "none" }}
              onChange={handleBankImageUpload}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              color="primary"
              variant="contained"
              sx={btnStyle}
              onClick={() => handleSave("account")}
            >
              Save
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={btnStyle}
              onClick={() => setPage("account")}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  function PasswordPage() {
    return (
      <Card sx={mainCardStyle}>
        {renderBackBtn()}
        <Typography variant="h6" sx={cardTitleStyle}>
          CHANGE PASSWORD
        </Typography>
        <CardContent>
          <Typography>Current Password</Typography>
          <TextField size="small" sx={fieldStyle} fullWidth type="password" />
          <Typography>New Password</Typography>
          <TextField size="small" sx={fieldStyle} fullWidth type="password" />
          <Typography>Confirm New Password</Typography>
          <TextField size="small" sx={fieldStyle} fullWidth type="password" />
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button color="primary" variant="contained" sx={btnStyle} onClick={() => handleSave("account")}>
              Save Changes
            </Button>
            <Button color="error" variant="contained" sx={btnStyle} onClick={() => setPage("account")}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fffde7", display: "flex", flexDirection: "column" }}>
      <Topbar />
      <SearchBar />
      <Container maxWidth="sm" sx={{ py: 5, flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {page === "account" && <AccountPage />}
        {page === "location" && <LocationPage />}
        {page === "setting" && <SettingPage />}
        {page === "password" && <PasswordPage />}
        <SuccessAlert open={successOpen} onClose={() => setSuccessOpen(false)} />
      </Container>
      <Footer />
    </Box>
  );
}

// STYLES
const mainCardStyle = {
  bgcolor: "linear-gradient(180deg, #ffe366 0%, #ffd115 60%, #ffb114 100%)",
  borderRadius: 4,
  minWidth: 370,
  maxWidth: 400,
  py: 1.5,
  px: 2.5,
  boxShadow: 6,
  position: "relative",
};

const cardTitleStyle = {
  fontWeight: 700,
  color: "#fff",
  textShadow: "0 2px 5px #e7a708",
  pt: 2,
  pb: 1,
  textAlign: "center",
};

const avatarStyle = {
  width: 72,
  height: 72,
  bgcolor: "#fafafa",
  border: "3px solid #fffde7",
  mt: 2,
};

const cameraIconStyle = {
  position: "absolute",
  bottom: 24,
  right: 45,
  bgcolor: "#fff",
  border: "1.5px solid #ddd",
  ":hover": { bgcolor: "#fafafa" },
  zIndex: 2,
  p: 0.5,
};

const profileBoxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  mb: 1.5,
};

const fieldStyle = { mb: 1, bgcolor: "#fff" };

const btnStyle = { fontWeight: 700, flex: 1 };
