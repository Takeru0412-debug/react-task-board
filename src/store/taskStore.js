import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [
    { id: 1, title: "UI設計", progress: 50 },
    { id: 2, title: "React構築", progress: 0 },
  ],

  addTask: (title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title, progress: 0 }],
    })),

  updateProgress: (id, progress) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, progress: Number(progress) } : t
      ),
    })),
}));
