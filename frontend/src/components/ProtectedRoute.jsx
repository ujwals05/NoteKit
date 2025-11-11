import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import Loader from "./Loader.jsx";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <Loader />;

  return authUser ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
