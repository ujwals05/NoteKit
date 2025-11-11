import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import Loader from "./components/Loader.jsx";
import { Toaster } from "react-hot-toast";

import { Routes, Route, Navigate } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddNote from "./pages/AddNote.jsx";
import NoteDetails from "./pages/NoteDetails.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/NavBar.jsx";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/signup"
            element={authUser ? <Dashboard /> : <SignUpPage />}
          />
          <Route
            path="/signin"
            element={authUser ? <Dashboard /> : <SignInPage />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <NoteDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-note"
            element={
              <ProtectedRoute>
                <AddNote />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }/>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
