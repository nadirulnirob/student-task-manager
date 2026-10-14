# Student Task Manager

A student-friendly task manager built with React and Vite.

## Features

- Add tasks with form validation
- Mark tasks as completed or pending
- Delete tasks with confirmation
- Filter by All, Completed, and Pending
- Statistics for total, completed, and remaining tasks
- Empty-state message: "No tasks available"
- Reusable `Card` component using the `children` prop
- Friendly error fallback UI
- Responsive layout
- Tasks are saved in the browser using localStorage

## Requirements

- Node.js (LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

## Production build

```bash
npm run build
```

## Project structure

```text
student-task-manager/
├── index.html
├── package.json
├── README.md
└── src/
    ├── components/
    │   ├── Card.jsx
    │   ├── TaskForm.jsx
    │   ├── TaskItem.jsx
    │   ├── TaskList.jsx
    │   └── TaskStats.jsx
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```
