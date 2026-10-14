import { ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!Array.isArray(tasks)) {
    return (
      <div className="empty-state" role="alert">
        <div className="empty-icon"><ClipboardList size={25} /></div>
        <h3>We couldn't load your tasks</h3>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><ClipboardList size={25} /></div>
        <h3>No tasks available</h3>
        <p>Add your first task above and make today count.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
