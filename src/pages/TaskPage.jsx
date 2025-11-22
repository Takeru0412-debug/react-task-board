import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import TaskModal from "../components/TaskModal";
import Column from "../components/Column";

export default function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { tasks, addTask, updateStatus, removeTask } = useTaskStore();

  const handleDrop = (status, e) => {
    const id = Number(e.dataTransfer.getData("id"));
    updateStatus(id, status);
  };

  return (
    <div className="container">
      <header>
        <h1>Task Board</h1>
        <button className="add-btn" onClick={() => setModalOpen(true)}>
          ＋ Add Task
        </button>
      </header>

      <div className="board">
        <Column
          title="To Do"
          tasks={tasks.filter((t) => t.status === "todo")}
          onDelete={removeTask}
          onDrop={(e) => handleDrop("todo", e)}
        />

        <Column
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "progress")}
          onDelete={removeTask}
          onDrop={(e) => handleDrop("progress", e)}
        />

        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === "done")}
          onDelete={removeTask}
          onDrop={(e) => handleDrop("done", e)}
        />
      </div>

      {modalOpen && (
        <TaskModal onClose={() => setModalOpen(false)} onSubmit={addTask} />
      )}
    </div>
  );
}
