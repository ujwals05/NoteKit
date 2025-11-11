import { create } from "zustand";
import { apiInstance } from "../api/axios.js";

export const useNoteStore = create((set, get) => ({
  notes: [],
  isLoading: false,
  error: null,

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiInstance.get("/notes");
      set({ notes: res.data.notes || [], isLoading: false });
    } catch (err) {
      console.error("Error fetching notes:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch notes",
        isLoading: false,
      });
    }
  },

  getNoteById: async (id) => {
    const existingNote = get().notes.find((note) => note._id === id);
    if (existingNote) return existingNote;

    try {
      const res = await apiInstance.get(`/notes/${id}`);
      return res.data.note;
    } catch (err) {
      console.error("Error fetching note:", err);
      set({ error: "Failed to fetch note" });
      return null;
    }
  },

  addNote: async (noteData) => {
    set({ isAddingNote: true });
    try {
      const res = await apiInstance.post("/notes", noteData);
      set((state) => ({
        notes: [res.data, ...state.notes],
      }));
    } catch (err) {
      console.error("Error adding note:", err);
      throw err;
    } finally {
      set({ isAddingNote: false });
    }
  },

  updateNote: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiInstance.put(`/notes/${id}`, updatedData);
      const updatedNote = res.data.note;
      const updatedNotes = get().notes.map((note) =>
        note._id === id ? updatedNote : note
      );
      set({ notes: updatedNotes, isLoading: false });
    } catch (err) {
      console.error("Error updating note:", err);
      set({
        error: err.response?.data?.message || "Failed to update note",
        isLoading: false,
      });
    }
  },

  deleteNote: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiInstance.delete(`/notes/${id}`);
      const filteredNotes = get().notes.filter((note) => note._id !== id);
      set({ notes: filteredNotes, isLoading: false });
    } catch (err) {
      console.error("Error deleting note:", err);
      set({
        error: err.response?.data?.message || "Failed to delete note",
        isLoading: false,
      });
    }
  },

  searchNotes: (query) => {
    const allNotes = get().notes;
    if (!query) return allNotes;

    const lowerQuery = query.toLowerCase();
    return allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.date?.toLowerCase().includes(lowerQuery)
    );
  },

  clearNotes: () => set({ notes: [] }),
}));
