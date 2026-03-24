# TODO Application - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Core Components](#core-components)
6. [Data Models](#data-models)
7. [Services](#services)
8. [Features](#features)
9. [How It Works](#how-it-works)
10. [Installation & Setup](#installation--setup)
11. [Running the Application](#running-the-application)
12. [Code Walkthrough](#code-walkthrough)

---

## Project Overview

The **TODO Application** is a modern, single-page task management application built with **Angular 21**. It enables users to create, view, and manage tasks while tracking their completion status. The application uses Angular's latest features including:

- **Signals API** for reactive state management
- **Standalone Components** for a simplified architecture
- **Computed Properties** for derived state
- **ViewChild References** for direct DOM access

### Key Features:
- ✅ Create new tasks with title and description
- ✅ Filter tasks by status (All, Open, In Progress, Completed)
- ✅ Update task status with real-time UI updates
- ✅ Clean, intuitive user interface
- ✅ Responsive design

---

## Technology Stack

### Frontend Framework
- **Angular 21.0.0** - Modern web framework with Signals API support
- **TypeScript 5.9.2** - Strongly typed JavaScript

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| @angular/core | ^21.0.0 | Core Angular framework |
| @angular/common | ^21.0.0 | Common Angular directives and pipes |
| @angular/forms | ^21.0.0 | Form handling (Template-driven forms) |
| @angular/router | ^21.0.0 | Routing capabilities |
| @angular/platform-browser | ^21.0.0 | Browser-specific APIs |
| rxjs | ~7.8.0 | Reactive programming library |

### Development Tools
- **Angular CLI 21.0.4** - Command-line interface for development
- **Angular Build 21.0.4** - Build tooling
- **@angular/compiler-cli** - TypeScript compilation
- **Vitest** - Unit testing framework
- **Prettier** - Code formatting

---

## Project Structure

```
TODO/
├── angular.json                 # Angular CLI configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.spec.json           # Testing TypeScript config
├── README.md                     # Basic README
├── public/                       # Static assets
│   └── favicon.ico
├── src/
│   ├── index.html               # Entry HTML file
│   ├── main.ts                  # Application entry point
│   ├── styles.css               # Global styles
│   └── app/
│       ├── app.ts               # Root component
│       ├── app.html             # Root component template
│       ├── app.css              # Root component styles
│       ├── app.config.ts        # App configuration
│       ├── app.routes.ts        # Route definitions
│       └── task/
│           ├── task.model.ts    # Task data model & types
│           ├── task.service.ts  # Task business logic service
│           ├── new-task/        # Create task component
│           │   ├── new-task.ts
│           │   ├── new-task.html
│           │   └── new-task.css
│           └── tasks-list/      # Display tasks component
│               ├── tasks-list.ts
│               ├── tasks-list.html
│               ├── tasks-list.css
│               └── task-item/   # Individual task component
│                   ├── task-item.ts
│                   ├── task-item.html
│                   └── task-item.css
```

---

## Architecture

### Component Hierarchy

```
App (Root)
├── NewTask (Create tasks)
└── TasksList (Display tasks)
    └── TaskItem (Individual task - repeatable)
```

### Data Flow Diagram

```
User Input (Form)
    ↓
NewTask Component
    ↓
TaskService.addTask()
    ↓
Signal<Task[]> (tasks signal)
    ↓
TasksList (subscribes via alltasks signal)
    ↓
TaskItem Components (receive task as @Input)
    ↓
UI Updates (Signals trigger reactivity)
```

### State Management Pattern

The application uses **Angular Signals** for state management:
- **Private Signal**: `TaskService.tasks` - Single source of truth
- **Computed Properties**: Real-time filtering based on user selection
- **Readonly Signals**: `TaskService.alltasks` - Exposes immutable data

---

## Core Components

### 1. **App Component** (Root)
**File**: [src/app/app.ts](src/app/app.ts)

```typescript
- Selector: app-root
- Imports: RouterOutlet, NewTask, TasksList
- Purpose: Root component that combines all features
```

**Responsibilities**:
- Renders page title ("TODO")
- Combines NewTask and TasksList components
- Sets up the component tree

**Template**: Displays the new task form and tasks list side by side.

---

### 2. **NewTask Component**
**File**: [src/app/task/new-task/new-task.ts](src/app/task/new-task/new-task.ts)

```typescript
- Selector: app-new-task
- Template: new-task.html
- Styles: new-task.css
```

**Key Features**:
- Template-driven form with FormsModule
- Form inputs for task title and description
- Form reset after submission
- ViewChild reference to reset form element

**Properties**:
- `formE1`: Reference to the form element (for resetting after submission)

**Methods**:
- `onAddTask(title, description)`: 
  - Calls `TaskService.addTask()` with form data
  - Resets the form for the next entry

**Form Structure**:
```html
<form (ngSubmit)="onAddTask(...)">
  <input type="text" for title />
  <textarea for description />
  <button type="submit">Add Task</button>
</form>
```

---

### 3. **TasksList Component**
**File**: [src/app/task/tasks-list/tasks-list.ts](src/app/task/tasks-list/tasks-list.ts)

**Key Features**:
- Displays all tasks or filtered tasks
- Filter dropdown with options: All, Open, In Progress, Completed
- Computed property for dynamic filtering
- Iterates through tasks using `@for` loop

**Properties**:
- `taskStatusOptions`: Available filter options
- `selectedFilter`: Signal tracking current filter
- `tasks`: Computed property that returns filtered tasks based on selection

**Methods**:
- `onChangeTasksFilter(filter)`: Updates selected filter, triggering task recomputation

**Filtering Logic**:
```
All → Returns all tasks
Open → Returns tasks with status 'OPEN'
In Progress → Returns tasks with status 'IN_PROGRESS'
Completed → Returns tasks with status 'DONE'
```

---

### 4. **TaskItem Component**
**File**: [src/app/task/task-item/task-item.ts](src/app/task/tasks-list/task-item/task-item.ts)

**Key Features**:
- Displays individual task details
- Status change dropdown
- Dynamic styling based on task status
- Communicates status changes to service

**Properties**:
- `task`: Input signal (required) - receives task data from parent
- `taskStatusOptions`: Available status options
- `taskStatus`: Computed property that maps status to display text

**Methods**:
- `onChangeTaskStatus(taskId, status)`: 
  - Converts dropdown value to TaskStatus type
  - Calls service to update task status

**Styling Classes**:
- `.status-open` - Light gray for open tasks
- `.status-in-progress` - Blue/amber for in-progress tasks
- `.status-done` - Green for completed tasks

---

## Data Models

### Task Interface
**File**: [src/app/task/task.model.ts](src/app/task/task.model.ts)

```typescript
interface Task {
  id: string;              // Unique identifier (timestamp-based)
  title: string;           // Task title
  description: string;     // Task description
  status: TaskStatus;      // Current status
}

type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

// Status display options with translations
TaskStatusOptions: {
  value: 'open' | 'in-progress' | 'done'      // Form dropdown value
  taskStatus: TaskStatus                       // Actual status type
  text: string                                 // Display text
}[]
```

### Status Values Map

| Status Type | Display Text | Used In | Description |
|-------------|--------------|---------|-------------|
| OPEN | Open | Task storage | Initial task state |
| IN_PROGRESS | In-Progress | Task storage | Task being worked on |
| DONE | Completed | Task storage | Task finished |

---

## Services

### TaskService
**File**: [src/app/task/task.service.ts](src/app/task/task.service.ts)

**Decorator**: `@Injectable({ providedIn: 'root' })`

**Purpose**: Centralized business logic for task management. Manages state using Angular Signals.

**Properties**:

1. **Private Signal**
```typescript
private tasks = signal<Task[]>([])
```
- Holds all tasks
- Private to prevent external modifications
- Used as single source of truth

2. **Public Readonly Signal**
```typescript
alltasks = this.tasks.asReadonly()
```
- Exposes tasks as readonly signal
- Components subscribe to this for reactivity
- Prevents external code from calling `.set()` or `.update()`

**Methods**:

#### 1. `addTask(taskData: { title: string, description: string })`
Creates and adds a new task to the list.

```typescript
- Input: Object with title and description
- Creates unique ID using current timestamp
- Sets initial status to 'OPEN'
- Updates signal with new task
- No return value
```

**Step-by-step**:
1. Generate unique ID from `new Date().toString()`
2. Create new Task object with provided data and auto-generated fields
3. Use `.update()` to immutably add to tasks array
4. Signal change triggers component re-renders

#### 2. `updateTaskStatus(taskId: string, newStatus: TaskStatus)`
Updates an existing task's status.

```typescript
- Input: Task ID and new status
- Finds task by ID
- Updates status immutably
- Triggers reactive updates
- No return value
```

**Step-by-step**:
1. Find task matching the provided ID
2. If found, return new task object with updated status
3. If not found, return unchanged task
4. Signal update triggers dependent computations

---

## Features

### 1. **Create Tasks**
- Users enter task title and description
- Form validates input before submission
- Form auto-resets after task creation
- New task appears immediately in the list with OPEN status

### 2. **View Tasks**
- All created tasks display as individual cards
- Each card shows title, description, and current status
- Clear visual indicator of task status through styling

### 3. **Filter Tasks**
- Dropdown filter at the top of task list
- Options: All, Open, In-Progress, Completed
- Real-time filtering without page reload
- Computed property ensures filter always reflects current data

### 4. **Update Task Status**
- Each task has a status dropdown
- Options: Open, In-Progress, Completed
- Change applies immediately
- Visual styling updates to reflect new status

### 5. **Responsive UI**
- Form and list layout
- Color-coded status indicators
- Easy-to-use dropdowns for status changes

---

## How It Works

### Complete User Journey

#### **Scenario: User Creates and Manages a Task**

**Step 1: User Creates a Task**
```
1. User enters "Buy groceries" as title
2. User enters "Milk, eggs, bread" as description
3. User clicks "Add Task" button
4. Form submits → onAddTask() called
5. TaskService.addTask() executes:
   - Generates ID: "Wed Mar 23 2026 10:30:45 GMT+0000"
   - Creates Task: {
       id: "Wed Mar 23 2026 10:30:45 GMT+0000",
       title: "Buy groceries",
       description: "Milk, eggs, bread",
       status: "OPEN"
     }
   - Updates signal: tasks now contains 1 item
6. Form resets → input fields become empty
7. TasksList component detects signal change
8. tasks computed property recomputes
9. New task appears in list
```

**Step 2: User Filters Tasks**
```
1. User selects "In-Progress" from filter dropdown
2. onChangeTasksFilter("in-progress") executes
3. selectedFilter signal changes
4. tasks computed property recomputes
5. Only in-progress tasks display in list
6. Select "All" → all tasks reappear
```

**Step 3: User Updates Task Status**
```
1. User sees task with status "Open"
2. User changes dropdown to "In-Progress"
3. Form submits → onChangeTaskStatus() called
4. Status converted: "in-progress" → "IN_PROGRESS"
5. TaskService.updateTaskStatus() executes:
   - Finds task by ID
   - Creates new task object with status: "IN_PROGRESS"
   - Updates signal
6. TaskItem component detects change
7. taskStatus computed property recomputes
8. Display text changes from "Open" to "IN_PROGRESS"
9. CSS class changes → visual styling updates
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v11.5.2 or higher)
- **Angular CLI** (v21.0.4)

### Installation Steps

#### 1. **Navigate to Project Directory**
```bash
cd "e:\uk sw training\TODO"
```

#### 2. **Install Dependencies**
```bash
npm install
```

This command:
- Reads package.json
- Downloads all dependencies listed in `dependencies` and `devDependencies`
- Creates `node_modules` folder
- Generates `package-lock.json`

#### 3. **Verify Installation**
```bash
npm --version
ng version
```

---

## Running the Application

### Development Server

#### **Start the Application**
```bash
npm start
# OR
ng serve
```

**What happens**:
1. Angular CLI starts a development server
2. Compiles TypeScript to JavaScript
3. Bundles the application
4. Server runs on `http://localhost:4200`
5. Application automatically reloads on file changes (hot reload)

#### **Access the Application**
```
Open browser → Navigate to http://localhost:4200/
```

#### **Stopping the Server**
```
Press Ctrl+C in terminal
```

### Production Build

#### **Build for Production**
```bash
npm run build
```

**Output**:
- Compiled files stored in `dist/` directory
- Code minified and optimized
- Ready for deployment

### Testing

#### **Run Unit Tests**
```bash
npm test
```

**Test Runner**: Vitest
- Watches for file changes
- Re-runs tests automatically
- Reports test results and coverage

---

## Code Walkthrough

### **Main Entry Point** ([src/main.ts](src/main.ts))
```typescript
- Bootstraps the App component
- Angular framework initialization
- Application starts here
```

### **Application Configuration** ([src/app/app.config.ts](src/app/app.config.ts))
```typescript
- Angular configuration settings
- Provider setup
- Global application configuration
```

### **Component Imports Pattern**

Modern Angular uses standalone components:

**Before (Old Angular)**:
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule],
})
```

**Now (Angular 21 with Signals)**:
```typescript
@Component({
  imports: [CommonModule, FormsModule],  // Directly in component
  standalone: true,                       // No NgModule needed
})
```

**Benefits**:
- Simpler mental model
- Tree-shakeable
- Better code splitting
- Easier testing

### **Signal-based State Management**

#### **Why Signals?**

**Before (Observables)**:
```typescript
private tasks$ = new BehaviorSubject<Task[]>([]);
tasks = this.tasks$.asObservable();

// Subscribe to changes
this.tasks$.subscribe(tasks => console.log(tasks));
```

**Now (Signals)**:
```typescript
private tasks = signal<Task[]>([]);
alltasks = this.tasks.asReadonly();

// Automatic tracking in templates
// No subscription needed
{{ alltasks() }}
```

**Advantages**:
- More intuitive syntax
- Built into Angular
- Better performance
- Automatic change detection

### **Computed Properties**

```typescript
// Instead of dynamic subscriptions:
tasks = computed(() => {
  const status = this.selectedFilter();
  return this.taskService.alltasks()
    .filter(task => task.status === status);
});

// Automatically updates when:
// - selectedFilter changes
// - alltasks changes
```

### **Template Syntax**

#### **New Control Flow (@for, @if)**

```html
<!-- Old Syntax (NgFor, NgIf) -->
<div *ngFor="let task of tasks; trackBy: trackByFn">
  <div *ngIf="task.status === 'OPEN'">...</div>
</div>

<!-- New Syntax (Angular 17+) -->
<div @for="let task of tasks(); track task">
  @if (task.status === 'OPEN') {
    ...
  }
</div>
```

#### **Two-Way Binding with Forms**

```html
<!-- Template-driven form -->
<form (ngSubmit)="onAddTask(title.value)">
  <input #title type="text" />
  <button type="submit">Submit</button>
</form>

<!-- Component -->
onAddTask(title: string) {
  // Process title
}
```

---

## Key Concepts Explained

### **Signals**
Reactive primitives that automatically track dependencies and trigger updates.

### **Computed**
Derived state that automatically updates when its dependencies change.

### **Readonly Signal**
Prevents external code from modifying the signal directly.

### **Template References** (`#variable`)
Direct references to DOM elements in templates.

### **ViewChild**
Angular decorator to access template references in component code.

### **FormsModule**
Angular module enabling two-way data binding with `[(ngModel)]` and form submission.

### **Track Function**
Performance optimization for `@for` loops - tells Angular how to identify items.

---

## Performance Considerations

1. **Signal-based Change Detection**
   - More efficient than zone.js
   - Only affected components re-render
   - Fine-grained dependency tracking

2. **Computed Properties**
   - Lazy evaluation
   - Memoization built-in
   - Only recompute when dependencies change

3. **Template Optimization**
   - `track` function prevents unnecessary re-renders
   - CSS class binding avoids style recalculation
   - OnPush change detection by default

---

## Future Enhancement Possibilities

1. **Persistence**
   - Add localStorage to persist tasks
   - Backend API integration

2. **Features**
   - Task due dates
   - Priority levels
   - Task categories
   - Search functionality
   - Task deletion

3. **UX Improvements**
   - Animation on task creation
   - Drag-and-drop reorganization
   - Bulk status updates
   - Keyboard shortcuts

4. **Testing**
   - Unit tests with Jasmine/Vitest
   - Component integration tests
   - E2E tests with Playwright/Cypress

---

## Troubleshooting

### Common Issues

**Issue**: Application doesn't start
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

**Issue**: Port 4200 already in use
```bash
# Solution: Use different port
ng serve --port 4300
```

**Issue**: TypeScript compilation errors
```bash
# Solution: Check TypeScript version compatibility
ng version
npm install --save-dev typescript@5.9.2
```

---

## Summary

The **TODO Application** demonstrates modern Angular development with:

✅ **Signals API** - Reactive state management  
✅ **Standalone Components** - Simplified architecture  
✅ **Computed Properties** - Derived state  
✅ **Template-driven Forms** - User input handling  
✅ **Component Composition** - Reusable UI elements  
✅ **Service Layer** - Business logic separation  
✅ **Type Safety** - TypeScript throughout  
✅ **Clean Code** - Readable, maintainable structure  

It's a perfect foundation for learning modern Angular patterns and can be extended with additional features as needed.

---

**Document Version**: 1.0  
**Last Updated**: March 23, 2026  
**Angular Version**: 21.0.0
