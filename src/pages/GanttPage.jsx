import { useNavigate } from 'react-router-dom';

export default function GanttPage({ tasks }) {
  const navigate = useNavigate();

  const processed = tasks
    .filter((t) => t.dueDate)
    .map((t) => {
      const start = new Date(Number(t.id)); // 追加時のDate.now()を開始とみなす
      const end = new Date(t.dueDate);
      return { ...t, start, end };
    })
    .filter((t) => !isNaN(t.start) && !isNaN(t.end));

  const minDate = processed.length
    ? Math.min(...processed.map((t) => t.start.getTime()))
    : Date.now();

  const maxDate = processed.length
    ? Math.max(...processed.map((t) => t.end.getTime()))
    : Date.now();

  const totalDays = Math.max(
    1,
    Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="gantt-container">
      <h2>ガントチャート</h2>

      {processed.length === 0 && (
        <p style={{ marginTop: 20 }}>期限付きタスクがありません。</p>
      )}

      {processed.length > 0 && (
        <div className="gantt-chart">
          <div className="gantt-header">
            {[...Array(totalDays)].map((_, i) => (
              <div key={i} className="gantt-day">
                {i % 7 === 0 ? `${i}日` : ''}
              </div>
            ))}
          </div>

          <div className="gantt-body">
            {processed.map((t) => {
              const startOffset = Math.floor(
                (t.start.getTime() - minDate) / (1000 * 60 * 60 * 24)
              );
              const duration = Math.max(
                1,
                Math.floor(
                  (t.end.getTime() - t.start.getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              );

              const barClass =
                t.progress < 40
                  ? 'gantt-red'
                  : t.progress < 70
                  ? 'gantt-yellow'
                  : 'gantt-green';

              return (
                <div className="gantt-row" key={t.id}>
                  <div className="gantt-label">{t.title}</div>
                  <div className="gantt-bar-wrapper">
                    <div
                      className={`gantt-bar ${barClass}`}
                      style={{
                        marginLeft: `${startOffset * 40}px`,
                        width: `${duration * 40}px`,
                      }}
                      onClick={() => navigate(`/tasks/${t.id}`)}
                    >
                      <span className="gantt-progress-text">
                        {t.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
