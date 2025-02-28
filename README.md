Overview
This project is a Task Management Web Application built using React 19, TypeScript, and Ant Design. It allows users to create, view, search, execute, update, and delete tasks through an interactive and accessible UI.

The frontend interacts with a backend API hosted at http://localhost:9090, which manages tasks and their executions.

Features
Create Tasks: Users can define new tasks with a name, owner, and command.
View Task List: Displays all tasks with details like owner, command, and last execution time.
Search Tasks: A search bar allows filtering tasks by name.
Execute Tasks: Users can trigger task execution, and the system will display execution history.
Task Details: Each task has a detailed view showing execution history.
Update Tasks: Users can modify task details.
Delete Tasks: Tasks can be removed with a confirmation prompt.
Accessibility & Usability: Designed with a user-friendly UI using Ant Design.
Tech Stack
Frontend:

React 19
TypeScript
Ant Design (UI Components)
React Router (Navigation)
Axios (API Calls)
Day.js (Date Formatting)
Backend:

API is expected to be hosted at http://localhost:9090
Endpoints:
GET /tasks - Fetch all tasks
GET /tasks/{taskId} - Fetch task by ID
PUT /tasks - Create a task
PATCH /tasks/{taskId} - Update task
DELETE /tasks/{taskId} - Delete task
PUT /tasks/{taskId}/execute - Execute task
GET /tasks/search?name={name} - Search tasks by name
