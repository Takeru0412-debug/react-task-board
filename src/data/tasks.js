const STORAGE_KEY = 'myTasks';

export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function initTasks() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    saveTasks([
      { id: '1', title: 'タスクA', progress: 20, dueDate: '2025-12-01' },
      { id: '2', title: 'タスクB', progress: 50, dueDate: null },
      { id: '3', title: 'タスクC', progress: 75, dueDate: '2025-12-10' },
    ]);
  }
}
