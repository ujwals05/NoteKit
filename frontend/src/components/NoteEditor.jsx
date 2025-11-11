import React, { useState } from "react";

const NoteEditor = ({ note, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    title: note?.title || "",
    content: note?.content || "",
    isPinned: note?.isPinned || false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError("Title and content are required.");
      return;
    }
    setError("");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default NoteEditor;
