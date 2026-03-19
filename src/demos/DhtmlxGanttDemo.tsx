import { useEffect, useRef, useState, useCallback } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { getDhtmlxGanttData } from "./data";

type ScalePreset = "day" | "week" | "month" | "quarter";

function applyScale(preset: ScalePreset) {
  switch (preset) {
    case "day":
      gantt.config.scales = [
        { unit: "month", step: 1, format: "%F %Y" },
        { unit: "day", step: 1, format: "%d %D" },
      ];
      break;
    case "week":
      gantt.config.scales = [
        { unit: "month", step: 1, format: "%F %Y" },
        { unit: "week", step: 1, format: "Week %W" },
      ];
      break;
    case "month":
      gantt.config.scales = [
        { unit: "year", step: 1, format: "%Y" },
        { unit: "month", step: 1, format: "%M" },
      ];
      break;
    case "quarter":
      gantt.config.scales = [
        { unit: "year", step: 1, format: "%Y" },
        { unit: "quarter", step: 1, format: "Q%q" },
      ];
      break;
  }
}

export default function DhtmlxGanttDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<ScalePreset>("week");
  const [log, setLog] = useState<string[]>([]);
  const initialized = useRef(false);

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 15));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset for re-init
    gantt.clearAll();

    // Config
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.row_height = 36;
    gantt.config.bar_height = 24;
    gantt.config.grid_width = 400;
    gantt.config.show_progress = true;
    gantt.config.drag_move = true;
    gantt.config.drag_resize = true;
    gantt.config.drag_progress = true;
    gantt.config.drag_links = true;
    gantt.config.details_on_dblclick = true;
    gantt.config.sort = true;
    gantt.config.multiselect = true;
    gantt.config.open_tree_initially = true;
    gantt.config.autosize = "y";
    gantt.config.fit_tasks = true;

    // Columns
    gantt.config.columns = [
      { name: "text", label: "Task Name", tree: true, width: 180, resize: true },
      { name: "start_date", label: "Start", align: "center", width: 80 },
      { name: "duration", label: "Days", align: "center", width: 50 },
      {
        name: "progress",
        label: "Progress",
        align: "center",
        width: 70,
        template: (task: any) => `${Math.round((task.progress || 0) * 100)}%`,
      },
      { name: "add", label: "", width: 30 },
    ];

    // Scale
    applyScale(scale);

    // Templates
    gantt.templates.task_class = (_start: any, _end: any, task: any) => {
      if (task.type === "milestone") return "milestone-task";
      if (task.type === "project") return "project-task";
      const progress = task.progress || 0;
      if (progress >= 1) return "completed-task";
      if (progress >= 0.5) return "in-progress-task";
      return "";
    };

    gantt.templates.rightside_text = (_start: any, _end: any, task: any) => {
      if (task.type === "milestone") return "";
      return `<span style="font-size: 11px; color: #888;">${Math.round((task.progress || 0) * 100)}%</span>`;
    };

    gantt.templates.tooltip_text = (_start: any, _end: any, task: any) => {
      return `
        <div style="padding: 8px 12px; max-width: 250px;">
          <div style="font-weight: 700; margin-bottom: 6px; font-size: 14px;">${task.text}</div>
          <div style="font-size: 12px; line-height: 1.8;">
            <div><b>Start:</b> ${gantt.templates.tooltip_date_format(task.start_date)}</div>
            <div><b>End:</b> ${gantt.templates.tooltip_date_format(task.end_date)}</div>
            <div><b>Duration:</b> ${task.duration} days</div>
            <div><b>Progress:</b> ${Math.round((task.progress || 0) * 100)}%</div>
          </div>
        </div>
      `;
    };

    // Today marker
    gantt.plugins({ marker: true, tooltip: true, multiselect: true, undo: true });

    const todayId = gantt.addMarker({
      start_date: new Date(),
      css: "today-marker",
      text: "Today",
      title: new Date().toLocaleDateString(),
    });

    // Event handlers
    if (!initialized.current) {
      gantt.attachEvent("onTaskClick", (id: any) => {
        const task = gantt.getTask(id);
        addLog(`Clicked: ${task.text}`);
        return true;
      });

      gantt.attachEvent("onAfterTaskDrag", (id: any) => {
        const task = gantt.getTask(id);
        addLog(`Moved: ${task.text} → ${task.start_date?.toLocaleDateString()} (${task.duration}d)`);
      });

      gantt.attachEvent("onAfterTaskAdd", (_id: any, task: any) => {
        addLog(`Added: ${task.text}`);
      });

      gantt.attachEvent("onAfterTaskDelete", (_id: any, task: any) => {
        addLog(`Deleted: ${task.text}`);
      });

      gantt.attachEvent("onAfterLinkAdd", (_id: any, link: any) => {
        addLog(`Link added: ${link.source} → ${link.target}`);
      });

      initialized.current = true;
    }

    // Init
    gantt.init(containerRef.current);

    // Parse data
    const data = getDhtmlxGanttData();
    gantt.parse(data);

    return () => {
      if (todayId) gantt.deleteMarker(todayId);
    };
  }, [scale, addLog]);

  const handleScaleChange = (preset: ScalePreset) => {
    setScale(preset);
  };

  const handleUndo = () => {
    gantt.undo();
    addLog("Undo performed");
  };

  const handleRedo = () => {
    gantt.redo();
    addLog("Redo performed");
  };

  const handleExpandAll = () => {
    gantt.eachTask((task: any) => {
      task.$open = true;
    });
    gantt.render();
    addLog("Expanded all tasks");
  };

  const handleCollapseAll = () => {
    gantt.eachTask((task: any) => {
      task.$open = false;
    });
    gantt.render();
    addLog("Collapsed all tasks");
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <div className="demo-info">
          <h2>DHTMLX Gantt</h2>
          <div className="demo-badges">
            <span className="badge badge-yellow">GPL v2</span>
            <span className="badge badge-blue">1.8k Stars</span>
            <span className="badge badge-purple">HTML Rendering</span>
            <span className="badge badge-orange">Most Mature</span>
          </div>
          <p className="demo-desc">
            The most feature-rich open source Gantt. Supports task hierarchy, 4 link types,
            drag-and-drop everything, inline editing, lightbox forms, today marker, undo/redo,
            multiselect, tooltips, sorting, and 120+ events. PRO adds critical path,
            auto-scheduling, resource management, baselines, and export.
          </p>
        </div>
        <div className="demo-controls">
          <div className="control-row">
            <label>Time Scale</label>
            <div className="btn-group">
              {(["day", "week", "month", "quarter"] as ScalePreset[]).map((s) => (
                <button
                  key={s}
                  className={scale === s ? "active" : ""}
                  onClick={() => handleScaleChange(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="control-row">
            <div className="btn-group">
              <button onClick={handleUndo}>Undo</button>
              <button onClick={handleRedo}>Redo</button>
              <button onClick={handleExpandAll}>Expand All</button>
              <button onClick={handleCollapseAll}>Collapse All</button>
            </div>
          </div>
        </div>
      </div>

      <div className="gantt-wrapper dhtmlx-gantt-wrapper" ref={containerRef} style={{ height: 560 }} />

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
