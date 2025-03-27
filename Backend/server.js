// Carga las variables de entorno desde el archivo .env
require("dotenv").config();

// Importa las librerías necesarias
const express = require("express");
const cors = require("cors");

// Crea una instancia de la aplicación Express
const app = express();

// Define el puerto en el que se ejecutará el servidor, usando la variable de entorno o 5000 por defecto
const PORT = process.env.PORT || 5000;

// ----------------- Middlewares ----------------- //

// Habilita CORS para permitir solicitudes de otros orígenes
app.use(cors());
// Middleware para parsear JSON en las peticiones entrantes
app.use(express.json());

// ----------------- Datos en memoria ----------------- //
// Array que actúa como almacenamiento temporal para las tareas
let tasks = [
  { id: "1", title: "Aprender Express", description: "Practicar con Node.js y Express", completed: false },
  { id: "2", title: "Configurar Tailwind", description: "Aplicar estilos con Tailwind CSS", completed: true },
];

// ----------------- Rutas y Endpoints ----------------- //

/**
 * GET /api/tasks
 * Retorna todas las tareas almacenadas en el array.
 */
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

/**
 * POST /api/tasks
 * Crea una nueva tarea.
 * Se espera recibir en el body los campos 'title' y 'description'.
 * Si falta alguno, retorna un error 400.
 */
app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;
  
  // Validación de campos requeridos
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  // Crea una nueva tarea con un ID generado a partir de la longitud actual del array
  const newTask = {
    id: String(tasks.length + 1),
    title,
    description,
    completed: false,
  };

  // Agrega la nueva tarea al array
  tasks.push(newTask);
  // Retorna la tarea creada con un status 201 (Created)
  res.status(201).json(newTask);
});

/**
 * PUT /api/tasks/:id
 * Actualiza una tarea existente.
 * Se recibe el 'id' de la tarea a actualizar en los parámetros de la URL
 * y los nuevos datos en el body (title, description y completed).
 */
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Busca el índice de la tarea con el id indicado
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    // Si no se encuentra la tarea, retorna un error 404
    return res.status(404).json({ error: "Task not found" });
  }

  // Actualiza la tarea mezclando los datos existentes con los nuevos
  tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
  // Retorna la tarea actualizada
  res.json(tasks[taskIndex]);
});

/**
 * DELETE /api/tasks/:id
 * Elimina una tarea existente.
 * Se recibe el 'id' de la tarea a eliminar en los parámetros de la URL.
 */
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  // Filtra el array de tareas para eliminar la tarea con el id proporcionado
  tasks = tasks.filter((task) => task.id !== id);
  // Retorna un mensaje de confirmación
  res.json({ message: "Task deleted successfully" });
});

// ----------------- Iniciar Servidor ----------------- //

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
