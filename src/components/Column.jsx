import TaskCard from "./TaskCard";

export default function Column({ title, tasks, onDelete, onDrop }) {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
        >
          <TaskCard task={task} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
