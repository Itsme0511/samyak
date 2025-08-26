import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Modules() {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState(false);
  const [showModuleQuiz, setShowModuleQuiz] = useState(false);
  const [moduleQuizAnswers, setModuleQuizAnswers] = useState({});
  const [moduleQuizSubmitted, setModuleQuizSubmitted] = useState(false);
  const [moduleQuizPassed, setModuleQuizPassed] = useState(false);
  const certificateCanvasRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: "Understanding Media Literacy",
      icon: "📰",
      description: "Learn the fundamentals of media literacy and why it matters in today's digital world.",
      content: [
        {
          type: "text",
          title: "What is Media Literacy?",
          content: "Media literacy is the ability to access, analyze, evaluate, create, and act using all forms of communication. It's a crucial skill in our information-saturated world."
        },
        {
          type: "text",
          title: "Key Concepts",
          content: "• Media messages are constructed\n• Media messages have commercial implications\n• Media messages have social and political implications\n• Different people interpret media differently\n• Media have embedded values and points of view"
        }
      ]
    },
    {
      id: 2,
      title: "Digital Information Evaluation",
      icon: "🔍",
      description: "Master the skills to evaluate digital information critically and identify reliable sources.",
      content: [
        {
          type: "text",
          title: "The CRAAP Test",
          content: "Currency: Is the information current?\nRelevance: Does it relate to your topic?\nAuthority: Who is the author/publisher?\nAccuracy: Is the information reliable?\nPurpose: Why was this information created?"
        }
      ]
    },
    {
      id: 3,
      title: "Fact-Checking Techniques",
      icon: "✅",
      description: "Learn professional fact-checking methods and tools to verify information accuracy.",
      content: [
        {
          type: "text",
          title: "Fact-Checking Steps",
          content: "1. Check the source's credibility\n2. Look for multiple sources\n3. Check the date of publication\n4. Examine the evidence provided\n5. Consider the context\n6. Use fact-checking websites"
        }
      ]
    },
    {
      id: 4,
      title: "Understanding Bias and Perspective",
      icon: "🎯",
      description: "Recognize different types of bias and understand how perspective influences information.",
      content: [
        {
          type: "text",
          title: "Types of Bias",
          content: "• Confirmation bias: Seeking information that confirms existing beliefs\n• Selection bias: Choosing sources that support a particular viewpoint\n• Framing bias: How information is presented affects interpretation\n• Cultural bias: Influences from cultural background and experiences"
        }
      ]
    },
    {
      id: 5,
      title: "Social Media Literacy",
      icon: "📱",
      description: "Navigate social media responsibly and understand its impact on information consumption.",
      content: [
        {
          type: "text",
          title: "Social Media Challenges",
          content: "• Echo chambers and filter bubbles\n• Algorithm-driven content\n• Viral misinformation\n• Emotional manipulation\n• Privacy concerns\n• Digital footprint"
        }
      ]
    },
    {
      id: 6,
      title: "Visual and Digital Media",
      icon: "🖼️",
      description: "Understand how images, videos, and digital content can be manipulated and misused.",
      content: [
        {
          type: "text",
          title: "Visual Literacy Skills",
          content: "• Analyze image composition and framing\n• Identify photo manipulation techniques\n• Understand context and timing\n• Recognize staged or misleading visuals\n• Consider the photographer's intent"
        }
      ]
    },
    {
      id: 7,
      title: "Ethical Information Sharing",
      icon: "🤝",
      description: "Learn to share information responsibly and ethically in the digital age.",
      content: [
        {
          type: "text",
          title: "Ethical Sharing Principles",
          content: "• Verify information before sharing\n• Consider the impact of your posts\n• Respect others' privacy\n• Give proper attribution\n• Avoid spreading misinformation\n• Think before you post"
        }
      ]
    }
  ];

  // 2-3 quick questions for each module, mapped by index
  const moduleQuizzes = [
    [
      { q: "Media literacy includes the ability to create media.", options: ["True", "False"], correct: 0 },
      { q: "People interpret media messages:", options: ["The same way", "Differently"], correct: 1 },
      { q: "Media messages have embedded values.", options: ["True", "False"], correct: 0 }
    ],
    [
      { q: "In CRAAP, A stands for:", options: ["Accuracy", "Access"], correct: 0 },
      { q: "Purpose in CRAAP asks:", options: ["Why it was created", "How long it is"], correct: 0 }
    ],
    [
      { q: "First fact-checking step is to check:", options: ["Source credibility", "Font size"], correct: 0 },
      { q: "Use multiple:", options: ["Tabs", "Sources"], correct: 1 },
      { q: "Snopes is a:", options: ["Game", "Fact-check site"], correct: 1 }
    ],
    [
      { q: "Confirmation bias means seeking info that:", options: ["Challenges beliefs", "Confirms beliefs"], correct: 1 },
      { q: "Framing can affect:", options: ["Interpretation", "Battery"], correct: 0 }
    ],
    [
      { q: "Echo chambers expose you to:", options: ["Diverse views", "Similar views"], correct: 1 },
      { q: "Algorithms can:", options: ["Shape feeds", "Do taxes"], correct: 0 }
    ],
    [
      { q: "Photo manipulation exists.", options: ["True", "False"], correct: 0 },
      { q: "Context helps detect:", options: ["Time of day", "Misleading visuals"], correct: 1 }
    ],
    [
      { q: "Verify before:", options: ["Sharing", "Sleeping"], correct: 0 },
      { q: "Respect:", options: ["Privacy", "Spam"], correct: 0 }
    ]
  ];

  const assessmentQuestions = [
    {
      question: "What is the primary purpose of media literacy?",
      options: [
        "To consume more media content",
        "To access, analyze, evaluate, create, and act using all forms of communication",
        "To avoid all media sources",
        "To only trust official news sources"
      ],
      correct: 1
    },
    {
      question: "Which of the following is NOT part of the CRAAP test for evaluating sources?",
      options: [
        "Currency",
        "Relevance", 
        "Authority",
        "Popularity"
      ],
      correct: 3
    },
    {
      question: "What is confirmation bias?",
      options: [
        "A type of fact-checking tool",
        "Seeking information that confirms existing beliefs",
        "A reliable source of information",
        "A method for detecting deepfakes"
      ],
      correct: 1
    },
    {
      question: "Which of these is a reliable fact-checking website?",
      options: [
        "Random blog posts",
        "Social media rumors",
        "Snopes.com",
        "Anonymous online forums"
      ],
      correct: 2
    },
    {
      question: "What is an echo chamber in social media?",
      options: [
        "A type of social media platform",
        "An environment where people only encounter information that confirms their existing beliefs",
        "A tool for fact-checking",
        "A method for detecting bias"
      ],
      correct: 1
    }
  ];

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleAssessmentAnswer = (questionIndex, selectedOption) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  const calculateAssessmentScore = () => {
    let correct = 0;
    assessmentQuestions.forEach((question, index) => {
      if (assessmentAnswers[index] === question.correct) {
        correct++;
      }
    });
    return { correct, total: assessmentQuestions.length };
  };

  const handleSubmitAssessment = () => {
    const { correct, total } = calculateAssessmentScore();
    const passed = correct >= Math.ceil(total * 0.7); // 70% passing score
    
    if (passed) {
      setCertificateEarned(true);
    }
    
    setShowResults(true);
  };

  const handleRetryAssessment = () => {
    setAssessmentAnswers({});
    setShowResults(false);
    setCertificateEarned(false);
  };

  const handleContinue = () => {
    navigate("/", { replace: true });
  };

  const canTakeAssessment = completedModules.length >= 6 || currentModule === 6;

  // Module quiz handlers
  const openModuleQuiz = () => {
    setModuleQuizAnswers({});
    setModuleQuizSubmitted(false);
    setModuleQuizPassed(false);
    setShowModuleQuiz(true);
  };

  const handleModuleQuizAnswer = (questionIndex, selectedOption) => {
    setModuleQuizAnswers(prev => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const calculateModuleQuizScore = () => {
    const quiz = moduleQuizzes[currentModule] || [];
    let correct = 0;
    quiz.forEach((q, i) => {
      if (moduleQuizAnswers[i] === q.correct) correct++;
    });
    return { correct, total: quiz.length };
  };

  const submitModuleQuiz = () => {
    const { correct, total } = calculateModuleQuizScore();
    const passed = correct >= Math.max(1, Math.ceil(total * 0.6)); // 60% pass, at least 1
    setModuleQuizSubmitted(true);
    setModuleQuizPassed(passed);
    if (passed) {
      handleModuleComplete(modules[currentModule].id);
    }
  };

  const proceedAfterQuiz = () => {
    setShowModuleQuiz(false);
    setModuleQuizSubmitted(false);
    setModuleQuizPassed(false);
    setModuleQuizAnswers({});
    if (currentModule < modules.length - 1) {
      setCurrentModule(prev => prev + 1);
    } else {
      setShowAssessment(true);
    }
  };

  // Download certificate as PNG drawn on a canvas (no external deps)
  const downloadCertificate = () => {
    const username = user?.username || "Learner";
    const date = new Date().toLocaleDateString();
    const { correct, total } = calculateAssessmentScore();

    // Create canvas
    const canvas = document.createElement("canvas");
    const width = 1400;
    const height = 900;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#fbbf24");
    grad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 16;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 72px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Completion", width / 2, 200);

    // Subtitle
    ctx.font = "bold 42px Arial";
    ctx.fillText("Media and Information Literacy", width / 2, 280);

    // Trophy
    ctx.font = "72px Arial";
    ctx.fillText("🏆", width / 2, 360);

    // Name
    ctx.font = "bold 56px Arial";
    ctx.fillText(username, width / 2, 460);

    // Body
    ctx.font = "28px Arial";
    ctx.fillText("has successfully completed all 7 modules and the final assessment.", width / 2, 520);
    ctx.fillText(`Score: ${correct}/${total}  |  Issued on ${date}`, width / 2, 570);

    // Signature line
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#1e293b";
    ctx.beginPath();
    ctx.moveTo(width / 2 - 200, 680);
    ctx.lineTo(width / 2 + 200, 680);
    ctx.stroke();
    ctx.font = "bold 22px Arial";
    ctx.fillText("Director, MIL Program", width / 2, 715);

    // Download
    const link = document.createElement("a");
    link.download = `MIL-Certificate-${username.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      padding: "40px 20px",
      color: "#e5e5e5"
    }}>
      {/* Header */}
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
            animation: "pulse 3s ease-in-out infinite"
          }}>
            <span style={{ fontSize: 28, fontWeight: "bold", color: "#1e293b" }}>📚</span>
          </div>
          <div>
            <h1 style={{ 
              fontSize: 42, 
              fontWeight: 800, 
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0
            }}>
              MIL Modules
            </h1>
            <p style={{ 
              fontSize: 16, 
              color: "#94a3b8", 
              margin: "6px 0 0 0",
              fontWeight: 500
            }}>
              Master Media and Information Literacy
            </p>
          </div>
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
            transition: "all 0.3s ease"
          }}
        >
          🌳 Back to Tree
        </button>
      </div>

      {!showAssessment ? (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Progress Indicator */}
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
                Module {currentModule + 1} of {modules.length}
              </span>
              <span style={{ 
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: 16, 
                fontWeight: 700 
              }}>
                {Math.round(((currentModule + 1) / modules.length) * 100)}%
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
                  width: `${((currentModule + 1) / modules.length) * 100}%`, 
                  height: "100%", 
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b)", 
                  borderRadius: 6,
                  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                }} 
              />
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#94a3b8" }}>
              Completed: {completedModules.length}/7 modules
            </div>
          </div>

          {/* Module Content */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 40, 
            borderRadius: 24, 
            marginBottom: 40,
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40
              }}>
                {modules[currentModule].icon}
              </div>
              <div>
                <h2 style={{ 
                  fontSize: 32, 
                  marginBottom: 8, 
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 700
                }}>
                  {modules[currentModule].title}
                </h2>
                <p style={{ 
                  fontSize: 18, 
                  color: "#94a3b8", 
                  fontWeight: 500
                }}>
                  {modules[currentModule].description}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {modules[currentModule].content.map((section, index) => (
                <div key={index} style={{
                  padding: 24,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 16,
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <h3 style={{ 
                    fontSize: 24, 
                    marginBottom: 16, 
                    color: "#fbbf24",
                    fontWeight: 600
                  }}>
                    {section.title}
                  </h3>
                  <div style={{ 
                    fontSize: 16, 
                    color: "#e2e8f0", 
                    lineHeight: 1.6,
                    whiteSpace: "pre-line"
                  }}>
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation / Quiz gate */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
              <button
                onClick={() => setCurrentModule(prev => Math.max(0, prev - 1))}
                disabled={currentModule === 0}
                style={{
                  padding: "16px 32px",
                  borderRadius: 16,
                  background: currentModule === 0 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "linear-gradient(135deg, #6b7280, #4b5563)",
                  color: "#ffffff",
                  border: "none",
                  cursor: currentModule === 0 ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  fontSize: 16,
                  opacity: currentModule === 0 ? 0.5 : 1
                }}
              >
                ← Previous Module
              </button>
              
              {!showModuleQuiz ? (
                <button
                  onClick={openModuleQuiz}
                  style={{
                    padding: "16px 32px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#1e293b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 16
                  }}
                >
                  📝 Take Module {currentModule + 1} Quiz
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Module Quiz Modal/Section */}
          {showModuleQuiz && (
            <div style={{ maxWidth: 900, margin: "0 auto 60px auto" }}>
              <div style={{ 
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                padding: 40, 
                borderRadius: 24, 
                border: "1px solid rgba(255, 255, 255, 0.15)"
              }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <h3 style={{ 
                    fontSize: 28, 
                    marginBottom: 8, 
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 800
                  }}>
                    Module {currentModule + 1} Quick Quiz
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: 16 }}>Answer the questions to proceed</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {(moduleQuizzes[currentModule] || []).map((q, i) => (
                    <div key={i} style={{
                      padding: 24,
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 16,
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                      <div style={{ fontSize: 18, color: "#e2e8f0", marginBottom: 12, fontWeight: 600 }}>
                        {i + 1}. {q.q}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {q.options.map((opt, oi) => (
                          <button
                            key={oi}
                            onClick={() => handleModuleQuizAnswer(i, oi)}
                            style={{
                              padding: "14px 16px",
                              borderRadius: 12,
                              border: "2px solid",
                              borderColor: moduleQuizAnswers[i] === oi ? "#fbbf24" : "rgba(255,255,255,0.2)",
                              background: moduleQuizAnswers[i] === oi ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.05)",
                              color: moduleQuizAnswers[i] === oi ? "#fbbf24" : "#e2e8f0",
                              textAlign: "left",
                              cursor: "pointer",
                              fontSize: 15,
                              fontWeight: 500
                            }}
                          >
                            {String.fromCharCode(65 + oi)}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {!moduleQuizSubmitted ? (
                  <div style={{ textAlign: "center", marginTop: 24 }}>
                    <button
                      onClick={submitModuleQuiz}
                      disabled={Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0)}
                      style={{
                        padding: "16px 32px",
                        borderRadius: 16,
                        background: Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0)
                          ? "rgba(255,255,255,0.1)"
                          : "linear-gradient(135deg, #10b981, #059669)",
                        color: "#ffffff",
                        border: "none",
                        cursor: Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0) ? "not-allowed" : "pointer",
                        fontWeight: 700,
                        fontSize: 16,
                        opacity: Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0) ? 0.5 : 1
                      }}
                    >
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginTop: 24 }}>
                    {moduleQuizPassed ? (
                      <>
                        <div style={{ color: "#10b981", fontWeight: 700, marginBottom: 12 }}>Great! You passed.</div>
                        <button
                          onClick={proceedAfterQuiz}
                          style={{
                            padding: "16px 32px",
                            borderRadius: 16,
                            background: currentModule < modules.length - 1 ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "linear-gradient(135deg, #10b981, #059669)",
                            color: currentModule < modules.length - 1 ? "#1e293b" : "#ffffff",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: 16
                          }}
                        >
                          {currentModule < modules.length - 1 ? "Next Module →" : "Proceed to Final Assessment"}
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={{ color: "#ef4444", fontWeight: 700, marginBottom: 12 }}>Not quite. Try again.</div>
                        <button
                          onClick={() => { setModuleQuizSubmitted(false); setModuleQuizAnswers({}); }}
                          style={{
                            padding: "16px 32px",
                            borderRadius: 16,
                            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                            color: "#1e293b",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: 16
                          }}
                        >
                          Retry Quiz
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : !showResults ? (
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Assessment */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 40, 
            borderRadius: 24, 
            marginBottom: 40,
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ 
                fontSize: 36, 
                marginBottom: 16, 
                background: "linear-gradient(135deg, #10b981, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700
              }}>
                Final Assessment
              </h2>
              <p style={{ 
                fontSize: 18, 
                color: "#94a3b8", 
                fontWeight: 500
              }}>
                Test your knowledge of Media and Information Literacy
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {assessmentQuestions.map((question, index) => (
                <div key={index} style={{
                  padding: 24,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 16,
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <h3 style={{ 
                    fontSize: 20, 
                    marginBottom: 20, 
                    color: "#e2e8f0",
                    fontWeight: 600
                  }}>
                    {index + 1}. {question.question}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAssessmentAnswer(index, optionIndex)}
                        style={{
                          padding: "16px 20px",
                          borderRadius: 12,
                          border: "2px solid",
                          borderColor: assessmentAnswers[index] === optionIndex 
                            ? "#10b981" 
                            : "rgba(255, 255, 255, 0.2)",
                          background: assessmentAnswers[index] === optionIndex 
                            ? "rgba(16, 185, 129, 0.15)" 
                            : "rgba(255, 255, 255, 0.05)",
                          color: assessmentAnswers[index] === optionIndex ? "#10b981" : "#e2e8f0",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: 16,
                          fontWeight: 500
                        }}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                onClick={handleSubmitAssessment}
                disabled={Object.keys(assessmentAnswers).length < assessmentQuestions.length}
                style={{
                  padding: "20px 40px",
                  borderRadius: 16,
                  background: Object.keys(assessmentAnswers).length < assessmentQuestions.length
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  border: "none",
                  cursor: Object.keys(assessmentAnswers).length < assessmentQuestions.length ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  fontSize: 18,
                  opacity: Object.keys(assessmentAnswers).length < assessmentQuestions.length ? 0.5 : 1
                }}
              >
                🎯 Submit Assessment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Results */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 50, 
            borderRadius: 24, 
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            {certificateEarned ? (
              <>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 30px auto",
                  fontSize: 48,
                  animation: "pulse 2s infinite"
                }}>
                  🏆
                </div>
                
                <h2 style={{ 
                  fontSize: 36, 
                  marginBottom: 20, 
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800
                }}>
                  Congratulations!
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
                    Your Score: {calculateAssessmentScore().correct}/{calculateAssessmentScore().total}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <button
                    onClick={downloadCertificate}
                    style={{
                      padding: "14px 28px",
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                      color: "#1e293b",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 20
                    }}
                  >
                    ⬇️ Download Certificate (PNG)
                  </button>
                </div>
                
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
                    You've successfully completed the MIL Modules and earned your certificate!
                  </p>
                  
                  {/* Certificate Display */}
                  <div style={{
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    padding: "40px",
                    borderRadius: "20px",
                    margin: "30px 0",
                    border: "4px solid #ffffff"
                  }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>🏆</div>
                    <h3 style={{ 
                      fontSize: 28, 
                      color: "#1e293b", 
                      fontWeight: 800,
                      marginBottom: 10
                    }}>
                      Certificate of Completion
                    </h3>
                    <p style={{ 
                      fontSize: 18, 
                      color: "#1e293b", 
                      fontWeight: 600,
                      marginBottom: 20
                    }}>
                      Media and Information Literacy
                    </p>
                    <p style={{ 
                      fontSize: 16, 
                      color: "#374151", 
                      fontWeight: 500
                    }}>
                      This is to certify that {user?.username} has successfully completed all 7 modules of Media and Information Literacy training.
                    </p>
                    <div style={{ 
                      fontSize: 14, 
                      color: "#6b7280", 
                      marginTop: 20,
                      fontStyle: "italic"
                    }}>
                      Issued on {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

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
                    fontSize: 18
                  }}
                >
                  🚀 Continue to Learning Tree
                </button>
              </>
            ) : (
              <>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 30px auto",
                  fontSize: 48
                }}>
                  😔
                </div>
                
                <h2 style={{ 
                  fontSize: 36, 
                  marginBottom: 20, 
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800
                }}>
                  Try Again
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
                    Your Score: {calculateAssessmentScore().correct}/{calculateAssessmentScore().total}
                  </div>
                </div>

                <button
                  onClick={handleRetryAssessment}
                  style={{
                    padding: "20px 40px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#1e293b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 18
                  }}
                >
                  🔄 Retry Assessment
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
