import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../../../firebaseConfig";

export default function Authentication() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setToastMsg("Welcome back! 🎉");
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setToastMsg("Account created! Welcome 👋");
      }

      // ✅ Show toast and close modal after 1.2s
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate(-1);
      }, 1200);
    } catch (err) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={() => navigate(-1)}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="auth-header">
          <div className="auth-tabs" role="tablist">
            <button
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
              type="button"
            >
              Login
            </button>
            <button
              className={`auth-tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => setMode("signup")}
              type="button"
            >
              Sign up
            </button>
          </div>
          <button
            className="auth-close"
            onClick={() => navigate(-1)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Main form */}
        <form className="auth-form" onSubmit={onSubmit}>
          {mode === "signup" && (
            <label className="field">
              <span>Full name</span>
              <input
                type="text"
                placeholder="Patient Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="password-field">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <button
                type="button"
                className="eye-toggle"
                aria-label={showPwd ? "Hide password" : "Show password"}
                onClick={() => setShowPwd((s) => !s)}
              >
                {showPwd ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M12 5c5.5 0 9.5 4.5 10.5 6-1 1.5-5 6-10.5 6S2.5 12.5 1.5 11C2.5 9.5 6.5 5 12 5zm0 3a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3l18 18M10.6 5.2A9.8 9.8 0 0112 5c5.5 0 9.5 4.5 10.5 6-.33.5-1.28 1.64-2.7 2.9M6.1 6.9C3.8 8.4 2.5 10 1.5 11c1 1.5 5 6 10.5 6 1.4 0 2.7-.26 3.9-.74M9.9 9.9a4 4 0 014.2 4.2"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn btn--primary auth-submit" disabled={submitting}>
            {submitting
              ? mode === "login"
                ? "Logging in..."
                : "Creating account..."
              : mode === "login"
              ? "Login"
              : "Create account"}
          </button>
        </form>

        {/* Footer hint */}
        <div className="auth-hint">
          {mode === "login" ? (
            <>
              New here?{" "}
              <button
                className="link"
                type="button"
                onClick={() => setMode("signup")}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="link"
                type="button"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>

      {/* ✅ Toast Message */}
      {showToast && (
        <div className="toast-container">
          <div className="toast">{toastMsg}</div>
        </div>
      )}
    </div>
  );
}
