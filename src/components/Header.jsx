
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import "../CSS/Header.css";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/submit-referral": "Submit Referral",
  "/my-referrals": "My Referrals",
  "/rewards": "Rewards",
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const title = location.pathname.startsWith("/referral-details/")
    ? "Referral Details"
    : pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="header-menu-button"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          <Menu size={23} />
        </button>

        <div className="header-page-title">{title}</div>
      </div>

      <div className="header-right">
        <label className="header-search">
          <Search size={17} />
          <input type="search" placeholder="Search..." aria-label="Search" />
        </label>

        <button
          type="button"
          className="header-icon-button"
          aria-label="Notifications"
          onClick={() => window.alert("No new notifications.")}
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <button
          type="button"
          className="header-profile"
          onClick={() => window.alert("Profile menu will be added later.")}
        >
          <span className="header-avatar">U</span>
          <span className="header-profile-name">Demo User</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}
