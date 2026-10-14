import { CheckCircle2, ListTodo, Target } from "lucide-react";
import Card from "./Card.jsx";

export default function TaskStats({ total, completed, remaining }) {
  const stats = [
    { label: "Total tasks", value: total, icon: ListTodo, tone: "purple" },
    { label: "Completed", value: completed, icon: CheckCircle2, tone: "green" },
    { label: "Remaining", value: remaining, icon: Target, tone: "orange" },
  ];

  return (
    <div className="stats-grid">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <Card className="stat-card" key={label}>
          <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
          <div className="stat-copy">
            <span className="stat-label">{label}</span>
            <strong className="stat-value">{value}</strong>
          </div>
        </Card>
      ))}
    </div>
  );
}
