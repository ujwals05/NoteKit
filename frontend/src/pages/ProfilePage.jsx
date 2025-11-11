import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  if (!authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Profile Details
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-lg font-medium text-gray-800">
              {authUser.username || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-medium text-gray-800">
              {authUser.fullName || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">
              {authUser.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-lg font-medium text-gray-800">
              {authUser.createdAt
                ? new Date(authUser.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
