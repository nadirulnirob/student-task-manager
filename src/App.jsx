import { useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarDays, Sparkles } from "lucide-react";
import Card from "./components/Card.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskStats from "./components/TaskStats.jsx";

const STORAGE_KEY = "student-task-manager-tasks";

function readSavedTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(readSavedTasks);
  const [filter, setFilter] = useState("all");
  const [storageWarning, setStorageWarning] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageWarning("");
    } catch {
      setStorageWarning("Your browser could not save changes. Tasks may disappear after refresh.");
    }
  }, [tasks]);

  function addTask(title) {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      completed: false,
    };
    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setFilter("all");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  const visibleTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((task) => task.completed);
    if (filter === "pending") return tasks.filter((task) => !task.completed);
    return tasks;
  }, [tasks, filter]);

  const filters = [
    { id: "all", label: "All tasks", count: tasks.length },
    { id: "pending", label: "Pending", count: remainingCount },
    { id: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Student Task Manager home">
          <span className="brand-mark"><BookOpen size={21} /></span>
          <span>study<span className="brand-accent">flow</span></span>
        </a>
        <span className="topbar-label"><CalendarDays size={15} /> Your personal study planner</span>
      </header>

      <div className="content">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14} /> SMALL STEPS, BIG PROGRESS</span>
            <h1>Make room for<br /><span>what matters.</span></h1>
            <p>Organize your study tasks, stay focused, and celebrate every little win.</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-circle circle-one"></div>
            <div className="art-circle circle-two"></div>
            <div className="art-note note-back"><span></span><span></span><span></span></div>
            <div className="art-note note-front">
              <div className="note-heading"><span></span><span></span></div>
              <div className="note-line"><i>✓</i><span></span></div>
              <div className="note-line"><i>✓</i><span></span></div>
              <div className="note-line"><i></i><span></span></div>
              <div className="note-line"><i></i><span></span></div>
            </div>
            <div className="art-spark spark-one">✦</div>
            <div className="art-spark spark-two">✧</div>
          </div>
        </section>

        <TaskStats total={tasks.length} completed={completedCount} remaining={remainingCount} />

        <section className="workspace">
          <Card className="add-card">
            <div className="section-heading">
              <div>
                <span className="section-kicker">GET STARTED</span>
                <h2>Add a new task</h2>
              </div>
              <span className="heading-dot"></span>
            </div>
            <TaskForm onAddTask={addTask} />
          </Card>

          <Card className="list-card">
            <div className="list-header">
              <div>
                <span className="section-kicker">YOUR PLAN</span>
                <h2>My tasks <span className="task-count">{tasks.length}</span></h2>
              </div>
              <div className="filter-tabs" role="group" aria-label="Filter tasks">
                {filters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`filter-tab ${filter === item.id ? "active" : ""}`}
                    onClick={() => setFilter(item.id)}
                    aria-pressed={filter === item.id}
                  >
                    {item.label}
                    <span>{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {storageWarning && <p className="storage-warning" role="status">{storageWarning}</p>}

            <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />

            {tasks.length > 0 && (
              <div className="list-footer">
                <span><span className="footer-dot"></span> Keep going, you're doing great.</span>
                <span>{completedCount} of {tasks.length} completed</span>
              </div>
            )}
          </Card>
        </section>

        <footer className="footer">
          <span>Made for your next little win <span className="heart">♥</span></span>
          <span>STUDENT TASK MANAGER · REACT</span>
        </footer>
      </div>
    </main>
  );
}
