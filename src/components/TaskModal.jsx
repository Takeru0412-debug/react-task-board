import { useState } from "react";

export default function TaskModal({ isOpen, close, addTask }) {
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>新しいタスク</h3>
        <input
          placeholder="タスク名"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            addTask(input);
            setInput("");
            close();
          }}
        >
          追加
        </button>
        <button onClick={close}>閉じる</button>
      </div>
    </div>
  );
}
