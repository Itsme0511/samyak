import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, completeLevel } from "../api";
import { useAuth } from "../auth/AuthContext";
import Particles from "../components/Particles";

export default function Quiz() {
  const { levelNumber } = useParams();
  const navigate = useNavigate();
  const { user, setAuth } = useAuth();
  const [level, setLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`/api/levels/${levelNumber}`);
        setLevel(response.data);
      } catch (err) {
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [levelNumber]);

  const handleAnswer = (questionIndex, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  const handleNext = () => {
    if (currentQuestion < level.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    level.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: level.questions.length };
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const handleContinue = async () => {
    try {
      // Persist progress in Progress collection (Mongo)
      const num = parseInt(levelNumber);
      if (!Number.isNaN(num)) {
        await completeLevel(num);
      }

      // Update user's current level in Users collection (existing flow)
      const newLevel = Math.max(user.currentLevel, parseInt(levelNumber) + 1);
      const response = await api.put("/api/auth/level", { currentLevel: newLevel });
      
      // Update local auth state
      setAuth({ 
        user: response.data.user, 
        token: localStorage.getItem("token") 
      });
      
      navigate("/app", { replace: true });
    } catch (err) {
      console.error("Failed to update level:", err);
      navigate("/", { replace: true });
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          padding: "40px 60px",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          textAlign: "center"
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            animation: "pulse 2s infinite"
          }}>
            <span style={{ fontSize: 24 }}>📚</span>
          </div>
          <div style={{ 
            color: "#e2e8f0", 
            fontSize: 18, 
            fontWeight: 600,
            marginBottom: 8
          }}>
            Loading Quiz
          </div>
          <div className="loading-dots" style={{ color: "#fbbf24", fontSize: 16 }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite"
      }}>
        <div style={{
          background: "rgba(239, 68, 68, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "40px 60px",
          borderRadius: "20px",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          textAlign: "center"
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto"
          }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
          </div>
          <div style={{ color: "#ef4444", fontSize: 18, fontWeight: 600 }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!level) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          padding: "40px 60px",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          textAlign: "center"
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6b7280, #4b5563)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto"
          }}>
            <span style={{ fontSize: 24 }}>🔍</span>
          </div>
          <div style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 600 }}>
            Level not found
          </div>
        </div>
      </div>
    );
  }

  const question = level.questions[currentQuestion];
  const { correct, total } = calculateScore();
  const passed = correct >= level.passingScore;

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      padding: "40px 20px",
      color: "#e5e5e5",
      overflow: "hidden"
    }}>
      {/* Animated background particles */}
      <Particles count={15} />

      {/* Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 60,
        maxWidth: "1200px",
        margin: "0 auto 60px auto",
        padding: "0 20px",
        position: "relative",
        zIndex: 1
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
            animation: "pulse 3s ease-in-out infinite"
          }}>
            <span style={{ fontSize: 28, fontWeight: "bold", color: "#1e293b" }}>📝</span>
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
              {level.title} - Quiz
            </h1>
            <p style={{ 
              fontSize: 16, 
              color: "#94a3b8", 
              margin: "6px 0 0 0",
              fontWeight: 500,
              letterSpacing: "0.5px"
            }}>
              Test your knowledge and progress
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: "16px 24px",
            borderRadius: "16px",
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
            onClick={() => navigate("/")}
            style={{
              padding: "14px 28px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #374151, #4b5563)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(55, 65, 81, 0.4)",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(55, 65, 81, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(55, 65, 81, 0.4)";
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>🌳 Back to Tree</span>
          </button>
        </div>
      </div>

      {!showResults ? (
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Progress */}
          <div style={{ 
            marginBottom: 40,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: "24px 32px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 600 }}>
                Question {currentQuestion + 1} of {level.questions.length}
              </span>
              <span style={{ 
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: 16, 
                fontWeight: 700 
              }}>
                {Math.round(((currentQuestion + 1) / level.questions.length) * 100)}%
              </span>
            </div>
            <div style={{ 
              width: "100%", 
              height: 12, 
              background: "rgba(255, 255, 255, 0.1)", 
              borderRadius: 6,
              overflow: "hidden"
            }}>
              <div 
                style={{ 
                  width: `${((currentQuestion + 1) / level.questions.length) * 100}%`, 
                  height: "100%", 
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b)", 
                  borderRadius: 6,
                  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                }} 
              />
            </div>
          </div>

          {/* Question */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 40, 
            borderRadius: 24, 
            marginBottom: 40,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}>
            <h2 style={{ 
              fontSize: 24, 
              marginBottom: 32, 
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
              lineHeight: 1.4
            }}>
              {question.question}
            </h2>
            
            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion, index)}
                  style={{
                    padding: "20px 24px",
                    borderRadius: 16,
                    border: "2px solid",
                    borderColor: answers[currentQuestion] === index 
                      ? "#fbbf24" 
                      : "rgba(255, 255, 255, 0.2)",
                    background: answers[currentQuestion] === index 
                      ? "rgba(251, 191, 36, 0.15)" 
                      : "rgba(255, 255, 255, 0.05)",
                    color: answers[currentQuestion] === index ? "#fbbf24" : "#e2e8f0",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: 16,
                    fontWeight: 500,
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <span style={{ 
                    display: "flex",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: answers[currentQuestion] === index 
                      ? "linear-gradient(135deg, #fbbf24, #f59e0b)" 
                      : "rgba(255, 255, 255, 0.1)",
                    color: answers[currentQuestion] === index ? "#1e293b" : "#e2e8f0",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    marginRight: 16,
                    fontSize: 14
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              style={{
                padding: "16px 32px",
                borderRadius: 16,
                background: currentQuestion === 0 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "linear-gradient(135deg, #6b7280, #4b5563)",
                color: "#ffffff",
                border: "none",
                cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: 16,
                transition: "all 0.3s ease",
                opacity: currentQuestion === 0 ? 0.5 : 1
              }}
            >
              ← Previous
            </button>
            
            {currentQuestion < level.questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                style={{
                  padding: "16px 32px",
                  borderRadius: 16,
                  background: answers[currentQuestion] === undefined 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  color: "#ffffff",
                  border: "none",
                  cursor: answers[currentQuestion] === undefined ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  fontSize: 16,
                  transition: "all 0.3s ease",
                  opacity: answers[currentQuestion] === undefined ? 0.5 : 1,
                  boxShadow: answers[currentQuestion] === undefined 
                    ? "none" 
                    : "0 8px 24px rgba(251, 191, 36, 0.3)"
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={answers[currentQuestion] === undefined}
                style={{
                  padding: "16px 32px",
                  borderRadius: 16,
                  background: answers[currentQuestion] === undefined 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  border: "none",
                  cursor: answers[currentQuestion] === undefined ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  fontSize: 16,
                  transition: "all 0.3s ease",
                  opacity: answers[currentQuestion] === undefined ? 0.5 : 1,
                  boxShadow: answers[currentQuestion] === undefined 
                    ? "none" 
                    : "0 8px 24px rgba(16, 185, 129, 0.3)"
                }}
              >
                🎯 Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Results */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 50, 
            borderRadius: 24, 
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: passed 
                ? "linear-gradient(135deg, #10b981, #059669)" 
                : "linear-gradient(135deg, #ef4444, #dc2626)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 30px auto",
              fontSize: 48,
              animation: "pulse 2s infinite"
            }}>
              {passed ? "🎉" : "😔"}
            </div>
            
            <h2 style={{ 
              fontSize: 36, 
              marginBottom: 20, 
              background: passed 
                ? "linear-gradient(135deg, #10b981, #059669)" 
                : "linear-gradient(135deg, #ef4444, #dc2626)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 800
            }}>
              {passed ? "Congratulations!" : "Try Again"}
            </h2>
            
            <div style={{ marginBottom: 40 }}>
              <div style={{ 
                fontSize: 24, 
                marginBottom: 12,
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700
              }}>
                Your Score: {correct}/{total}
              </div>
            </div>

            {passed ? (
              <div style={{ marginBottom: 40 }}>
                <p style={{ 
                  fontSize: 18, 
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 30,
                  fontWeight: 600
                }}>
                  You've successfully completed this level!
                </p>
                <button
                  onClick={handleContinue}
                  style={{
                    padding: "20px 40px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#1e293b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 18,
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 24px rgba(251, 191, 36, 0.3)"
                  }}
                >
                  🚀 Continue to Next Level
                </button>
              </div>
            ) : (
              <div style={{ marginBottom: 40 }}>
                <p style={{ 
                  fontSize: 18, 
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 30,
                  fontWeight: 600
                }}>
                  You need at least {level.passingScore} correct answers to pass.
                </p>
                <button
                  onClick={handleRetry}
                  style={{
                    padding: "20px 40px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#1e293b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 18,
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 24px rgba(251, 191, 36, 0.3)"
                  }}
                >
                  🔄 Retry Quiz
                </button>
              </div>
            )}

            {/* Review Answers */}
            <div style={{ textAlign: "left" }}>
              <h3 style={{ 
                fontSize: 24, 
                marginBottom: 30, 
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700,
                textAlign: "center"
              }}>
                Review Your Answers:
              </h3>
              {level.questions.map((q, index) => (
                <div key={index} style={{ 
                  marginBottom: 24, 
                  padding: 24, 
                  background: "rgba(255, 255, 255, 0.05)", 
                  borderRadius: 16,
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <p style={{ 
                    fontSize: 18, 
                    marginBottom: 16, 
                    fontWeight: 600,
                    color: "#e2e8f0"
                  }}>
                    {index + 1}. {q.question}
                  </p>
                  <p style={{ 
                    fontSize: 16, 
                    marginBottom: 8, 
                    color: "#94a3b8",
                    fontWeight: 500
                  }}>
                    Your answer: {answers[index] !== undefined 
                      ? String.fromCharCode(65 + answers[index]) + ". " + q.options[answers[index]] 
                      : "Not answered"}
                  </p>
                  <p style={{ 
                    fontSize: 16, 
                    marginBottom: 12, 
                    color: "#94a3b8",
                    fontWeight: 500
                  }}>
                    Correct answer: {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                  </p>
                  <p style={{ 
                    fontSize: 16, 
                    color: "#fbbf24",
                    fontWeight: 500,
                    background: "rgba(251, 191, 36, 0.1)",
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: "1px solid rgba(251, 191, 36, 0.2)"
                  }}>
                    💡 {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
