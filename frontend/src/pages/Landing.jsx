import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Logo from "../components/Logo";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const transitionTo = (path) => {
    // Create a subtle overlay to smoothen navigation
    const overlay = document.createElement('div');
    overlay.className = 'route-transition';
    document.body.appendChild(overlay);
    setTimeout(() => navigate(path), 180);
    setTimeout(() => overlay.remove(), 1000);
  };

  // Scroll-reveal activation in React-safe way (instead of inline <script>)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const onScroll = () => {
      const trigger = window.innerHeight * 0.9;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < trigger) el.classList.add('show');
      });
    };
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "#e5e5e5" }}>
      {/* Hero */}
      <header style={{ padding: "28px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size="medium" onClick={() => transitionTo("/")} />
          <div style={{ display: "flex", gap: 10 }}>
            {!user ? (
              <>
                <button onClick={() => transitionTo("/login")} style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,0.08)", color: "#e5e5e5", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontWeight: 600 }}>Sign In</button>
                <button onClick={() => transitionTo("/signup")} style={{ padding: "10px 16px", borderRadius: 12, background: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "#1e293b", border: "none", cursor: "pointer", fontWeight: 800 }}>Create Account</button>
              </>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        {/* header confetti */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#60a5fa" : "#10b981",
              opacity: 0.35,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random()}s`
            }} />
          ))}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container section-sm" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
        <div>
          <h1 className="rise-on-load" style={{ fontSize: 48, margin: 0, fontWeight: 900, lineHeight: 1.15 }}>
            Master Media & Information Literacy
          </h1>
          <p className="reveal" style={{ color: "#94a3b8", fontSize: 20, lineHeight: 1.7, marginTop: 18 }}>
            Organize your learning journey with interactive modules, quick quizzes, and a certificate of completion.
          </p>
          {/* Primary CTA row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, max-content)", gap: 16, marginTop: 28, alignItems: "center" }}>
            <button className="pop-on-load" onClick={() => transitionTo(user ? "/modules" : "/login")} style={{ padding: "16px 24px", borderRadius: 16, background: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "#1e293b", border: "none", cursor: "pointer", fontWeight: 800, boxShadow: "0 10px 30px rgba(251,191,36,0.25)" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 36px rgba(251,191,36,0.35)'; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(251,191,36,0.25)'; }}
            >
              {user ? "Start Modules" : "Sign in to Start"}
            </button>
            <button className="pop-on-load" onClick={() => transitionTo(user ? "/app" : "/login")} style={{ padding: "16px 24px", borderRadius: 16, background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 800, boxShadow: "0 10px 30px rgba(16,185,129,0.25)" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 36px rgba(16,185,129,0.35)'; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(16,185,129,0.25)'; }}
            >
              {user ? "Play Game" : "Sign in to Play"}
            </button>
            <button className="pop-on-load" onClick={() => transitionTo(user ? "/blogs" : "/login")} style={{ padding: "16px 24px", borderRadius: 16, background: "linear-gradient(135deg,#60a5fa,#3b82f6)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 800, boxShadow: "0 10px 30px rgba(59,130,246,0.25)" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 36px rgba(59,130,246,0.35)'; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(59,130,246,0.25)'; }}
            >
              {user ? "Read Blogs" : "Sign in to Explore"}
            </button>
          </div>
        </div>
        <div className="card" style={{ padding: 0, borderRadius: 24, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "relative", background: "rgba(255,255,255,0.04)", padding: 12 }}>
            {/* Hero Illustration (place image at frontend/public/landing-page-image-1.jpg) */}
            <img
              src="/landing-page-image-1.jpg"
              alt="Learner analyzing news with magnifying glass"
              style={{
                width: "100%",
                height: 360,
                objectFit: "cover",
                borderRadius: 18,
                animation: "float 6s ease-in-out infinite",
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
              }}
            />

            {/* Floating fun badges */}
            <div style={{ position: "absolute", top: 24, left: 24, display: "flex", gap: 10 }}>
              <div style={{ padding: "8px 12px", borderRadius: 9999, background: "linear-gradient(135deg,#60a5fa,#3b82f6)", color: "white", fontWeight: 800, fontSize: 12, animation: "float 4.5s ease-in-out infinite" }}>NEWS</div>
              <div style={{ padding: "8px 12px", borderRadius: 9999, background: "linear-gradient(135deg,#f472b6,#ec4899)", color: "white", fontWeight: 800, fontSize: 12, animation: "float 5.5s ease-in-out infinite", animationDelay: "0.6s" }}>FAKE NEWS</div>
            </div>

            {/* <div style={{ position: "absolute", bottom: 18, right: 18, display: "flex", gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", animation: "float 5s ease-in-out infinite" }}>🎥</div>
              <div style={{ width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", animation: "float 6s ease-in-out infinite", animationDelay: "0.8s" }}>📰</div>
              <div style={{ width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", animation: "float 6.5s ease-in-out infinite", animationDelay: "1.2s" }}>🔍</div>
            </div> */}

            <div style={{ padding: 14, textAlign: "center", color: "#94a3b8" }}>A modern, student-friendly way to become media savvy.</div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="section" style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, textAlign: "center" }}>The Challenge & Our Solution</h2>
        </div>
        <div className="container grid-2" style={{ gap: 40 }}>
          <div className="card" style={{ padding: 40 }}>
            <h3 style={{ color: "#10b981", marginTop: 0, fontSize: 24, fontWeight: 800 }}>The Problem</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.9, fontSize: 16 }}>Misinformation spreads fast. Many learners are overwhelmed, unsure which sources to trust, and lack easy, structured training.</p>
            <ul style={{ color: "#cbd5e1", lineHeight: 2, fontSize: 16 }}>
              <li>Unverified content and fake news</li>
              <li>Algorithmic echo chambers</li>
              <li>Lack of practical, engaging resources</li>
            </ul>
          </div>
          <div className="card" style={{ padding: 40 }}>
            <h3 style={{ color: "#fbbf24", marginTop: 0, fontSize: 24, fontWeight: 800 }}>Our Solution</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.9, fontSize: 16 }}>Samyak delivers 7 structured modules, micro-quizzes, and a final certificate — built for clarity, accessibility, and real-world practice.</p>
            <ul style={{ color: "#cbd5e1", lineHeight: 2, fontSize: 16 }}>
              <li>Step-by-step learning path</li>
              <li>Interactive quizzes to reinforce concepts</li>
              <li>Downloadable certificate on completion</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Explore Samyak Section */}
      <section className="section" style={{ background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, textAlign: "center" }}>Explore Samyak</h2>
        </div>
        <div className="container grid-3" style={{ gap: 40 }}>
          {[{icon:"🎮",title:"Play Games",desc:"Interactive quizzes and challenges.",path:"/app"},{icon:"📚",title:"Learn Modules",desc:"7 curated MIL modules.",path:"/modules"},{icon:"📝",title:"Read Blogs",desc:"Community articles and tips.",path:"/blogs"}].map((card,i)=> {
            const highlight = card.title === "Learn Modules";
            return (
              <div key={i} className="card reveal" style={{ 
                padding: highlight ? 40 : 32, 
                transform: highlight ? "scale(1.02)" : "scale(1)", 
                boxShadow: highlight ? "0 20px 60px rgba(251,191,36,0.15)" : undefined, 
                border: highlight ? "1px solid rgba(251,191,36,0.35)" : undefined, 
                background: highlight ? "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(245,158,11,0.06))" : undefined 
              }}>
                <div style={{ fontSize: 48 }}>{card.icon}</div>
                <div style={{ fontWeight: 800, marginTop: 16, fontSize: 20 }}>{card.title}</div>
                <div style={{ color: "#94a3b8", marginTop: 12, lineHeight: 1.7, fontSize: 16 }}>{card.desc}</div>
                <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr", alignItems: "stretch" }}>
                  <button onClick={()=> transitionTo(user ? card.path : "/login") } style={{ 
                    padding: "16px 20px", 
                    borderRadius: 14, 
                    background: "linear-gradient(135deg,#fbbf24,#f59e0b)", 
                    color: "#1e293b", 
                    border: "none", 
                    cursor: "pointer", 
                    fontWeight: 800, 
                    width: "100%", 
                    boxShadow: "0 10px 30px rgba(251,191,36,0.2)",
                    fontSize: 16
                  }}>{user ? "Open" : "Sign in to Access"}</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Steps Section */}
      <section className="section" style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <h2 style={{ textAlign: "center", margin: 0, fontSize: 32, fontWeight: 800 }}>Get Started in 3 Easy Steps</h2>
        </div>
        <div className="container grid-3" style={{ gap: 40 }}>
          {[
            { icon: "📝", title: "Register", text: "Create your account in seconds." },
            { icon: "🏫", title: "Find Modules", text: "Choose from 7 curated modules." },
            { icon: "🎓", title: "Get Certified", text: "Pass assessments and earn a certificate." }
          ].map((s, i) => (
            <div key={i} className="card reveal" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, marginBottom: 12, fontSize: 20 }}>{s.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7 }}>{s.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-sm" style={{ background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ marginBottom: 40 }}>
          <h2 style={{ textAlign: "center", margin: 0, fontSize: 28, fontWeight: 800 }}>Extra Features</h2>
        </div>
        <div className="container grid-3" style={{ gap: 32 }}>
          {[{icon:"⚡",title:"Bite-sized Lessons",desc:"Concise sections that are easy to digest."},{icon:"🔍",title:"Fact-Checking Tools",desc:"Practice with real methods and checks."},{icon:"🏆",title:"Certificate",desc:"Finish all modules and download instantly."}].map((f,i)=> (
            <div key={i} className="card reveal" style={{ padding: 32, display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ fontSize: 36 }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{f.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <h2 style={{ textAlign: "center", margin: 0, fontSize: 32, fontWeight: 800 }}>Frequently Asked Questions</h2>
        </div>
        <div className="container grid-2" style={{ gap: 32 }}>
          {[{q:"Is Samyak free?",a:"Yes, access modules and community blogs after sign-in."},{q:"Do I get a certificate?",a:"Complete all modules and pass the final assessment to download one."},{q:"Can I use mobile?",a:"Absolutely. The site is responsive and mobile-friendly."},{q:"What skills will I gain?",a:"Critical thinking, fact-checking, digital safety, and ethical media creation."}].map((f,i)=> (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{f.q}</div>
              <div style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-sm" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.04))", borderTop: "1px solid rgba(251,191,36,0.15)" }}>
        <div className="container">
          <div className="card" style={{ 
            padding: 48, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            gap: 24, 
            flexWrap: "wrap",
            background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(245,158,11,0.08))",
            border: "1px solid rgba(251,191,36,0.25)",
            boxShadow: "0 20px 60px rgba(251,191,36,0.15)"
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Ready to get started?</div>
              <div style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.6 }}>Sign up and begin your MIL journey today.</div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {!user ? (
                <>
                  <button onClick={() => transitionTo("/signup")} style={{ 
                    padding: "16px 24px", 
                    borderRadius: 14, 
                    background: "linear-gradient(135deg,#10b981,#059669)", 
                    color: "#fff", 
                    border: "none", 
                    cursor: "pointer", 
                    fontWeight: 800,
                    fontSize: 16,
                    boxShadow: "0 10px 30px rgba(16,185,129,0.25)"
                  }}>Create Account</button>
                  <button onClick={() => transitionTo("/login")} style={{ 
                    padding: "16px 24px", 
                    borderRadius: 14, 
                    background: "linear-gradient(135deg,#374151,#4b5563)", 
                    color: "#fff", 
                    border: "none", 
                    cursor: "pointer", 
                    fontWeight: 700,
                    fontSize: 16
                  }}>Sign In</button>
                </>
              ) : (
                <button onClick={() => transitionTo("/app")} style={{ 
                  padding: "16px 24px", 
                  borderRadius: 14, 
                  background: "linear-gradient(135deg,#fbbf24,#f59e0b)", 
                  color: "#1e293b", 
                  border: "none", 
                  cursor: "pointer", 
                  fontWeight: 800,
                  fontSize: 16,
                  boxShadow: "0 10px 30px rgba(251,191,36,0.25)"
                }}>Open Dashboard</button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


