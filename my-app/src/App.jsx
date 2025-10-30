// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./state/auth.jsx";
import { CartProvider } from "./state/cart.jsx";
import { setAuthHeaders } from "./lib/api"; // ✅ boot headers

import LoginPage from "./(pages)/Login/page.jsx";
import RegisterPage from "./(pages)/register/page.jsx";
import ResetPasswordPage from "./(pages)/ForgetPassword/page.jsx";
import HomePage from "./(pages)/Home/page.jsx";
import ProductPage from "./(pages)/Product/page.jsx";
import SearchPage from "./(pages)/Searchpage/page.jsx";
import CartPage from "./(pages)/Cart/page.jsx";
import CheckoutPage from "./(pages)/Checkout/page.jsx";
import PurchasesPage from "./(pages)/Purchases/page.jsx";
import AdminPage from "./(pages)/Admin_Page/page.jsx";
import ProductAdmin from "./(pages)/Admin_Page/ProductAdmin.jsx";
// เพิ่มตรงนี้
import UserProfilePage from "./(pages)/Userprofile/page.jsx";

function RequireAdmin({ children }) {
  // ✅ อ่านจาก auth:user (ให้ตรงกับตอนบันทึก)
  const user = JSON.parse(localStorage.getItem("auth:user") || "null");
  if (!user || user.role !== "admin") return <Navigate to="/home" replace />;
  return children;
}

export default function App() {
  // ✅ boot ครั้งเดียว เมื่อเปิดเว็บ/รีเฟรช
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("auth:user") || "null");
      const t = localStorage.getItem("auth:token") || "";
      if (u?._id || t) setAuthHeaders({ token: t, userId: u?._id });
    } catch {}
  }, []);

  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgetpassword" element={<ResetPasswordPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/purchases" element={<PurchasesPage />} />

              <Route path="/admin" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
              <Route path="/admin/product/new" element={<RequireAdmin><ProductAdmin /></RequireAdmin>} />
              <Route path="/admin/product/:id" element={<RequireAdmin><ProductAdmin /></RequireAdmin>} />

              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
