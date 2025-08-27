import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../api";
import { useAuth } from "../auth/AuthContext";
import Logo from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginRequest(form);
      localStorage.setItem("token", data.token);
      setAuth({ user: data.user, token: data.token });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      overflow: "hidden",
      padding: "20px"
    }}>
      {/* Animated background particles */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 0
      }}>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: "rgba(251, 191, 36, 0.3)",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <form onSubmit={onSubmit} style={{ 
        width: "100%", 
        maxWidth: 420, 
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        padding: 48, 
        borderRadius: 24, 
        color: "#e5e7eb", 
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        position: "relative",
        zIndex: 1,
        animation: "slideInUp 0.6s ease-out"
      }}>
        {/* Shimmer effect */}
        <div className="shimmer" style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 24,
          pointerEvents: "none"
        }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <Logo size="large" />
          </div>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: 800, 
            margin: "0 0 8px 0",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Welcome Back
          </h1>
          <p style={{ 
            fontSize: 16, 
            color: "#94a3b8", 
            margin: 0,
            fontWeight: 500
          }}>
            Sign in to continue your learning journey
          </p>
        </div>

        {error && (
          <div style={{ 
            background: "rgba(239, 68, 68, 0.1)", 
            padding: 16, 
            borderRadius: 12, 
            marginBottom: 24,
            border: "1px solid rgba(239, 68, 68, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            position: "relative",
            zIndex: 1
          }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <span style={{ color: "#ef4444", fontSize: 14, fontWeight: 500 }}>{error}</span>
          </div>
        )}

        <div style={{ position: "relative", zIndex: 1 }}>
          <label style={{ 
            display: "block", 
            marginBottom: 8, 
            fontSize: 14, 
            fontWeight: 600,
            color: "#e2e8f0"
          }}>
            Email Address
          </label>
          <input 
            value={form.email} 
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
            type="email" 
            required 
            style={{
              width: "100%", 
              margin: "0 0 20px 0", 
              padding: 16, 
              borderRadius: 12, 
              border: "2px solid rgba(255, 255, 255, 0.1)", 
              background: "rgba(255, 255, 255, 0.05)", 
              color: "#e2e8f0",
              fontSize: 16,
              transition: "all 0.3s ease",
              outline: "none"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#fbbf24";
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
            }}
            placeholder="Enter your email"
          />

          <label style={{ 
            display: "block", 
            marginBottom: 8, 
            fontSize: 14, 
            fontWeight: 600,
            color: "#e2e8f0"
          }}>
            Password
          </label>
          <div style={{ position: "relative", marginBottom: 32 }}>
            <input 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              type={showPassword ? "text" : "password"}
              required 
              style={{
                width: "100%", 
                padding: 16, 
                borderRadius: 12, 
                border: "2px solid rgba(255, 255, 255, 0.1)", 
                background: "rgba(255, 255, 255, 0.05)", 
                color: "#e2e8f0",
                fontSize: 16,
                transition: "all 0.3s ease",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#fbbf24";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              placeholder="Enter your password"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                height: 36,
                padding: "0 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(15,23,42,0.5)",
                color: "#e2e8f0",
                cursor: "pointer",
                fontSize: 12
              }}
            >
              {showPassword ? "🙈 Hide" : "👁 Show"}
            </button>
          </div>

          <button 
            disabled={loading} 
            type="submit" 
            style={{
              width: "100%", 
              padding: 18, 
              borderRadius: 12, 
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", 
              color: "#1e293b", 
              fontWeight: 700, 
              border: "none", 
              cursor: loading ? "not-allowed" : "pointer", 
              marginTop: 8,
              fontSize: 16,
              transition: "all 0.3s ease",
              boxShadow: "0 8px 24px rgba(251, 191, 36, 0.3)",
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(251, 191, 36, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(251, 191, 36, 0.3)";
            }}
          >
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{
                  width: 16,
                  height: 16,
                  border: "2px solid transparent",
                  borderTop: "2px solid #1e293b",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }}></div>
                Signing in...
              </div>
            ) : (
              "🚀 Sign In"
            )}
          </button>

          <div style={{ 
            marginTop: 32, 
            textAlign: "center",
            padding: "24px 0",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <p style={{ 
              fontSize: 14, 
              color: "#94a3b8",
              marginBottom: 16
            }}>
              Don't have an account?
            </p>
            <Link 
              to="/signup" 
              style={{ 
                background: "rgba(255, 255, 255, 0.1)",
                padding: "12px 24px",
                borderRadius: 12,
                color: "#fbbf24",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.3s ease",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "inline-block"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
