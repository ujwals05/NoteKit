import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteStore } from "../store/useNoteStore.js";
import Loader from "../components/Loader.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { notes, fetchNotes, searchNotes, isLoading, error } = useNoteStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const filteredNotes = searchNotes(searchTerm);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">My Notes</h1>

        <button
          onClick={() => navigate("/add-note")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Note
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {isLoading && (
        <Loader />
      )}

      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {/* Notes Grid */}
      {!isLoading && !error && filteredNotes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              onClick={() => navigate(`/note/${note._id}`)}
              className="bg-white shadow-md p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">
                {note.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {note.content}
              </p>
              <p className="text-xs text-gray-400">
                {note.createdAt
                  ? new Date(note.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !isLoading &&
        !error && (
          <p className="text-center text-gray-500 mt-10">
            No notes found. Try adding one!
          </p>
        )
      )}
    </div>
  );
};

export default Dashboard;
