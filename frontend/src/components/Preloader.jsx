export default function Preloader({ message = "Loading..." }) {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Ambient particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: "50%",
            background: i % 2 === 0 ? "rgba(251, 191, 36, 0.25)" : "rgba(96, 165, 250, 0.25)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>

      {/* Loader content */}
      <div className="card" style={{
        position: "relative",
        padding: "36px 48px",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.15)",
        textAlign: "center",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        zIndex: 1
      }}>
        <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 16px auto" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "6px solid rgba(255,255,255,0.12)",
            borderTopColor: "#fbbf24",
            borderRightColor: "#60a5fa",
            animation: "spin 1.6s linear infinite"
          }} />
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(96,165,250,0.2))",
            borderRadius: "50%",
            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            animation: "pulse 2.2s infinite",
            lineHeight: 1
          }}>
            <span style={{ fontSize: 40, lineHeight: 1, position: "relative", top: 2 }}>🐦</span>
          </div>
        </div>
        <div style={{
          fontSize: 22,
          fontWeight: 800,
          background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 6
        }}>
          Preparing Your Journey
        </div>
        <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>{message}</div>
      </div>

      {/* Extra keyframes for spinner */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
