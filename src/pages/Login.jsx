
import { useState } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  Landmark,
} from "lucide-react";

import "../CSS/Login.css";
import login_leftImage from "../assets/images/login_leftimage.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Frontend only. Connect authentication to a backend later.
    console.log("Login submitted", {
      email,
      password,
      rememberMe,
    });
  }

  function handleForgotPassword() {
    window.alert("Password recovery will be connected later.");
  }

  function handleSSO() {
    window.alert("Single sign-on will be connected later.");
  }

  return (
    <main className="login-page">
      {/* CENTERED WHITE LOGIN CARD */}
      <div className="login-card">

        {/* LEFT SIDE: IMAGE ONLY */}
        <section className="login-hero">
          <img
            src={login_leftImage}
            alt="Referral Hub"
            className="login-left-image"
          />
        </section>

        {/* RIGHT SIDE: LOGIN FORM */}
        <section className="login-panel">
          <div className="login-form-content">

            <header className="login-card-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
            </header>

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">
                  <Mail size={16} aria-hidden="true" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                    required
                  />

                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME / FORGOT PASSWORD */}
              <div className="login-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="text-button"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              {/* SIGN IN */}
              <button
                className="sign-in-button"
                type="submit"
              >
                Sign In
              </button>

              {/* DIVIDER */}
              <div className="login-divider">
                <span className="divider-line" />
                <span className="or-text">OR</span>
                <span className="divider-line" />
              </div>

              {/* SINGLE SIGN-ON */}
              <button
                className="sso-button"
                type="button"
                onClick={handleSSO}
              >
                <Landmark size={17} />
                <span>Continue with SSO</span>
              </button>
            </form>

            {/* FOOTER */}
            <p className="admin-note">
              Don't have an account?{" "}
              <strong>Contact your admin</strong>
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}
