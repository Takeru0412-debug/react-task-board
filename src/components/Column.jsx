import TaskCard from "./TaskCard";

export default function Column({ title, tasks, moveTask }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onMove={moveTask} />
      ))}
    </div>
  );
}
