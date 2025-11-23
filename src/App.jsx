import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';

import TaskPage from './pages/TaskPage.jsx';
import AddTaskPage from './pages/AddTaskPage.jsx';
import TaskDetailPage from './pages/TaskDetailPage.jsx';
import GanttPage from './pages/GanttPage.jsx';

import './App.css';

const STORAGE_KEY = 'tasks_steam_ui_v1';

function loadInitialTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [];
}

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(loadInitialTasks());
  }, []);

  const updateAll = (next) => {
    setTasks(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addTask = (task) => updateAll([...tasks, task]);

  const updateTask = (id, partial) =>
    updateAll(tasks.map((t) => (t.id === id ? { ...t, ...partial } : t)));

  const deleteTask = (id) =>
    updateAll(tasks.filter((t) => t.id !== id));

  return (
    <Router>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<TaskPage tasks={tasks} />} />
            <Route path="/add" element={<AddTaskPage addTask={addTask} />} />
            <Route
              path="/tasks/:id"
              element={
                <TaskDetailPage
                  tasks={tasks}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              }
            />
            <Route path="/gantt" element={<GanttPage tasks={tasks} />} />
            <Route path="*" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
