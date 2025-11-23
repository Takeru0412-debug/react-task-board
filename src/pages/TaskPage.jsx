import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TaskPage({ tasks }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortType, setSortType] = useState('date');

  const params = new URLSearchParams(location.search);
  const filter = params.get('filter');

  const filtered = useMemo(() => {
    if (filter === 'progress') {
      return tasks.filter((t) => t.progress > 0 && t.progress < 100);
    }
    if (filter === 'done') {
      return tasks.filter((t) => t.progress === 100);
    }
    return tasks;
  }, [tasks, filter]);

  const overallProgress = filtered.length
    ? Math.round(
        filtered.reduce((sum, t) => sum + (t.progress || 0), 0) /
          filtered.length
      )
    : 0;

  const sortedTasks = useMemo(() => {
    const cloned = [...filtered];
    switch (sortType) {
      case 'progressAsc':
        return cloned.sort((a, b) => (a.progress || 0) - (b.progress || 0));
      case 'progressDesc':
        return cloned.sort((a, b) => (b.progress || 0) - (a.progress || 0));
      case 'newest':
        return cloned.sort((a, b) => Number(b.id) - Number(a.id));
      case 'date':
      default:
        return cloned.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        });
    }
  }, [filtered, sortType]);

  return (
    <div className="container">
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <h2>全体進捗: {overallProgress}%</h2>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          style={{
            background: '#1f2633',
            color: '#d6e2f0',
            borderRadius: 6,
            border: '1px solid #3a4454',
            padding: '6px 10px',
          }}
        >
          <option value="date">期限が近い順</option>
          <option value="progressAsc">進捗が低い順</option>
          <option value="progressDesc">進捗が高い順</option>
          <option value="newest">新しい順</option>
        </select>
      </div>

      <div className="progress-bg" style={{ marginBottom: 24 }}>
        <div
          className="progress-bar progress-green"
          style={{ '--progress-width': `${overallProgress}%` }}
        />
      </div>

      <div className="grid">
        {sortedTasks.map((task) => {
          const barClass =
            task.progress < 40
              ? 'progress-red'
              : task.progress < 70
              ? 'progress-yellow'
              : 'progress-green';

          return (
            <div
              key={task.id}
              className={`card ${task.progress === 100 ? 'card-completed' : ''}`}
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <h2>{task.title || '（タイトルなし）'}</h2>
              {task.note && <p>備考: {task.note}</p>}
              <p>期限: {task.dueDate || '未設定'}</p>
              <div className="progress-bg">
                <div
                  className={`progress-bar ${barClass}`}
                  style={{ '--progress-width': `${task.progress || 0}%` }}
                />
              </div>
              <p>進捗: {task.progress || 0}%</p>
            </div>
          );
        })}

        {sortedTasks.length === 0 && (
          <p
            style={{
              gridColumn: '1 / -1',
              color: '#b8c6d1',
              marginTop: 8,
            }}
          >
            該当するタスクがありません。
          </p>
        )}
      </div>
    </div>
  );
}
