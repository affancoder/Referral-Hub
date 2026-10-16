
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./components/AdminLayout";

function PagePlaceholder({ title }) {
  return (
    <section className="page-placeholder">
      <h1>{title}</h1>
      <p>This page will be implemented from the Referral Hub reference.</p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/submit-referral"
            element={<PagePlaceholder title="Submit Referral" />}
          />
          <Route
            path="/my-referrals"
            element={<PagePlaceholder title="My Referrals" />}
          />
          <Route
            path="/referral-details/:id"
            element={<PagePlaceholder title="Referral Details" />}
          />
          <Route
            path="/rewards"
            element={<PagePlaceholder title="Rewards" />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
