import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskDetailPage({ tasks, updateTask, deleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const found = tasks.find((t) => t.id === id);
    if (!found) {
      navigate('/tasks');
      return;
    }
    setTask(found);
  }, [id, tasks, navigate]);

  if (!task) return null;

  const barClass =
    task.progress < 40
      ? 'progress-red'
      : task.progress < 70
      ? 'progress-yellow'
      : 'progress-green';

  const handleSave = () => {
    updateTask(task.id, task);
    navigate('/tasks');
  };

  const handleDelete = () => {
    if (confirm('このタスクを削除しますか？')) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  return (
    <div className="form-container">
      <h2>タスク詳細・編集</h2>

      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <textarea
        rows={3}
        value={task.note || ''}
        onChange={(e) => setTask({ ...task, note: e.target.value })}
      />

      <label>進捗: {task.progress}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={task.progress}
        onChange={(e) =>
          setTask({ ...task, progress: Number(e.target.value) })
        }
      />

      <div className="progress-bg" style={{ marginBottom: 12 }}>
        <div
          className={`progress-bar ${barClass}`}
          style={{ '--progress-width': `${task.progress}%` }}
        />
      </div>

      <input
        type="date"
        value={task.dueDate || ''}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />

      <div className="button-group">
        <button className="btn btn-yellow" onClick={() => navigate(-1)}>
          戻る
        </button>
        <button className="btn btn-green" onClick={handleSave}>
          保存
        </button>
        <button className="btn btn-yellow" onClick={handleDelete}>
          削除
        </button>
      </div>
    </div>
  );
}
