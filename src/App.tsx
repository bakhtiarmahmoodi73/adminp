// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginCard from "./pages/LoginCard";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ChangePasswordPage from "./pages/ChangePassword";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      {/* Layout برای همه‌ی صفحات */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />

        {/* Auth Pages */}
        <Route path="/auth/login" element={<LoginCard />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/change-password" element={<ChangePasswordPage />} />

        {/* Other Pages */}
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/blog" element={<div>Blog Page</div>} />
        <Route path="/faq" element={<div>FAQ Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
