import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { fetchBlogs, createBlog, voteBlog } from "../api";

export default function Blogs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    setError("");
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedUrl = url.trim();

    if (!trimmedTitle || (!trimmedContent && !trimmedUrl)) {
      setError("Please provide a title and content or a link.");
      return;
    }

    try {
      setBusy(true);
      await createBlog({ title: trimmedTitle, content: trimmedContent, url: trimmedUrl });
      setTitle("");
      setContent("");
      setUrl("");
      setShowForm(false);
      await load();
    } catch (e) {
      setError("Failed to create post. Make sure you are logged in.");
    } finally {
      setBusy(false);
    }
  };

  const handleVote = async (postId, delta) => {
    try {
      await voteBlog(postId, delta);
      await load();
    } catch (e) {
      // no-op
    }
  };

  const sortedPosts = useMemo(() => {
    let list = [...posts];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(p => p.title?.toLowerCase().includes(q) || p.content?.toLowerCase().includes(q) || p.authorName?.toLowerCase().includes(q));
    }
    if (sortBy === "new") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      list.sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || (new Date(b.createdAt) - new Date(a.createdAt)));
    }
    return list;
  }, [posts, query, sortBy]);

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
        marginBottom: 20,
        maxWidth: "1200px",
        margin: "0 auto 20px auto",
        padding: "0 20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <h1 style={{ 
              fontSize: 38, 
              fontWeight: 800, 
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0
            }}>
              Community Blogs & Articles
            </h1>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "6px 0 0 0", fontWeight: 500 }}>
              Read posts below. Click "Write a Blog" to submit yours.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="card" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              style={{
                background: "transparent",
                border: "none",
                color: "#e5e5e5",
                outline: "none",
                width: 180,
                fontSize: 14
              }}
              aria-label="Search posts"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#e5e5e5",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "6px 8px",
                fontSize: 13
              }}
              aria-label="Sort posts"
            >
              <option value="top">Top</option>
              <option value="new">New</option>
            </select>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              padding: "12px 20px",
              borderRadius: 14,
              background: showForm ? "linear-gradient(135deg, #6b7280, #4b5563)" : "linear-gradient(135deg, #fbbf24, #f59e0b)",
              color: showForm ? "#ffffff" : "#1e293b",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14
            }}
          >
            {showForm ? "Close" : "✍️ Write a Blog"}
          </button>
          <button
            onClick={() => navigate("/app")}
            style={{
              padding: "12px 20px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #374151, #4b5563)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14
            }}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Add form (hidden by default) */}
      {showForm && (
        <div className="card" style={{ maxWidth: 900, margin: "0 auto 24px auto", padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              disabled={busy}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(15,23,42,0.6)",
                color: "#e5e5e5",
                outline: "none"
              }}
            />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Link (optional)"
              disabled={busy}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(15,23,42,0.6)",
                color: "#e5e5e5",
                outline: "none"
              }}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a short summary or paste your article content"
              rows={4}
              disabled={busy}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(15,23,42,0.6)",
                color: "#e5e5e5",
                outline: "none",
                resize: "vertical"
              }}
            />
          </div>
          {error && (
            <div style={{ color: "#f87171", fontSize: 14, marginTop: 10 }}>{error}</div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <button
              onClick={handleAdd}
              disabled={busy}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                color: "#1e293b",
                border: "none",
                cursor: busy ? "not-allowed" : "pointer",
                fontWeight: 700,
                fontSize: 15,
                opacity: busy ? 0.7 : 1
              }}
            >
              ➕ Publish Post
            </button>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 40 }}>
        {loading ? (
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: 24,
            borderRadius: 16,
            color: "#94a3b8",
            textAlign: "center"
          }}>
            Loading posts...
          </div>
        ) : sortedPosts.length === 0 ? (
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: 24,
            borderRadius: 16,
            color: "#94a3b8",
            textAlign: "center"
          }}>
            No posts yet. Click "Write a Blog" to add one.
          </div>
        ) : (
          sortedPosts.map((p) => {
            return (
              <div key={p._id} className="card" style={{
                padding: 20,
                borderRadius: 16,
                display: "grid",
                gridTemplateColumns: "56px 1fr",
                gap: 16
              }}>
                {/* Votes */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => handleVote(p._id, 1)}
                    title="Upvote"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(15,23,42,0.5)",
                      color: "#e5e5e5",
                      cursor: "pointer",
                      fontSize: 18
                    }}
                  >
                    ▲
                  </button>
                  <div style={{ fontWeight: 800, color: (p.score ?? 0) >= 0 ? "#10b981" : "#ef4444" }}>{p.score ?? 0}</div>
                  <button
                    onClick={() => handleVote(p._id, -1)}
                    title="Downvote"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(15,23,42,0.5)",
                      color: "#e5e5e5",
                      cursor: "pointer",
                      fontSize: 18
                    }}
                  >
                    ▼
                  </button>
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 20, color: "#fbbf24" }}>{p.title}</h3>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(p.createdAt).toLocaleString()}</div>
                  </div>
                  <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>by {p.authorName}</div>
                  {p.url && (
                    <div style={{ marginTop: 8 }}>
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", textDecoration: "underline" }}>
                        {p.url}
                      </a>
                    </div>
                  )}
                  {p.content && (
                    <p style={{ marginTop: 10, color: "#e5e5e5", lineHeight: 1.6, whiteSpace: "pre-line" }}>{p.content}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
