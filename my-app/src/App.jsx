// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "@mui/material";

import LoginPage from "./(pages)/Login/page.jsx";
import RegisterPage from "./(pages)/register/page.jsx";
import ResetPasswordPage from "./(pages)/ForgetPassword/page.jsx";
import HomePage from "./(pages)/Home/page.jsx";
import ProductPage from "./(pages)/Product/page.jsx";
import SearchPage from "./(pages)/Searchpage/page.jsx";
import CartPage from "./(pages)/Cart/page.jsx";
import CheckoutPage from "./(pages)/Checkout/page.jsx";
import PurchasesPage from "./(pages)/Purchases/page.jsx";
import { CartProvider } from "./state/cart.jsx"; // ✅ นำเข้าให้ถูก path/นามสกุล
export default function App() {
  return (
    <>

      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ForgetPassword" element={<ResetPasswordPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/:key" element={<ProductPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchases" element={<PurchasesPage />} /> 
            
        
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}
