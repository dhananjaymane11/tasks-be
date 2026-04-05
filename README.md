# Simple CRUD App

This is a simple CRUD application using Express, MongoDB, and Node.js.

## Setup

1. Install dependencies: `npm install`

2. Set up MongoDB locally or update `.env` with your MongoDB URI.

3. Run the server: `npm start`

## API Endpoints

- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a task (body: {title, priority, done})
- PUT /api/tasks/:id - Update a task by ID (body: {title, priority, done})
- DELETE /api/tasks/:id - Delete a task by ID
