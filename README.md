# Todo App - Real-Time Sync

A modern To-Do List application built with ASP.NET Core GraphQL backend, React frontend with Adobe React Spectrum, and real-time synchronization using WebSockets.

## Features

- ✅ Create, update, and manage tasks
- 🔄 Real-time synchronization across multiple clients
- 📱 Responsive design
- 🐳 Docker containerization
- 🔧 GraphQL API with subscriptions

## Tech Stack

### Backend
- ASP.NET Core 7.0
- HotChocolate GraphQL
- Entity Framework Core
- SQLite Database

### Frontend
- React 18
- TypeScript
- Real-time subscriptions

### Infrastructure
- Docker & Docker Compose
- Nginx (for production frontend)

## Quick Start

### Prerequisites
- Docker and Docker Compose
- .NET 7.0 SDK (for local development)
- Node.js 18+ (for local development)

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd TodoApp
```

2. Run with Docker Compose:
```bash
# Production
docker-compose up --build

# Development (with hot reload)
docker-compose -f docker-compose.dev.yml up --build
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend GraphQL: http://localhost:5000/graphql

### Local Development

#### Backend
```bash
cd backend/TodoApp.Backend
dotnet restore
dotnet run
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## API Documentation

### GraphQL Endpoint
- **URL**: http://localhost:5000/graphql
- **WebSocket**: ws://localhost:5000/graphql

### Queries
```graphql
query GetAllTasks {
  getAllTasks {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

### Mutations
```graphql
mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}

mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
  updateTaskStatus(input: $input) {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

### Subscriptions
```graphql
subscription TaskCreated {
  onTaskCreated {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}

subscription TaskUpdated {
  onTaskUpdated {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

## Project Structure

```
TodoApp/
├── backend/
│   └── TodoApp.Backend/
│       ├── Data/
│       ├── GraphQL/
│       ├── Models/
│       └── Program.cs
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── relay/
│   │   └── App.tsx
│   └── package.json
├── docker-compose.yml
├── docker-compose.dev.yml
└── README.md
```

## Development

### Backend Development
- Uses Entity Framework Core with SQLite
- HotChocolate for GraphQL implementation
- Real-time subscriptions for live updates
- CORS configured for frontend integration

### Frontend Development
- Adobe React Spectrum for consistent UI components
- Relay for GraphQL client with caching
- TypeScript for type safety
- Real-time subscriptions for live updates

### Database
- SQLite database for simplicity
- Entity Framework Core migrations
- Automatic database creation on startup

## Deployment

The application is containerized and ready for deployment:

1. **Production**: Use `docker-compose up --build`
2. **Development**: Use `docker-compose -f docker-compose.dev.yml up --build`



