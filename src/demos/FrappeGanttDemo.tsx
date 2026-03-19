import { useEffect, useRef, useState } from "react";
import Gantt from "frappe-gantt";
import "../../node_modules/frappe-gantt/dist/frappe-gantt.css";
import { frappeGanttTasks } from "./data";

const VIEW_MODES = ["Hour", "Quarter Day", "Half Day", "Day", "Week", "Month", "Year"] as const;

export default function FrappeGanttDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ganttRef = useRef<InstanceType<typeof Gantt> | null>(null);
  const [viewMode, setViewMode] = useState<string>("Week");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 15));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous instance safely
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const wrapper = document.createElement("div");
    containerRef.current.appendChild(wrapper);

    ganttRef.current = new Gantt(wrapper, frappeGanttTasks as any, {
      view_mode: viewMode as any,
      bar_height: 28,
      bar_corner_radius: 4,
      padding: 20,
      view_mode_select: false,
      today_button: true,
      move_dependencies: true,
      show_expected_progress: true,
      lines: "both",
      popup_on: "click",
      holidays: {
        "rgba(99, 102, 241, 0.08)": "weekend",
      },
      scroll_to: "2026-03-15",
      on_click: (task: any) => {
        addLog(`Clicked: ${task.name} (${task.progress}% complete)`);
      },
      on_date_change: (task: any, start: Date, end: Date) => {
        addLog(`Moved: ${task.name} → ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`);
      },
      on_progress_change: (task: any, progress: number) => {
        addLog(`Progress: ${task.name} → ${Math.round(progress)}%`);
      },
      on_view_change: (mode: any) => {
        addLog(`View changed to: ${mode}`);
      },
    } as any);

    return () => {
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, [viewMode]);

  return (
    <div className="demo-container">
      <div className="demo-header">
        <div className="demo-info">
          <h2>Frappe Gantt</h2>
          <div className="demo-badges">
            <span className="badge badge-green">MIT License</span>
            <span className="badge badge-blue">5.9k Stars</span>
            <span className="badge badge-purple">SVG Rendering</span>
            <span className="badge badge-gray">Zero Dependencies</span>
          </div>
          <p className="demo-desc">
            Lightweight SVG-based Gantt chart. Supports drag-and-drop scheduling, progress tracking,
            dependency arrows, custom popups, holiday exclusion, and multiple view modes.
          </p>
        </div>
        <div className="demo-controls">
          <label>View Mode</label>
          <div className="btn-group">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode}
                className={viewMode === mode ? "active" : ""}
                onClick={() => setViewMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gantt-wrapper" ref={containerRef} />

      <div className="event-log">
        <h3>Event Log</h3>
        <div className="log-entries">
          {log.length === 0 && <span className="log-empty">Click, drag, or resize tasks to see events...</span>}
          {log.map((entry, i) => (
            <div key={i} className="log-entry">{entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
