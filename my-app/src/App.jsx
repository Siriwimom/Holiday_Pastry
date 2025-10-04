import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./(pages)/Login/page.jsx";
import RegisterPage from "./(pages)/register/page.jsx";
import ResetPasswordPage from "./(pages)/ForgetPassword/page.jsx";
import HomePage from "./(pages)/Home/page.jsx";
import ProductPage from "./(pages)/Product/page.jsx";   // ✅ ใหม่

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget_password/main" element={<ResetPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:key" element={<ProductPage />} />  {/* ✅ เส้นทางใหม่ */}
      </Routes>
    </BrowserRouter>
  );
}
