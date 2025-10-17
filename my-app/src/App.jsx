// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./(pages)/Login/page.jsx";
import RegisterPage from "./(pages)/register/page.jsx";
import ResetPasswordPage from "./(pages)/ForgetPassword/page.jsx";
import HomePage from "./(pages)/Home/page.jsx";
import ProductPage from "./(pages)/Product/page.jsx";
import SearchPage from "./(pages)/Searchpage/page.jsx";
import CartPage from "./(pages)/Cart/page.jsx";
import CheckoutPage from "./(pages)/Checkout/page.jsx";
import PurchasesPage from "./(pages)/Purchases/page.jsx";

import AdminPage from "./(pages)/Admin_Page/index.jsx";        // ✅ ใช้ชื่อโฟลเดอร์ที่คุณบอก
import ProductAdmin from "./(pages)/Admin_Page/ProductAdmin.jsx";

import { CartProvider } from "./state/cart.jsx";
import { AuthProvider } from "./state/auth.jsx";
import RequireAdmin from "./routes/RequireAdmin";              // สมมติว่าคุณมี component นี้แล้ว

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgetpassword" element={<ResetPasswordPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />

            {/* Admin (Protected) */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminPage />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/product/new"
              element={
                <RequireAdmin>
                  <ProductAdmin mode="create" />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/product/:id"
              element={
                <RequireAdmin>
                  <ProductAdmin mode="edit" />
                </RequireAdmin>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
