import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string | null;
}

const AppSimple: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
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
          `,
        }),
      });
      const result = await response.json();
      if (result.data) {
        setTasks(result.data.getAllTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Create task
  const createTask = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
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
          `,
          variables: {
            input: {
              title: title.trim(),
              description: description.trim() || null,
            },
          },
        }),
      });
      const result = await response.json();
      if (result.data) {
        setTasks([result.data.createTask, ...tasks]);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    
    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
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
          `,
          variables: {
            input: {
              id: taskId,
              status: newStatus,
            },
          },
        }),
      });
      const result = await response.json();
      if (result.data && result.data.updateTaskStatus) {
        setTasks(tasks.map(task => 
          task.id === taskId ? result.data.updateTaskStatus : task
        ));
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (taskId: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary">
              <i className="bi bi-check2-square me-2"></i>
              Todo App
            </h1>
            <p className="lead text-muted">Manage your tasks with real-time sync</p>
          </div>

          {/* Add Task Form */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Add New Task
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); createTask(); }}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label htmlFor="taskTitle" className="form-label">Task Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="taskTitle"
                      placeholder="Enter task title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="taskDescription" className="form-label">Description (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="taskDescription"
                      placeholder="Enter description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!title.trim() || loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-circle me-2"></i>
                          Add Task
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Task List */}
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">
                <i className="bi bi-list-task me-2"></i>
                Your Tasks ({tasks.length})
              </h5>
            </div>
            <div className="card-body">
              {tasks.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <h4 className="text-muted mt-3">No tasks yet</h4>
                  <p className="text-muted">Create your first task to get started!</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`list-group-item list-group-item-action ${
                        task.status === 'Completed' ? 'bg-light' : ''
                      }`}
                    >
                      <div className="d-flex w-100 justify-content-between align-items-start">
                        <div className="d-flex align-items-center">
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={task.status === 'Completed'}
                              onChange={() => updateTaskStatus(task.id, task.status)}
                              id={`task-${task.id}`}
                            />
                            <label className="form-check-label" htmlFor={`task-${task.id}`}></label>
                          </div>
                          <div className="flex-grow-1">
                            <h6
                              className={`mb-1 ${
                                task.status === 'Completed' ? 'text-decoration-line-through text-muted' : ''
                              }`}
                            >
                              {task.title}
                            </h6>
                            {task.description && (
                              <p
                                className={`mb-1 small ${
                                  task.status === 'Completed' ? 'text-decoration-line-through text-muted' : 'text-muted'
                                }`}
                              >
                                {task.description}
                              </p>
                            )}
                            <small className="text-muted">
                              <i className="bi bi-calendar3 me-1"></i>
                              Created: {new Date(task.createdAt).toLocaleDateString()}
                              {task.updatedAt && (
                                <span className="ms-2">
                                  <i className="bi bi-pencil me-1"></i>
                                  Updated: {new Date(task.updatedAt).toLocaleDateString()}
                                </span>
                              )}
                            </small>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <span
                            className={`badge ${
                              task.status === 'Completed' ? 'bg-success' : 'bg-warning'
                            } me-2`}
                          >
                            {task.status}
                          </span>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteTask(task.id)}
                            title="Delete task"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <small className="text-muted">
              <i className="bi bi-lightning-charge me-1"></i>
              Real-time sync enabled
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return <AppSimple />;
};

export default App;