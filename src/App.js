import React, { useState } from 'react';
import './App.css';
import editImage from './Images/edit.png';
import deleteImage from './Images/delete.png';
function App() {
  const [tasks, Tasks] = useState([]);
  const [taskInput, TaskInput] = useState('');
  const [editingTaskId, TaskID] = useState(null);

  const AddTask = () => {
    if (taskInput.trim() !== '') {
      if (editingTaskId !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: taskInput } : task
        );
        Tasks(updatedTasks);
        TaskID(null);
      } else {
        Tasks([...tasks, { id: Date.now(), text: taskInput }]);
      }
      TaskInput('');
    }
  };

  const DeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    Tasks(updatedTasks);
  };

  const EditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    TaskInput(taskToEdit.text);
    TaskID(taskId);
  };

  return (
    <div className="App">
      <h1 className='Title'>GAWAIN MO</h1>
      <div className="input_container">
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => TaskInput(e.target.value)}
        />
        <button onClick={AddTask}>
          {editingTaskId !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="task_list">
        {tasks.map((task) => (
          <li key={task.id} className="task">
            <input
              type="text"
              value={task.text}
              onChange={() => {}}
              disabled={editingTaskId === task.id}
            />
            <div>
              <button onClick={() => EditTask(task.id)}>
                <img src={editImage} alt='Edit' className='edit' />
              </button>
              <button onClick={() => DeleteTask(task.id)}>
                <img src={deleteImage} alt='Delete' className='delete' />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
