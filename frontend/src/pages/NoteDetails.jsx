import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNoteStore } from "../store/useNoteStore.js";
import NoteEditor from "../components/NoteEditor.jsx";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById, updateNote, deleteNote } = useNoteStore();

  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const foundNote = await getNoteById(id);
      setNote(foundNote);
    };
    fetchNote();
  }, [id, getNoteById]);

  const handleSave = async (updatedData) => {
    setIsSaving(true);
    await updateNote(id, updatedData);
    setIsSaving(false);
    setIsEditing(false);
    navigate("/");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(id);
      navigate("/");
    }
  };

  if (!note) return <p className="text-center mt-10">Loading note...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md">
        {!isEditing ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {note.title}
            </h2>
            <p className="text-gray-600 whitespace-pre-wrap mb-6">
              {note.content}
            </p>
            <p className="text-xs text-gray-500 italic mb-6">
              Created:{" "}
              {new Date(note.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>

            <p
              onClick={() => navigate("/")}
              className="text-sm text-gray-600 mt-4 text-center cursor-pointer hover:underline"
            >
              Back to Dashboard
            </p>
          </>
        ) : (
          <NoteEditor note={note} onSave={handleSave} isSaving={isSaving} />
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
