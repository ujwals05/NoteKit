import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteStore } from "../store/useNoteStore.js";

const AddNote = () => {
  const navigate = useNavigate();
  const { addNote, isAddingNote } = useNoteStore();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Title and content are required.");
      return;
    }

    setError("");

    try {
      await addNote({
        title: formData.title,
        content: formData.content,
        isPinned: formData.isPinned,
      });

      navigate("/"); 
    } catch (err) {
      console.error("Error adding note:", err);
      setError("Failed to add note. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create a New Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter note title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              placeholder="Write your note here..."
              rows="6"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPinned"
              checked={formData.isPinned}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">Pin this note</label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isAddingNote}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {isAddingNote ? "Adding Note..." : "Add Note"}
          </button>
        </form>

        <p
          className="text-center text-sm text-gray-600 mt-4 hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </p>
      </div>
    </div>
  );
};

export default AddNote;
