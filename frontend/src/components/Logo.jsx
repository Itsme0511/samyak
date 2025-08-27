import React from 'react';

export default function Logo({ size = "medium", onClick }) {
  const sizes = {
    small: { width: 32, height: 32, fontSize: 14, subtitleSize: 8 },
    medium: { width: 48, height: 48, fontSize: 18, subtitleSize: 10 },
    large: { width: 64, height: 64, fontSize: 24, subtitleSize: 12 }
  };

  const { width, height, fontSize, subtitleSize } = sizes[size];

  return (
    <div 
      onClick={onClick}
      style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 12,
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease",
        ...(onClick && {
          ":hover": { transform: "scale(1.05)" }
        })
      }}
    >
      {/* Logo Icon */}
      <div style={{ 
        position: "relative", 
        width: width, 
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Book */}
        <svg 
          width={width * 0.8} 
          height={height * 0.8} 
          viewBox="0 0 100 100" 
          style={{ position: "absolute" }}
        >
          {/* Book pages */}
          <path 
            d="M20 30 Q20 20 30 20 L70 20 Q80 20 80 30 L80 70 Q80 80 70 80 L30 80 Q20 80 20 70 Z" 
            fill="none" 
            stroke="#1e40af" 
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Book spine */}
          <path 
            d="M30 20 L30 80" 
            fill="none" 
            stroke="#1e40af" 
            strokeWidth="2"
          />
          {/* Curved pages */}
          <path 
            d="M25 25 Q25 15 35 15 L65 15 Q75 15 75 25" 
            fill="none" 
            stroke="#1e40af" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path 
            d="M25 35 Q25 25 35 25 L65 25 Q75 25 75 35" 
            fill="none" 
            stroke="#1e40af" 
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Eye inside book */}
        <svg 
          width={width * 0.4} 
          height={height * 0.4} 
          viewBox="0 0 100 100" 
          style={{ position: "absolute" }}
        >
          {/* Eye outline */}
          <ellipse 
            cx="50" 
            cy="50" 
            rx="25" 
            ry="15" 
            fill="none" 
            stroke="#1e40af" 
            strokeWidth="2"
          />
          {/* Iris */}
          <ellipse 
            cx="50" 
            cy="50" 
            rx="12" 
            ry="8" 
            fill="#1e40af"
          />
          {/* Pupil */}
          <ellipse 
            cx="50" 
            cy="50" 
            rx="6" 
            ry="4" 
            fill="#0f172a"
          />
          {/* Eye highlight */}
          <ellipse 
            cx="45" 
            cy="45" 
            rx="3" 
            ry="2" 
            fill="rgba(255,255,255,0.8)"
          />
        </svg>

        {/* Flame above book */}
        <svg 
          width={width * 0.3} 
          height={height * 0.3} 
          viewBox="0 0 100 100" 
          style={{ 
            position: "absolute", 
            top: -height * 0.1, 
            right: -width * 0.05 
          }}
        >
          <path 
            d="M50 80 Q50 60 60 40 Q50 30 40 50 Q30 30 50 20 Q70 30 60 50 Q70 60 50 80 Z" 
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="1"
          />
          <path 
            d="M50 70 Q50 55 55 40 Q50 35 45 45 Q40 35 50 30 Q60 35 55 45 Q60 55 50 70 Z" 
            fill="#fbbf24"
          />
        </svg>
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ 
          fontWeight: 800, 
          letterSpacing: "0.05em", 
          fontSize: fontSize,
          color: "#1e40af",
          textShadow: "1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.8), 1px -1px 0px rgba(255,255,255,0.8), -1px 1px 0px rgba(255,255,255,0.8)"
        }}>
          SAMYAK
        </div>
        <div style={{ 
          fontSize: subtitleSize,
          color: "#ffffff",
          textShadow: "1px 1px 0px #1e40af, -1px -1px 0px #1e40af, 1px -1px 0px #1e40af, -1px 1px 0px #1e40af",
          letterSpacing: "0.1em",
          fontWeight: 600,
          lineHeight: 1
        }}>
          MEDIA INFORMATION LITERACY
        </div>
      </div>
    </div>
  );
}