# Gantt Chart Libraries Comparison

Evaluation of 3 open source Gantt chart libraries for React, tested with a realistic software development project (30+ tasks, 5 phases, complex dependencies).

> **Note:** SVAR React Gantt (`wx-react-gantt`) was also evaluated but excluded because it is **incompatible with React 19** (crashes on `ReactCurrentDispatcher` — requires React 18).

---

## Libraries Tested

| | Frappe Gantt | gantt-task-react | DHTMLX Gantt |
|---|---|---|---|
| **npm** | `frappe-gantt` | `gantt-task-react` | `dhtmlx-gantt` |
| **Version** | 1.2.2 | 0.3.9 | 9.1.3 |
| **License** | MIT | MIT | GPL v2 (PRO available) |
| **GitHub Stars** | ~5,900 | ~1,100 | ~1,800 |
| **Last Release** | Feb 2025 | Jul 2022 | Mar 2026 |
| **Rendering** | SVG | SVG | HTML/DOM |
| **React Support** | Vanilla JS (wrapper needed) | Native React component | Vanilla JS (wrapper needed) |
| **TypeScript** | No `.d.ts` included | Full TypeScript support | Full `.d.ts` (7,200+ lines) |
| **Bundle Size** | ~45 KB (zero deps) | ~50 KB | ~800 KB |
| **Active Maintenance** | Yes | No (stalled since 2022) | Yes (very active) |

---

## Feature Comparison

### Core Features

| Feature | Frappe Gantt | gantt-task-react | DHTMLX Gantt |
|---|:---:|:---:|:---:|
| Task bars with progress | Yes | Yes | Yes |
| Task hierarchy (parent/child) | No | Yes (project type) | Yes (full tree) |
| Task dependencies (arrows) | Yes | Yes | Yes |
| Dependency types | End-to-Start only | End-to-Start only | All 4 (FS, SS, FF, SF) |
| Milestones | No (manual via CSS) | Yes (native type) | Yes (native type) |
| Project/Summary tasks | No | Yes | Yes |
| Drag & drop (move tasks) | Yes | Yes | Yes |
| Drag & drop (resize tasks) | Yes | Yes | Yes |
| Drag & drop (progress bar) | Yes | Yes | Yes |
| Drag & drop (create links) | No | No | Yes |
| Move dependent tasks on drag | Yes | No | No (PRO: auto-scheduling) |

### View & Scale

| Feature | Frappe Gantt | gantt-task-react | DHTMLX Gantt |
|---|:---:|:---:|:---:|
| Hour view | Yes | Yes | Yes |
| Day view | Yes | Yes | Yes |
| Week view | Yes | Yes | Yes |
| Month view | Yes | Yes | Yes |
| Quarter view | No | No | Yes |
| Year view | Yes | Yes | Yes |
| Multi-level scale headers | Yes (upper + lower) | Yes (upper + lower) | Yes (unlimited levels) |
| Custom scale formats | Yes | Limited | Yes (full control) |
| Zoom controls | No | No | Manual (via config) |

### Grid / Task List

| Feature | Frappe Gantt | gantt-task-react | DHTMLX Gantt |
|---|:---:|:---:|:---:|
| Side panel with task list | No | Yes (basic) | Yes (full grid) |
| Configurable columns | N/A | Custom via React component | Yes (name, width, template, editor) |
| Column sorting | N/A | No | Yes |
| Column resizing | N/A | No | Yes (PRO) |
| Column hiding | N/A | No | Yes (PRO) |
| Inline editing | N/A | No | Yes (text, number, date, select) |
| Tree expand/collapse | N/A | Yes | Yes |
| Custom cell templates | N/A | Yes (custom React component) | Yes (template functions) |

### Editing & Interaction

| Feature | Frappe Gantt | gantt-task-react | DHTMLX Gantt |
|---|:---:|:---:|:---:|
| Click handler | Yes | Yes | Yes |
| Double-click handler | Yes | Yes | Yes (opens lightbox) |
| Hover handler | Yes | No | Yes |
| Custom popup/tooltip | Yes (popup function) | Yes (custom React component) | Yes (tooltip template) |
| Edit form (lightbox) | No | No | Yes (built-in modal) |
| Task deletion | No | Yes (via keyboard) | Yes (lightbox + API) |
| Task creation | No | No | Yes (+ button + API) |
| Undo/Redo | No | No | Yes |
| Multi-select | No | No | Yes |
| Keyboard navigation | No | No | Yes |
| Context menu | No | No | Via extension |

### Visual Customization

| Feature | Frappe Gantt | gantt-task-react | DHTMLX Gantt |
|---|:---:|:---:|:---:|
| Per-task colors | Yes (`color` prop) | Yes (`styles` prop) | Yes (`color` prop) |
| Custom CSS classes | Yes (`custom_class`) | No | Yes (template functions) |
| Bar height control | Yes | Yes | Yes |
| Row height control | Yes | Yes | Yes |
| Grid lines control | Yes (none/v/h/both) | No | Yes |
| Weekend/holiday highlighting | Yes | No | Yes |
| Today marker | No (scroll-to only) | Yes (line) | Yes (marker plugin) |
| Expected progress indicator | Yes | No | No |
| Right-side labels | No | No | Yes (template) |
| Left-side labels | No | No | Yes (template) |
| RTL support | No | Yes | Yes |
| Themes / skins | CSS variables | Props-based | 7 built-in skins |

### Data & API

| Feature | Frappe Gantt | gantt-task-react | DHTMLX Gantt |
|---|:---:|:---:|:---:|
| Programmatic API | Basic (update, refresh) | Props-driven (React) | Extensive (100+ methods) |
| Event count | ~6 events | ~7 events | 120+ events |
| Template system | No | Custom React components | 40+ template functions |
| Data serialization | No | No | Yes (JSON, XML) |
| Server-side loading | No | No | Yes (URL loading) |
| Data processor (CRUD sync) | No | No | Yes |
| Export (PDF/PNG/Excel) | No | No | Yes (via service) |
| Import (MS Project) | No | No | Yes (PRO) |
| i18n / Localization | Yes (language codes) | Yes (locale prop) | Yes (32 locales) |

---

## Event System Comparison

| Library | Events Available |
|---|---|
| **Frappe Gantt** | `on_click`, `on_double_click`, `on_hover`, `on_date_change`, `on_progress_change`, `on_view_change`, `on_date_click` |
| **gantt-task-react** | `onClick`, `onDoubleClick`, `onSelect`, `onDateChange`, `onProgressChange`, `onDelete`, `onExpanderClick` |
| **DHTMLX Gantt** | 120+ events across categories: task lifecycle (add/update/delete/drag), link lifecycle, lightbox, scrolling, rendering, grid interaction, undo/redo, data loading, and more |

---

## Strengths & Weaknesses

### Frappe Gantt
**Best for:** Simple, beautiful timeline visualizations

| Strengths | Weaknesses |
|---|---|
| Zero dependencies, tiny bundle | No task list / grid panel |
| Beautiful SVG rendering out of the box | No hierarchy (parent/child tasks) |
| Simplest API — quick to integrate | No milestones as a distinct type |
| Auto-moves dependent tasks on drag | Only End-to-Start dependencies |
| Holiday/weekend exclusion | No inline editing |
| Custom popup system | No task creation/deletion UI |
| Expected progress indicator | Not a React component (needs wrapper) |
| Duration strings ("5d", "2w") | No TypeScript definitions |

### gantt-task-react
**Best for:** React projects needing a quick, native Gantt component

| Strengths | Weaknesses |
|---|---|
| Native React with TypeScript | Development stalled (last release Jul 2022) |
| Task, Project, Milestone types | 129 open issues, 28 open PRs |
| Drag & drop (dates + progress) | Only End-to-Start dependencies |
| Expandable project groups | No inline editing in task list |
| Custom tooltip (React component) | No task creation UI |
| Custom task list (React component) | No undo/redo |
| RTL support | No holiday/weekend highlighting |
| Per-task color styling | Limited scale customization |
| Delete via keyboard (Del key) | No link dragging to create dependencies |

### DHTMLX Gantt
**Best for:** Full-featured project management applications

| Strengths | Weaknesses |
|---|---|
| Most mature & feature-rich | GPL v2 license (copyleft) |
| All 4 dependency types (FS, SS, FF, SF) | Large bundle (~800 KB) |
| Full grid with sorting, inline editing | Not a React component (needs wrapper) |
| Built-in lightbox for task editing | Complex API (learning curve) |
| Drag to create links | Global singleton (one instance issues) |
| Today marker, undo/redo, multiselect | Best features require PRO license |
| 120+ events, 40+ templates | |
| 7 built-in themes | |
| Server-side data loading | |
| Export to PDF/PNG/Excel/iCal | |
| Keyboard navigation | |
| Touch support | |
| Accessibility (ARIA) | |

---

## What Only Paid Libraries Can Do

The following features are **not available in any free/open source library** tested. They require a commercial license from DHTMLX PRO, Bryntum Gantt, or Syncfusion Gantt.

### Critical Path Analysis
- Automatically highlights the longest chain of dependent tasks that determines the project end date
- Shows slack/float for each task (how much a task can slip without delaying the project)
- **Available in:** DHTMLX PRO, Bryntum Gantt (~$1,199/dev/year), Syncfusion Gantt (~$995/dev/year)

### Auto-Scheduling
- Automatically reschedules dependent tasks when a predecessor changes
- Supports scheduling constraints (ASAP, ALAP, Start No Earlier Than, Finish No Later Than, etc.)
- Forward and backward scheduling from project start/end date
- **Available in:** DHTMLX PRO, Bryntum Gantt, Syncfusion Gantt

### Resource Management
- Assign resources (people, equipment) to tasks
- Resource load/utilization histograms
- Per-resource calendars with individual working hours
- Resource leveling (automatic conflict resolution)
- **Available in:** DHTMLX PRO, Bryntum Gantt, Syncfusion Gantt

### Baselines
- Store and display planned vs. actual schedule
- Visual comparison between original plan and current state
- Multiple baseline snapshots over time
- **Available in:** DHTMLX PRO ($599+/dev), Bryntum Gantt, Syncfusion Gantt, SVAR PRO

### Split Tasks
- Break a single task into multiple segments with gaps
- Represent interrupted work visually
- **Available in:** DHTMLX PRO, Bryntum Gantt

### Advanced Export/Import
- Export to PDF/PNG with custom layouts and headers
- Export to MS Project (.mpp) format
- Import from MS Project / Primavera P6
- Export to Excel with custom formatting
- **Available in:** DHTMLX PRO, Bryntum Gantt, Syncfusion Gantt

### Work Breakdown Structure (WBS)
- Automatic WBS numbering (1.0, 1.1, 1.2, 2.0, etc.)
- WBS column in task grid
- **Available in:** DHTMLX PRO, Syncfusion Gantt

### Advanced Calendar Support
- Multiple working calendars (per-project, per-task, per-resource)
- Non-working time exclusion from duration calculations
- Custom working hours per day
- **Available in:** DHTMLX PRO, Bryntum Gantt, Syncfusion Gantt

---

## Pricing of Paid Libraries

| Library | Price | Notes |
|---|---|---|
| **DHTMLX Gantt PRO** | From $599/dev | Individual license; Enterprise available |
| **Bryntum Gantt** | ~$1,199/dev/year | Fully commercial, no OSS edition |
| **Syncfusion Gantt** | ~$995/dev/year | Free community license for <$1M revenue, ≤5 devs |
| **SVAR Gantt PRO** | Contact for pricing | MIT base + PRO add-on |

---

## Recommendation

| Use Case | Recommended Library |
|---|---|
| Quick prototype / simple timeline | **Frappe Gantt** |
| React project, need it working in 10 minutes | **gantt-task-react** |
| Full PM tool with editing, hierarchy, links | **DHTMLX Gantt** (GPL) |
| Need critical path, resources, baselines | **DHTMLX PRO** or **Bryntum** (paid) |
| Design system demo / evaluation | All 3 in this project |

---

## Running the Demo

```bash
pnpm install
pnpm dev
```

Each tab shows the same 30+ task software development project rendered by a different library, with interactive controls and an event log showing all user interactions.
