import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              NoteKit
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {authUser ? (
              <div className="flex items-center space-x-4">
                <Link to={"/profile"} className="text-gray-700">
                  Hi, {authUser.fullName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-blue-600"   
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
