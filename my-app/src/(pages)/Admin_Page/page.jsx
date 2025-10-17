import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Card, CardActionArea, CardMedia, CardContent, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../../api/products";

export default function AdminPage(){
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  useEffect(()=>{ listProducts().then(setItems); },[]);

  return (
    <Box sx={{ minHeight:"100vh", bgcolor:"#fffde7" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:2 }}>
          <Typography variant="h4" fontWeight={800}>จัดการสินค้า</Typography>
          <Button variant="contained" onClick={()=>nav("/admin/product/new")} sx={{ bgcolor:"#ffa000","&:hover":{bgcolor:"#ffb300"} }}>
            + เพิ่มสินค้า
          </Button>
        </Box>

        <Box sx={{
          display:"grid",
          gridTemplateColumns:{ xs:"repeat(2,1fr)", sm:"repeat(3,1fr)", md:"repeat(4,1fr)" },
          gap:2
        }}>
          <Card onClick={()=>nav("/admin/product/new")} sx={{ border:"2px dashed #bbb", height:230, display:"grid", placeItems:"center", cursor:"pointer" }}>
            <Typography fontWeight={700}>+ เพิ่มสินค้า</Typography>
          </Card>

          {items.map(p=>(
            <Card key={p._id}>
              <CardActionArea onClick={()=>nav(`/admin/product/${p._id}`)}>
                <CardMedia component="img" image={p.imageMain || ""} height="140" sx={{ objectFit:"cover" }}/>
                <CardContent>
                  <Typography fontWeight={700} noWrap>{p.name}</Typography>
                  <Box sx={{ display:"flex", justifyContent:"space-between", mt: .5 }}>
                    <Chip size="small" label={p.category}/>
                    <Typography color="text.secondary">{p.price?.toLocaleString()} ฿</Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
