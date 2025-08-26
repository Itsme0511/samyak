import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelNode from "../components/LevelNode";
import Bird from "../components/Bird";
import { useAuth } from "../auth/AuthContext";
import Particles from "../components/Particles";

export default function Home() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const rowRefs = useRef([]); // one ref per row wrapper
  const [birdPos, setBirdPos] = useState(null);
  const [isFlying, setIsFlying] = useState(false);
  const [targetLevel, setTargetLevel] = useState(0);
  const [birdVisible, setBirdVisible] = useState(false);
  const [showUpcomingMessage, setShowUpcomingMessage] = useState(false);
  const [connectionPaths, setConnectionPaths] = useState([]);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(null); // two-step click selection
  const [currentBirdIndex, setCurrentBirdIndex] = useState(null); // where the bird is currently resting
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Use user's current level from auth context
  const currentLevel = user?.currentLevel ? user.currentLevel - 1 : 0;

  useEffect(() => {
    async function fetchLevels() {
      try {
        const res = await fetch("http://localhost:4000/api/levels");
        const data = await res.json();
        setLevels(
          Array.isArray(data) && data.length
            ? [...data, { title: "Upcoming", upcoming: true }]
            : [
                { title: "Basics" },
                { title: "Deepfake Literacy" },
                { title: "Critical Thinking" },
                { title: "Media Literacy" },
                { title: "Fact Checking" },
                { title: "Upcoming", upcoming: true },
              ]
        );
      } catch (err) {
        setLevels([
          { title: "Basics" },
          { title: "Deepfake Literacy" },
          { title: "Critical Thinking" },
          { title: "Media Literacy" },
          { title: "Fact Checking" },
          { title: "Upcoming", upcoming: true },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchLevels();
  }, []);

  const updateBirdToLevelCenter = (levelIndex = currentLevel, animate = false) => {
    const idx = levelIndex;
    const rowEl = rowRefs.current[idx];
    if (!rowEl || !containerRef.current) return;

    // Determine which side this level is on and find the node element
    const isRight = idx % 2 === 1;
    let targetEl = null;
    if (isRight) {
      targetEl = rowEl.querySelector("[data-level-node='right']");
    } else {
      targetEl = rowEl.querySelector("[data-level-node='left']");
    }
    if (!targetEl) return;

    const circleEl = targetEl.querySelector("[data-level-circle]");
    if (!circleEl) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = circleEl.getBoundingClientRect();

    // Position bottom-center of bird to top-center of the level circle
    const nodeTopY = rect.top - containerRect.top; // top edge of circle
    const nodeCenterX = rect.left - containerRect.left + rect.width / 2; // center X of circle

    // Bird component sizes and transform approximations
    const baseSize = 120; // resting size in Bird.jsx
    const flyingSize = 100; // flying size in Bird.jsx
    const scale = animate ? 1.4 : 1; // Bird.jsx applies scale when flying
    const translateY = animate ? -75 : 0; // Bird.jsx applies translateY when flying

    const visualSize = (animate ? flyingSize : baseSize) * scale;

    // Compute top/left so that (after translateY) bird's bottom center sits on nodeTopY/nodeCenterX
    // Slight resting adjustment to compensate for sprite baseline
    const restingAdjust = animate ? 0 : 4;
    const top = nodeTopY - visualSize - translateY + restingAdjust;
    const left = nodeCenterX - visualSize / 2;

    if (animate) {
      // Start flying animation
      setIsFlying(true);
      setTargetLevel(idx);
      setBirdPos({ top, left });
      setBirdVisible(true);
    } else {
      // Direct positioning without animation
      setBirdPos({ top, left });
      setBirdVisible(true);
      setCurrentBirdIndex(idx);
    }
  };

  const handleAnimationComplete = () => {
    setIsFlying(false);
    setBirdVisible(true);
    setCurrentBirdIndex(targetLevel);
  };

  const calculateConnectionPaths = () => {
    if (!containerRef.current || levels.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const paths = [];

    for (let i = 0; i < levels.length - 1; i++) {
      const currentRow = rowRefs.current[i];
      const nextRow = rowRefs.current[i + 1];
      
      if (!currentRow || !nextRow) continue;

      // Find the actual level nodes in the DOM - look for the circular level node
      const currentNode = currentRow.querySelector("[data-level-circle]");
      const nextNode = nextRow.querySelector("[data-level-circle]");

      if (!currentNode || !nextNode) {
        continue;
      }

      const currentRect = currentNode.getBoundingClientRect();
      const nextRect = nextNode.getBoundingClientRect();

      // Calculate center points of the level nodes
      const startX = currentRect.left - containerRect.left + currentRect.width / 2;
      const startY = currentRect.top - containerRect.top + currentRect.height / 2;
      const endX = nextRect.left - containerRect.left + nextRect.width / 2;
      const endY = nextRect.top - containerRect.top + nextRect.height / 2;

      // Create curved path
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      paths.push({
        id: i,
        path: `M ${startX} ${startY} Q ${midX} ${midY - 30} ${endX} ${endY}`,
        isUnlocked: i < currentLevel,
        isNextUpcoming: levels[i + 1]?.upcoming
      });
    }

    setConnectionPaths(paths);
  };

  // Debounce helper
  const debounce = (fn, wait) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  useEffect(() => {
    updateBirdToLevelCenter();
    // Add a small delay to ensure DOM elements are rendered
    const timeout = setTimeout(() => {
      calculateConnectionPaths();
    }, 100);
    
    const onResize = debounce(() => {
      updateBirdToLevelCenter();
      calculateConnectionPaths();
    }, 150);

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [loading, currentLevel, levels.length]);

  // Handle level progression animation
  useEffect(() => {
    if (user?.currentLevel && user.currentLevel > 1) {
      // Animate to the new level when user progresses
      const newLevel = user.currentLevel - 1;
      if (newLevel !== currentLevel) {
        updateBirdToLevelCenter(newLevel, true);
      }
    }
  }, [user?.currentLevel]);

  const handleLevelClick = (idx) => {
    const level = levels[idx];
    
    if (level?.upcoming) {
      // Show upcoming message
      setShowUpcomingMessage(true);
      setTimeout(() => setShowUpcomingMessage(false), 4000); // Hide after 4 seconds
      return;
    }

    // If bird already resting on this level, open immediately
    if (!isFlying && currentBirdIndex === idx) {
      navigate(`/quiz/${idx + 1}`);
      return;
    }

    // Two-step click: first click selects and flies; second click starts if not flying
    if (selectedLevelIndex !== idx) {
      setSelectedLevelIndex(idx);
      updateBirdToLevelCenter(idx, true);
      return;
    }

    // Second click for the same selected level
    if (!isFlying) {
      navigate(`/quiz/${idx + 1}`);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#2c2c2c", color: "#e5e5e5" }}>
        Loading levels...
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ 
      position: "relative", 
      minHeight: "100vh", 
      padding: "40px 20px",
      overflow: "hidden"
    }}>
      {/* Animated background particles */}
      <Particles count={20} />
      {/* Header with user info and logout */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 60,
        maxWidth: "1200px",
        margin: "0 auto 60px auto",
        padding: "0 20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 40px rgba(251, 191, 36, 0.4)",
            position: "relative",
            animation: "pulse 3s ease-in-out infinite"
          }}>
            <span style={{ fontSize: 28, fontWeight: "bold", color: "#1e293b" }}>🎯</span>
            <div style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "white",
              fontWeight: "bold",
              animation: "glow 2s ease-in-out infinite"
            }}>
              {levels.length}
            </div>
          </div>
          <div>
            <h1 style={{ 
              fontSize: 42, 
              fontWeight: 800, 
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              textShadow: "0 4px 8px rgba(0,0,0,0.3)"
            }}>
              Skill Tree
            </h1>
            <p style={{ 
              fontSize: 16, 
              color: "#94a3b8", 
              margin: "6px 0 0 0",
              fontWeight: 500,
              letterSpacing: "0.5px"
            }}>
              Master the art of media literacy
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: "16px 24px",
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div className="shimmer" style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none"
            }} />
            <span style={{ 
              color: "#e2e8f0", 
              fontSize: 15,
              fontWeight: 500,
              position: "relative",
              zIndex: 1
            }}>
              Welcome, <span style={{ 
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700 
              }}>{user?.username}</span>
            </span>
          </div>
          <button
            onClick={() => navigate("/modules")}
            style={{
              padding: "14px 28px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
            }}
          >
            📚 MIL Modules
          </button>
          <button
            onClick={() => navigate("/blogs")}
            style={{
              padding: "14px 28px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(59, 130, 246, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.4)";
            }}
          >
            📝 Blogs
          </button>
          <button
            onClick={logout}
            style={{
              padding: "14px 28px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(239, 68, 68, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.4)";
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>🚪 Logout</span>
          </button>
        </div>
      </div>

      {birdVisible && birdPos && (
        <Bird 
          top={birdPos.top} 
          left={birdPos.left} 
          flying={isFlying} 
          onAnimationComplete={handleAnimationComplete}
        />
      )}

      {/* Floating bottom-left Blogs shortcut */}
      <button
        onClick={() => navigate("/blogs")}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          padding: "12px 18px",
          borderRadius: 9999,
          background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
          boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
          zIndex: 100
        }}
      >
        📝 Blogs
      </button>

      {/* Upcoming Message */}
      {showUpcomingMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(15, 23, 42, 0.98)",
            backdropFilter: "blur(20px)",
            color: "#fbbf24",
            padding: "50px 80px",
            borderRadius: "24px",
            fontSize: "32px",
            fontWeight: "bold",
            zIndex: 1000,
            border: "4px solid #fbbf24",
            boxShadow: "0 30px 80px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.3), inset 0 0 0 1px rgba(251, 191, 36, 0.2)",
            animation: "fadeIn 0.4s ease-out",
            overflow: "hidden",
            minWidth: "400px"
          }}
        >
          <div className="shimmer" style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none"
          }} />
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 24,
            position: "relative",
            zIndex: 1
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              animation: "pulse 2s infinite",
              boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)"
            }}>
              🚀
            </div>
            <div>
              <div style={{ 
                fontSize: 42, 
                fontWeight: 800, 
                marginBottom: 12,
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Coming Soon!
              </div>
              <div style={{ 
                fontSize: 18, 
                color: "#94a3b8", 
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 1.4
              }}>
                New content is being prepared for this level
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 100, 
        alignItems: "center", 
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        zIndex: 1
      }}>
        {/* Progress indicator */}
        <div style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          padding: "20px 32px",
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 20
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "white",
            fontWeight: "bold"
          }}>
            {currentLevel + 1}
          </div>
          <div>
            <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 500 }}>
              Current Level
            </div>
            <div style={{ 
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: 18, 
              fontWeight: 700 
            }}>
              {levels[currentLevel]?.title || "Basics"}
            </div>
          </div>
        </div>

        {levels.map((level, idx) => {
          const isUpcoming = level?.upcoming;
          const isUnlocked = isUpcoming ? false : idx <= currentLevel;
          const isCleared = !isUpcoming && idx < currentLevel;
          const isRight = idx % 2 === 1;

          return (
            <div
              key={idx}
              ref={(el) => (rowRefs.current[idx] = el)}
              style={{
                width: "100%",
                maxWidth: "1000px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "center",
                columnGap: 40,
                position: "relative",
                padding: "20px 0",
              }}
            >
              {/* Left cell */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                {!isRight && (
                  <div data-level-node="left">
                    <LevelNode
                      name={level.title}
                      number={idx}
                      unlocked={isUnlocked}
                      upcoming={isUpcoming}
                      cleared={isCleared}
                      selected={selectedLevelIndex === idx}
                      onClick={() => handleLevelClick(idx)}
                    />
                  </div>
                )}
              </div>

              {/* Right cell */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {isRight && (
                  <div data-level-node="right">
                    <LevelNode
                      name={level.title}
                      number={idx}
                      unlocked={isUnlocked}
                      upcoming={isUpcoming}
                      cleared={isCleared}
                      selected={selectedLevelIndex === idx}
                      onClick={() => handleLevelClick(idx)}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
      