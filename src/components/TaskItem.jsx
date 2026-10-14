import { Check, Clock3, Trash2 } from "lucide-react";

export default function TaskItem({ task, onToggle, onDelete }) {
  function handleDelete() {
    const confirmed = window.confirm(`Delete "${task.title}"?`);
    if (confirmed) onDelete(task.id);
  }

  return (
    <li className={`task-item ${task.completed ? "is-completed" : ""}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? "pending" : "completed"}`}
        />
        <span className="custom-check" aria-hidden="true">
          {task.completed && <Check size={14} strokeWidth={3} />}
        </span>
      </label>

      <div className="task-copy">
        <p className="task-title">{task.title}</p>
        <span className={`status ${task.completed ? "status-done" : "status-pending"}`}>
          {task.completed ? <Check size={12} /> : <Clock3 size={12} />}
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <button
        type="button"
        className="icon-button delete-button"
        onClick={handleDelete}
        aria-label={`Delete "${task.title}"`}
        title="Delete task"
      >
        <Trash2 size={17} />
      </button>
    </li>
  );
}
