import{
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./components/AdminLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitReferral from "./pages/SubmitReferral";
import MyReferrals from "./pages/MyReferrals";

function PagePlaceholder({ title }) {
  return (
    <section className="page-placeholder">
      <h1>{title}</h1>
      <p>
        This page will be implemented from the Referral Hub reference.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page — separate from the shared layout */}
        <Route path="/" element={<Login />} />

        {/* Shared sidebar and header */}
        <Route element={<AdminLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/submit-referral"
            element={<SubmitReferral />}
          />

          <Route path="/my-referrals" element={<MyReferrals />} />

          <Route
            path="/referral-details/:id"
            element={<PagePlaceholder title="Referral Details" />}
          />

          <Route
            path="/rewards"
            element={<PagePlaceholder title="Rewards" />}
          />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
