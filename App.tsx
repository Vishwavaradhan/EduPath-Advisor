import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/Layout/Header";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import Colleges from "./pages/Colleges";
import Timeline from "./pages/Timeline";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";

// ✅ Import i18n initialization (this runs once globally)
import "./i18n";

// ✅ Wrapper that waits for Firebase Auth & checks Firestore profile
const ProfileProtected = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setHasProfile(false);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists() && snap.data().city) {
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      } catch (err) {
        console.error("Error checking profile:", err);
        setHasProfile(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Checking profile...</p>;
  }

  return hasProfile ? children : <Navigate to="/profile" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* ✅ Suspense ensures translations load before rendering */}
        <Suspense fallback={<div className="text-center mt-8">Loading translations...</div>}>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ProfileProtected>
                      <Dashboard />
                    </ProfileProtected>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz"
                element={
                  <ProtectedRoute>
                    <ProfileProtected>
                      <Quiz />
                    </ProfileProtected>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz/results"
                element={
                  <ProtectedRoute>
                    <ProfileProtected>
                      <QuizResults />
                    </ProfileProtected>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/colleges"
                element={
                  <ProtectedRoute>
                    <ProfileProtected>
                      <Colleges />
                    </ProfileProtected>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/timeline"
                element={
                  <ProtectedRoute>
                    <ProfileProtected>
                      <Timeline />
                    </ProfileProtected>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resources"
                element={
                  <ProtectedRoute>
                    <ProfileProtected>
                      <Resources />
                    </ProfileProtected>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
