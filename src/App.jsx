import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitReferral from "./pages/SubmitReferral";
import MyReferrals from "./pages/MyReferrals";
import ReferralDetails from "./pages/ReferralDetail";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page — separate from the shared layout */}
        <Route path="/" element={<Login />} />

        {/* Shared sidebar and header */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/submit-referral" element={<SubmitReferral />} />

          <Route path="/my-referrals" element={<MyReferrals />} />

          <Route path="/referral-details/:id" element={<ReferralDetails />} />

          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
