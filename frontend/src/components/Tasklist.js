import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/tasks";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = () => {
    axios
      .get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = (task) => {
    const request = editingTask
      ? axios.put(`${API_URL}/${editingTask._id}`, task)
      : axios.post(API_URL, task);

    request.then(() => {
      fetchTasks();
      setEditingTask(null);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios.delete(`${API_URL}/${id}`).then(fetchTasks);
    }
  };

  const handleToggleComplete = (task) => {
    axios
      .put(`${API_URL}/${task._id}`, { ...task, completed: !task.completed })
      .then(fetchTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 ">Task Manager</h2>

        <TaskForm
          onSave={handleSave}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        {tasks.length === 0 ? (
          <p className="text-center text-gray-600 mt-6">No tasks found.</p>
        ) : (
          <div className="grid gap-4 mt-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`p-6 rounded-2xl shadow-md transition duration-200 ${
                  task.completed
                    ? 'bg-green-100 border border-green-300'
                    : 'bg-white border border-gray-300'
                }`}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-between">
                  {task.title}
                  {task.completed && (
                    <span className="text-green-600 text-sm font-medium ml-2">
                      (Completed)
                    </span>
                  )}
                </h3>
                {task.description && <p className="text-gray-600 mb-2">{task.description}</p>}
                {task.deadline && (
                  <p className="text-sm text-gray-500 mb-1">
                    Deadline: {new Date(task.deadline).toLocaleString()}
                  </p>
                )}
                <p className="text-sm text-indigo-600 font-medium mb-4">
                  Priority: {task.priority}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`px-4 py-2 rounded-lg text-white transition ${
                      task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Mark as {task.completed ? 'Incomplete' : 'Complete'}
                  </button>

                  <button
                    onClick={() => setEditingTask(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
