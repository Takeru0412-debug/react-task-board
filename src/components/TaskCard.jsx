import { Link } from "react-router-dom";

export default function TaskCard({ task, onMove }) {
  return (
    <div className="task-card">
      <Link to={`/task/${task.id}`} className="task-title">
        {task.title}
      </Link>

      <select
        value={task.status}
        onChange={(e) => onMove(task.id, e.target.value)}
      >
        <option value="todo">ToDo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
