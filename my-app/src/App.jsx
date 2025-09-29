import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./(pages)/Login/page.jsx";
import RegisterPage from "./(pages)/register/page.jsx";
import ResetPasswordPage from "./(pages)/ForgetPassword/page.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ForgetPassword" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
