import { useState } from "react";
import { Plus } from "lucide-react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Please enter a task before adding it.");
      return;
    }

    onAddTask(cleanTitle);
    setTitle("");
    setError("");
  }

  function handleChange(event) {
    setTitle(event.target.value);
    if (error) setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="input-wrap">
        <label className="sr-only" htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="e.g. Review React components"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-error" : undefined}
          maxLength={120}
        />
      </div>
      <button className="button button-primary add-button" type="submit">
        <Plus size={18} aria-hidden="true" />
        <span>Add task</span>
      </button>
      {error && <p className="form-error" id="task-error" role="alert">{error}</p>}
    </form>
  );
}
