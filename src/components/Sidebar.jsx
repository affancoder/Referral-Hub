import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus2,
  Files,
  Gift,
  X,
  User,
  HelpCircle
} from "lucide-react";
import logo from "../assets/images/favicon.png";
import "../CSS/Sidebar.css";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Submit Referral", path: "/submit-referral", icon: FilePlus2 },
  { label: "My Referrals", path: "/my-referrals", icon: Files },
  { label: "Rewards", path: "/rewards", icon: Gift },
  { label: "Profile", path: "/profile", icon: User },
  { label: "Help", path: "/help", icon: HelpCircle },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className={`app-sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
             <img src={logo} alt="Referral Hub logo" />
          </div>
          <span>Referral Hub</span>

          <button
            type="button"
            className="sidebar-close"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X size={21} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}
    </>
  );
}
