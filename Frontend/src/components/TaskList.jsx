import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error al obtener tareas:', error));
  }, [apiUrl]);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-lg md:text-2xl font-bold mb-4 text-center text-gray-900">
        Lista de Tareas
      </h1>

      {/* Botón para agregar nueva tarea */}
      <div className="flex justify-center">
        <Link 
          to="/new" 
          className="bg-green-500 text-white py-2 px-4 rounded w-full sm:w-auto text-center"
        >
          Nueva Tarea
        </Link>
      </div>

      {/* Lista de tareas */}
      <ul className="mt-4 flex flex-col gap-4 w-full">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
          ))
        ) : (
          <p className="text-center text-gray-500">No hay tareas disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default TaskList;
