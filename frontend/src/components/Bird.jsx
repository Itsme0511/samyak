import { memo } from "react";
import birdResting from "../public/bird-resting.png";
import birdFlying from "../public/bird-flying.png";

function Bird({ top, left, flying, onAnimationComplete }) {
  const baseSize = 120; // base size for resting
  const flyingSize = 100; // much larger size when flying
  const size = flying ? flyingSize : baseSize;

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        transition: flying 
          ? "top 1.2s ease, left 1.2s ease, transform 0.3s ease, width 0.3s ease, height 0.3s ease" 
          : "top 0.8s ease, left 0.8s ease, transform 0.25s ease, width 0.25s ease, height 0.25s ease",
        transform: flying ? "translateY(-12px) scale(1.4)" : "translateY(0) scale(1)",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <img
        src={flying ? birdFlying : birdResting}
        alt={flying ? "bird flying" : "bird resting"}
        style={{ 
          width: "100%", 
          height: "100%", 
          display: "block",
          objectFit: "contain"
        }}
        decoding="async"
        loading="eager"
        fetchPriority="high"
        onLoad={() => {
          // If we're flying, set a timeout to complete the animation
          if (flying && onAnimationComplete) {
            setTimeout(onAnimationComplete, 1200); // Match the new transition duration
          }
        }}
      />
    </div>
  );
}

export default memo(Bird);
