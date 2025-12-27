import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ExchangeLayout from "./components/ExchangeLayout";
import LoginCard from "./pages/LoginCard";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ChangePasswordPage from "./pages/ChangePassword";
import HomePage from "./pages/HomePage";
import ConfirmPageWithEmail from "./pages/ConfirmPageWithEmail";
import FlowSendPage from "./pages/FlowSendPage";
import FlowReceivePage from "./pages/FlowReceivePage";
import SendSuccessPage from "./pages/SendSuccessPage";
import SendFailedPage from "./pages/SendFailedPage";
import WaitingPage from "./pages/WaitingPage";
import PmFailedPage from "./pages/PmFailedPage";
import PmSuccessPage from "./pages/PmSuccessPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import PartnerPage from "./pages/PartnerPage";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth/login" element={<LoginCard />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/change-password" element={<ChangePasswordPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog" element={<div>Blog Page</div>} />
        <Route path="/faq" element={<Faq />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} /> 
        <Route path="partner" element={<PartnerPage />} /> 
      </Route>
      </Route>

    

      <Route element={<ExchangeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/confirm" element={<ConfirmPageWithEmail />} />
        <Route path="/flow/send" element={<FlowSendPage />} />
        <Route path="/success" element={<SendSuccessPage />} />
        <Route path="/failed" element={<SendFailedPage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/pmsuccess" element={<PmSuccessPage />} />
        <Route path="/pmfailed" element={<PmFailedPage />} />
        <Route path="/flow/receive" element={<FlowReceivePage />} />
      </Route>
    </Routes>
  );
}

export default App;