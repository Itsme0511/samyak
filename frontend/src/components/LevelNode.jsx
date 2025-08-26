import { memo } from "react";

function LevelNode({ name, unlocked, onClick, number, upcoming, cleared, selected }) {
  const baseSize = 160;
  const bg = upcoming
    ? "linear-gradient(145deg, #7c3aed 0%, #5b21b6 100%)"
    : unlocked
    ? "linear-gradient(145deg, #facc15 0%, #f59e0b 100%)"
    : "linear-gradient(145deg, #475569 0%, #374151 100%)";
  const borderColor = upcoming ? "#8b5cf6" : unlocked ? "#f59e0b" : "#6b7280";
  const textColor = upcoming ? "#ffffff" : unlocked ? "#1f2937" : "#cbd5e1";

  return (
    <div style={{ 
      position: "relative", 
      width: baseSize, 
      height: baseSize,
      animation: unlocked ? "slideInUp 0.6s ease-out" : "slideInUp 0.6s ease-out",
      animationDelay: `${number * 0.1}s`
    }}>
      {typeof number === "number" && (
        <div
          style={{
            position: "absolute",
            top: -16,
            right: -16,
            background: upcoming 
              ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" 
              : unlocked 
              ? "linear-gradient(135deg, #f59e0b, #d97706)" 
              : "linear-gradient(135deg, #6b7280, #4b5563)",
            color: upcoming ? "#ffffff" : unlocked ? "#111827" : "#e5e7eb",
            width: 40,
            height: 40,
            borderRadius: 9999,
            fontSize: 16,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: upcoming
              ? "0 12px 32px rgba(139, 92, 246, 0.5)"
              : unlocked
              ? "0 12px 32px rgba(251, 191, 36, 0.5)"
              : "0 6px 16px rgba(0,0,0,0.4)",
            border: `4px solid ${borderColor}`,
            animation: unlocked ? "pulse 2s infinite" : "none"
          }}
        >
          {number + 1}
        </div>
      )}

      {cleared && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: -12,
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "#ffffff",
            padding: "6px 10px",
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 700,
            boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)",
            border: "2px solid rgba(255,255,255,0.2)"
          }}
          title="Level cleared"
        >
          ✓ Cleared
        </div>
      )}

      <div
        data-level-circle="true"
        onClick={upcoming || unlocked ? onClick : undefined}
        style={{
          width: baseSize,
          height: baseSize,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 18,
          cursor: upcoming || unlocked ? "pointer" : "not-allowed",
          color: textColor,
          backgroundImage: bg,
          border: `5px solid ${selected ? "#fef08a" : borderColor}`,
          boxShadow: upcoming
            ? "0 20px 50px rgba(139, 92, 246, 0.4), inset 0 0 0 10px rgba(255,255,255,0.2)"
            : unlocked
            ? `0 20px 50px rgba(251, 191, 36, 0.4), inset 0 0 0 10px rgba(255,255,255,0.2), ${selected ? "0 0 24px rgba(254, 240, 138, 0.9)" : ""}`
            : "0 16px 40px rgba(0,0,0,0.5), inset 0 0 0 10px rgba(255,255,255,0.08)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          textAlign: "center",
          lineHeight: 1.3,
          padding: "12px",
          position: "relative",
          overflow: "hidden"
        }}
        title={upcoming ? "Click to see upcoming content" : unlocked ? (selected ? "Click again to start" : "Click to fly here") : "Complete previous levels to unlock"}
        onMouseEnter={(e) => {
          if (!unlocked && !upcoming) return;
          e.currentTarget.style.transform = "translateY(-8px) scale(1.08)";
          e.currentTarget.style.boxShadow = upcoming
            ? "0 32px 64px rgba(139, 92, 246, 0.5), inset 0 0 0 10px rgba(255,255,255,0.25)"
            : "0 32px 64px rgba(251, 191, 36, 0.5), inset 0 0 0 10px rgba(255,255,255,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = upcoming
            ? "0 20px 50px rgba(139, 92, 246, 0.4), inset 0 0 0 10px rgba(255,255,255,0.2)"
            : unlocked
            ? "0 20px 50px rgba(251, 191, 36, 0.4), inset 0 0 0 10px rgba(255,255,255,0.2)"
            : "0 16px 40px rgba(0,0,0,0.5), inset 0 0 0 10px rgba(255,255,255,0.08)";
        }}
      >
        {name}
        {upcoming && (
          <div style={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            color: "#ffffff",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}>
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(LevelNode);
