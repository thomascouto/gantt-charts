import { useState, useCallback } from "react";
import { Gantt, ViewMode } from "gantt-task-react";
import type { Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { getGanttTaskReactData } from "./data";

const VIEW_MODES: { label: string; value: ViewMode }[] = [
  { label: "Hour", value: ViewMode.Hour },
  { label: "Quarter Day", value: ViewMode.QuarterDay },
  { label: "Half Day", value: ViewMode.HalfDay },
  { label: "Day", value: ViewMode.Day },
  { label: "Week", value: ViewMode.Week },
  { label: "Month", value: ViewMode.Month },
];

function CustomTooltip({ task, fontSize, fontFamily }: { task: Task; fontSize: string; fontFamily: string }) {
  const duration = Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24));
  return (
    <div style={{ padding: "12px 16px", fontFamily, fontSize, background: "#1e1e2e", color: "#cdd6f4", borderRadius: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.3)", maxWidth: 280, border: "1px solid #313244" }}>
      <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: 8, color: "#cba6f7" }}>{task.name}</div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", fontSize: "12px" }}>
        <span style={{ color: "#7f849c" }}>Type:</span>
        <span style={{ textTransform: "capitalize" }}>{task.type}</span>
        <span style={{ color: "#7f849c" }}>Start:</span>
        <span>{task.start.toLocaleDateString()}</span>
        <span style={{ color: "#7f849c" }}>End:</span>
        <span>{task.end.toLocaleDateString()}</span>
        <span style={{ color: "#7f849c" }}>Duration:</span>
        <span>{duration} day{duration !== 1 ? "s" : ""}</span>
        <span style={{ color: "#7f849c" }}>Progress:</span>
        <span>{task.progress}%</span>
      </div>
      {task.dependencies && task.dependencies.length > 0 && (
        <div style={{ marginTop: 8, fontSize: "11px", color: "#7f849c" }}>
          Depends on: {task.dependencies.join(", ")}
        </div>
      )}
    </div>
  );
}

export default function GanttTaskReactDemo() {
  const [tasks, setTasks] = useState<Task[]>(getGanttTaskReactData);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week);
  const [showTaskList, setShowTaskList] = useState(true);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 15));
  };

  const handleDateChange = useCallback((task: Task, children: Task[]) => {
    addLog(`Moved: ${task.name} → ${task.start.toLocaleDateString()} - ${task.end.toLocaleDateString()}`);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    return true;
  }, []);

  const handleProgressChange = useCallback((task: Task, children: Task[]) => {
    addLog(`Progress: ${task.name} → ${task.progress}%`);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    return true;
  }, []);

  const handleDelete = useCallback((task: Task) => {
    addLog(`Deleted: ${task.name}`);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    return true;
  }, []);

  const handleExpanderClick = useCallback((task: Task) => {
    addLog(`${task.hideChildren ? "Expanded" : "Collapsed"}: ${task.name}`);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, hideChildren: !t.hideChildren } : t))
    );
  }, []);

  const handleSelect = useCallback((task: Task, isSelected: boolean) => {
    if (isSelected) addLog(`Selected: ${task.name}`);
  }, []);

  const handleDblClick = useCallback((task: Task) => {
    addLog(`Double-clicked: ${task.name}`);
  }, []);

  const columnWidth = viewMode === ViewMode.Month ? 300 : viewMode === ViewMode.Week ? 250 : 65;

  return (
    <div className="demo-container">
      <div className="demo-header">
        <div className="demo-info">
          <h2>gantt-task-react</h2>
          <div className="demo-badges">
            <span className="badge badge-green">MIT License</span>
            <span className="badge badge-blue">1.1k Stars</span>
            <span className="badge badge-purple">SVG Rendering</span>
            <span className="badge badge-orange">React Native</span>
          </div>
          <p className="demo-desc">
            Purpose-built React component with TypeScript. Supports task/project/milestone types,
            drag-and-drop, progress editing, dependency arrows, expandable project groups,
            custom tooltips, and customizable task list.
          </p>
        </div>
        <div className="demo-controls">
          <div className="control-row">
            <label>View Mode</label>
            <div className="btn-group">
              {VIEW_MODES.map(({ label, value }) => (
                <button
                  key={value}
                  className={viewMode === value ? "active" : ""}
                  onClick={() => setViewMode(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="control-row">
            <label>
              <input
                type="checkbox"
                checked={showTaskList}
                onChange={(e) => setShowTaskList(e.target.checked)}
              />
              Show Task List
            </label>
          </div>
        </div>
      </div>

      <div className="gantt-wrapper gantt-task-react-wrapper">
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          onDateChange={handleDateChange}
          onProgressChange={handleProgressChange}
          onDelete={handleDelete}
          onExpanderClick={handleExpanderClick}
          onSelect={handleSelect}
          onDoubleClick={handleDblClick}
          listCellWidth={showTaskList ? "180px" : ""}
          columnWidth={columnWidth}
          ganttHeight={500}
          headerHeight={60}
          rowHeight={44}
          barCornerRadius={4}
          barFill={70}
          fontSize="13px"
          arrowColor="#6366f1"
          arrowIndent={20}
          todayColor="rgba(99, 102, 241, 0.15)"
          TooltipContent={CustomTooltip}
        />
      </div>

      <div className="event-log">
        <h3>Event Log</h3>
        <div className="log-entries">
          {log.length === 0 && <span className="log-empty">Interact with the chart to see events...</span>}
          {log.map((entry, i) => (
            <div key={i} className="log-entry">{entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
