// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./state/auth.jsx";
import { CartProvider } from "./state/cart.jsx";
import { setAuthHeaders } from "./lib/api";

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
import UserProfilePage from "./(pages)/Userprofile/page.jsx";

// ✅ Guard: admin only
function RequireAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("auth:user") || "null");
  if (!user || user.role !== "admin") return <Navigate to="/home" replace />;
  return children;
}

// ✅ Guard: must be logged in
function RequireAuth({ children }) {
  const token = localStorage.getItem("auth:token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("auth:user") || "null");
      const t = localStorage.getItem("auth:token") || "";
      if (u?._id || t) setAuthHeaders({ token: t, userId: u?._id });
    } catch {}
  }, []);

  // ✅ ใช้ค่า BASE_URL จาก Vite เพื่อลดโอกาสพิมพ์ผิด (ควรได้ '/Holiday_Pastry/')
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, ""); // => '/Holiday_Pastry'

  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          {/* ⬇️ มี BrowserRouter เดียว และอยู่นอก <Routes> */}
          <BrowserRouter basename={base}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgetpassword" element={<ResetPasswordPage />} />

              {/* User */}
              <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
              <Route path="/product/:id" element={<RequireAuth><ProductPage /></RequireAuth>} />
              <Route path="/search" element={<RequireAuth><SearchPage /></RequireAuth>} />
              <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
              <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
              <Route path="/purchases" element={<RequireAuth><PurchasesPage /></RequireAuth>} />
              <Route path="/user" element={<RequireAuth><UserProfilePage /></RequireAuth>} />

              {/* Admin */}
              <Route path="/admin" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
              <Route path="/admin/product/new" element={<RequireAdmin><ProductAdmin /></RequireAdmin>} />
              <Route path="/admin/product/:id" element={<RequireAdmin><ProductAdmin /></RequireAdmin>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
