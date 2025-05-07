import React, { useState, useEffect } from 'react';

function TaskForm({ onSave, editingTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDeadline(editingTask.deadline?.slice(0, 16));
      setPriority(editingTask.priority);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('Medium');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required.");

    onSave({
      title,
      description,
      deadline,
      priority,
      completed: editingTask ? editingTask.completed : false,
    });
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl"
      >
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h3>

        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task Title"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="datetime-local"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-200"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={() => {
                onCancel();
                resetForm();
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
