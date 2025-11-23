import { useTaskStore } from "../store/taskStore";

export default function ProgressPage() {
  const { tasks } = useTaskStore();

  const total = tasks.length;
  const todo = tasks.filter(t => t.status === "todo").length;
  const doing = tasks.filter(t => t.status === "doing").length;
  const done = tasks.filter(t => t.status === "done").length;

  const donePercent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="progress-container">
      <h1>📊 進捗状況</h1>

      <div className="progress-box">
        <p>Total Tasks: <strong>{total}</strong></p>
        <p>ToDo: {todo} / Doing: {doing} / Done: {done}</p>

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${donePercent}%` }}
          />
        </div>

        <h2>{donePercent}% 完了！</h2>
      </div>
    </div>
  );
}
