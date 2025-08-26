import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Preloader from "./components/Preloader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Modules = lazy(() => import("./pages/Modules"));
const Blogs = lazy(() => import("./pages/Blogs"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Preloader message="Loading game..." /> }>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="/quiz/:levelNumber"
              element={
                <Protected>
                  <Quiz />
                </Protected>
              }
            />
            <Route
              path="/modules"
              element={
                <Protected>
                  <Modules />
                </Protected>
              }
            />
            <Route
              path="/blogs"
              element={
                <Protected>
                  <Blogs />
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

function Protected({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        background: "#2c2c2c", 
        color: "#e5e5e5" 
      }}>
        Loading...
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

