import { useState, lazy, Suspense } from "react";
import "./App.css";

const FrappeGanttDemo = lazy(() => import("./demos/FrappeGanttDemo"));
const GanttTaskReactDemo = lazy(() => import("./demos/GanttTaskReactDemo"));
const DhtmlxGanttDemo = lazy(() => import("./demos/DhtmlxGanttDemo"));

const TABS = [
  { id: "frappe", label: "Frappe Gantt", color: "#6366f1" },
  { id: "gantt-task-react", label: "gantt-task-react", color: "#ec4899" },
  { id: "dhtmlx", label: "DHTMLX Gantt", color: "#f59e0b" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("frappe");

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gantt Chart Libraries Comparison</h1>
        <p className="app-subtitle">
          Interactive demos of 3 open source Gantt chart libraries — same project data, different capabilities
        </p>
      </header>

      <nav className="tab-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            style={{ "--tab-color": tab.color } as React.CSSProperties}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        <Suspense fallback={<div className="loading">Loading demo...</div>}>
          {activeTab === "frappe" && <FrappeGanttDemo />}
          {activeTab === "gantt-task-react" && <GanttTaskReactDemo />}
          {activeTab === "dhtmlx" && <DhtmlxGanttDemo />}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
