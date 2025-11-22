import { useState } from "react";

export default function TaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add Task</h3>

        <input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Details..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
          <button
            className="submit"
            onClick={() => {
              onSubmit({ title, description: desc, status: "todo" });
              onClose();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
