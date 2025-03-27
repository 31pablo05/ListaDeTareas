import React from 'react';
import { Link } from 'react-router-dom';

function TaskItem({ task, tasks, setTasks }) {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

  const handleDelete = () => {
    fetch(`${apiUrl}/${task.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== task.id));
      })
      .catch((error) => console.error('Error al eliminar tarea:', error));
  };

  return (
    <li className="border p-4 md:p-6 my-2 rounded-lg shadow bg-white w-full max-w-md mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">{task.title}</h2>
        <p className="text-gray-700">{task.description}</p>
        <p className={`text-sm font-semibold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Link to={`/edit/${task.id}`} className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto text-center">
          Editar
        </Link>
        <button 
          onClick={handleDelete} 
          className="bg-red-500 text-white py-2 px-4 rounded w-full sm:w-auto text-center"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
