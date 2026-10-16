
import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
  Camera,
  Save,
  RotateCcw,
} from "lucide-react";
import "../CSS/Profile.css";

const initialProfile = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Corporation",
  jobTitle: "Business Development Manager",
  location: "New York, USA",
  bio: "I enjoy connecting businesses with the right solutions and building valuable professional relationships.",
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSavedProfile(profile);
    setMessage("Profile updated successfully in this demo.");
  };

  const handleReset = () => {
    setProfile(savedProfile);
    setMessage("");
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
    setMessage("");
  };

  return (
    <main className="profile-page">
      <div className="profile-page-heading">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information and account details.</p>
        </div>
      </div>

      <section className="profile-overview-card">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {avatar ? (
              <img src={avatar} alt="Profile" />
            ) : (
              `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
            )}
          </div>

          <label className="profile-avatar-upload" title="Upload profile photo">
            <Camera size={15} />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              aria-label="Upload profile photo"
            />
          </label>
        </div>

        <div className="profile-overview-details">
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          <p>{profile.jobTitle || "Add your job title"}</p>
          <span className="profile-member-badge">
            <ShieldCheck size={14} />
            Customer Account
          </span>
        </div>

        <div className="profile-account-status">
          <span className="profile-status-dot" />
          Active Account
        </div>
      </section>

      <div className="profile-content-grid">
        <section className="profile-form-card">
          <div className="profile-card-heading">
            <div className="profile-heading-icon">
              <UserRound size={19} />
            </div>
            <div>
              <h2>Personal Information</h2>
              <p>Update your name and contact information.</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="profile-form-grid">
              <div className="profile-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">Email Address</label>
                <div className="profile-input-with-icon">
                  <Mail size={16} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="phone">Phone Number</label>
                <div className="profile-input-with-icon">
                  <Phone size={16} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="company">Company Name</label>
                <div className="profile-input-with-icon">
                  <Building2 size={16} />
                  <input
                    id="company"
                    name="company"
                    value={profile.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="jobTitle">Job Title</label>
                <div className="profile-input-with-icon">
                  <BriefcaseBusiness size={16} />
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    value={profile.jobTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-field profile-field-full">
                <label htmlFor="location">Location</label>
                <div className="profile-input-with-icon">
                  <MapPin size={16} />
                  <input
                    id="location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-field profile-field-full">
                <label htmlFor="bio">About Me</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  maxLength={500}
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell us a little about yourself..."
                />
                <span className="profile-character-count">
                  {profile.bio.length}/500 characters
                </span>
              </div>
            </div>

            {message && (
              <p className="profile-feedback" role="status">
                {message}
              </p>
            )}

            <div className="profile-form-actions">
              <button
                type="button"
                className="profile-reset-button"
                onClick={handleReset}
              >
                <RotateCcw size={15} />
                Reset Changes
              </button>

              <button type="submit" className="profile-save-button">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </section>

        <aside className="profile-side-column">
          <section className="profile-side-card">
            <div className="profile-card-heading">
              <div className="profile-heading-icon">
                <ShieldCheck size={19} />
              </div>
              <div>
                <h2>Account Information</h2>
                <p>Your account overview.</p>
              </div>
            </div>

            <div className="profile-account-row">
              <span>Account Type</span>
              <strong>Customer</strong>
            </div>

            <div className="profile-account-row">
              <span>Account Status</span>
              <strong className="profile-active-text">Active</strong>
            </div>

            <div className="profile-account-row">
              <span>Member Since</span>
              <strong>January 2026</strong>
            </div>

            <div className="profile-account-row">
              <span>Profile Completion</span>
              <strong>100%</strong>
            </div>

            <div className="profile-completion-track">
              <span />
            </div>
          </section>

          <section className="profile-help-card">
            <div className="profile-help-icon">
              <Mail size={20} />
            </div>
            <h2>Need help with your account?</h2>
            <p>
              Contact the support team if you need assistance with your
              profile or account information.
            </p>
            <a href="mailto:support@example.com">
              Contact Support
            </a>
          </section>
        </aside>
      </div>
    </main>
  );
}
