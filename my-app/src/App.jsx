// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./state/auth.jsx";
import { CartProvider } from "./state/cart.jsx";

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

function RequireAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user || user.role !== "admin") return <Navigate to="/home" replace />;
  return children;
}

export default function App() {
  return (
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

            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/product/new" element={<RequireAdmin><ProductAdmin /></RequireAdmin>} />
            <Route path="/admin/product/:id" element={<ProductAdmin />} />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
