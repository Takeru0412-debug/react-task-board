import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddTaskPage({ addTask }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [progress, setProgress] = useState(0);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      id: Date.now().toString(),
      title,
      note,
      progress,
      dueDate,
    });
    navigate('/tasks');
  };

  return (
    <div className="form-container">
      <h2>新規タスク追加</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="タスク名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="備考"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
        <label>進捗: {progress}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="button-group">
          <button
            type="button"
            className="btn btn-yellow"
            onClick={() => navigate(-1)}
          >
            戻る
          </button>
          <button type="submit" className="btn btn-green">
            追加
          </button>
        </div>
      </form>
    </div>
  );
}
