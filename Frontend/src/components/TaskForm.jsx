import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}`)
        .then((response) => response.json())
        .then((data) => {
          const taskToEdit = data.find((t) => t.id === id);
          if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
          }
        })
        .catch((error) => console.error('Error al cargar la tarea:', error));
    }
  }, [id, apiUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description };
    let method = 'POST';
    let url = apiUrl;
    
    if (id) {
      method = 'PUT';
      url = `${apiUrl}/${id}`;
    }

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
      .then((response) => response.json())
      .then(() => navigate('/'))
      .catch((error) => console.error('Error al guardar la tarea:', error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{id ? 'Editar Tarea' : 'Nueva Tarea'}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la tarea"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción de la tarea"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            {id ? 'Actualizar Tarea' : 'Crear Tarea'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
