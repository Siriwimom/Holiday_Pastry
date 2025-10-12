import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";


export default function AdminPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "BS", imageUrl: "" });
  const loadProducts = async () => {
  const { data } = await api.get("/products");
  console.log(data);
};

  const load = async () => {
    const { data } = await api.get("/products");
    setList(data);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    await api.post("/products", form);
    setForm({ name: "", price: "", category: "BS", imageUrl: "" });
    load();
  };

  const update = async (id, patch) => {
    await api.put(`/products/${id}`, patch);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={800} mb={2}>Admin - จัดการสินค้า</Typography>

      <Box sx={{ display: "grid", gap: 2, maxWidth: 420 }}>
        <TextField label="ชื่อสินค้า" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <TextField label="ราคา" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
        <TextField select label="หมวดหมู่" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
          <MenuItem value="BS">BS - Best Seller</MenuItem>
          <MenuItem value="CF">CF - Customer Fav</MenuItem>
          <MenuItem value="LO">LO - Limited</MenuItem>
        </TextField>
        <TextField label="URL รูปภาพ" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})}/>
        <Button variant="contained" onClick={add}>เพิ่มสินค้า</Button>
      </Box>

      <Box sx={{ mt: 4, display: "grid", gap: 2 }}>
        {list.map(p => (
          <Box key={p.id} sx={{ p:2, border: "1px solid #eee", borderRadius: 2, display:"flex", gap:2, alignItems:"center" }}>
            <img src={p.imageUrl} alt="" width={80} height={80} style={{objectFit:"cover", borderRadius:8}}/>
            <Box sx={{ flex:1 }}>
              <Typography fontWeight={700}>{p.name}</Typography>
              <Typography color="text.secondary">{p.category} • {p.price} ฿</Typography>
            </Box>
            <Button onClick={()=>update(p.id, { price: Number(p.price)+10 })}>+10฿</Button>
            <Button color="error" onClick={()=>remove(p.id)}>ลบ</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

