// src/(pages)/Admin_Page/ProductAdmin.jsx
import React, { useState } from "react";
import {
  Box, Button, TextField, Typography, MenuItem, Stack, Divider
} from "@mui/material";
import { createProduct } from "../../api/products";

export default function ProductAdmin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "BS",
    description: "",
  });

  // ไฟล์รูป
  const [imageMain, setImageMain] = useState(null);       // File | null
  const [imageSide, setImageSide] = useState([]);         // File[] (อาเรย์เสมอ)

  // preview URLs (ไม่จำเป็นแต่ช่วยเช็คก่อนส่ง)
  const [previewMain, setPreviewMain] = useState("");
  const [previewSides, setPreviewSides] = useState([]);   // string[]

  const onPickMain = (e) => {
    const f = e.target.files?.[0] || null;
    setImageMain(f);
    setPreviewMain(f ? URL.createObjectURL(f) : "");
  };

  const onPickSides = (e) => {
    const files = Array.from(e.target.files || []);
    setImageSide(files);
    setPreviewSides(files.map((f) => URL.createObjectURL(f)));
  };

  const resetForm = () => {
    setForm({ name: "", price: "", category: "BS", description: "" });
    setImageMain(null);
    setImageSide([]);            // สำคัญ: กลับเป็นอาเรย์ว่าง
    setPreviewMain("");
    setPreviewSides([]);
  };

  const submit = async () => {
    try {
      // ป้องกันค่าที่ไม่ถูกชนิด
      const payload = {
        name: form.name || "",
        price: form.price === "" ? "" : Number(form.price),
        category: form.category || "BS",
        description: form.description || "",
        imageMain: imageMain || null,
        imageSide: Array.isArray(imageSide) ? imageSide : [], // กัน undefined
      };

      await createProduct(payload);
      alert("Created!");
      resetForm();
    } catch (e) {
      console.error("createProduct error:", e);
      alert(e?.response?.data?.message || e.message || "Create failed");
    }
  };

  // number of side images (กัน undefined เสมอ)
  const sideCount = Array.isArray(imageSide) ? imageSide.length : 0;

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" fontWeight={800} mb={2}>
        Admin • เพิ่ม/แก้สินค้า
      </Typography>

      <Stack spacing={2} divider={<Divider flexItem />}>

        {/* ฟิลด์ข้อมูลทั่วไป */}
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          <TextField
            label="ชื่อสินค้า"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            fullWidth
          />
          <TextField
            label="ราคา"
            type="number"
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
            fullWidth
          />
          <TextField
            select
            label="หมวดหมู่"
            value={form.category}
            onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            fullWidth
          >
            <MenuItem value="BS">BS — Best Seller</MenuItem>
            <MenuItem value="CF">CF — Customer Favorite</MenuItem>
            <MenuItem value="LO">LO — Limited Offer</MenuItem>
          </TextField>
          <TextField
            label="รายละเอียด"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            fullWidth
            multiline
            minRows={3}
          />
        </Box>

        {/* อัปโหลดรูป */}
        <Box>
          <Typography fontWeight={700} mb={1}>รูปหลัก (1 รูป)</Typography>
          <input type="file" accept="image/*" onChange={onPickMain} />
          {previewMain && (
            <Box sx={{ mt: 1 }}>
              <img
                src={previewMain}
                alt="main preview"
                style={{ width: 160, height: 160, objectFit: "cover", borderRadius: 12 }}
              />
            </Box>
          )}
        </Box>

        <Box>
          <Typography fontWeight={700} mb={1}>
            รูป Side View (หลายรูป) {sideCount ? `• ${sideCount} รูป` : ""}
          </Typography>
          <input type="file" accept="image/*" multiple onChange={onPickSides} />
          {/* กันพัง: ใช้ Array.isArray ก่อน map */}
          {Array.isArray(previewSides) && previewSides.length > 0 && (
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 1 }}>
              {previewSides.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`side-${idx}`}
                  style={{ width: 110, height: 110, objectFit: "cover", borderRadius: 10 }}
                />
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button variant="contained" onClick={submit} sx={{ bgcolor: "#ffa000", "&:hover": { bgcolor: "#ffb300" } }}>
            บันทึกสินค้า
          </Button>
          <Button variant="outlined" onClick={resetForm}>ล้างฟอร์ม</Button>
        </Box>
      </Stack>
    </Box>
  );
}
