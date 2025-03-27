require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para procesar JSON en las peticiones

// Datos en memoria (array de tareas)
let tasks = [
  { id: "1", title: "Aprender Express", description: "Practicar con Node.js y Express", completed: false },
  { id: "2", title: "Configurar Tailwind", description: "Aplicar estilos con Tailwind CSS", completed: true },
];

// Rutas
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const newTask = {
    id: String(tasks.length + 1),
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
  res.json(tasks[taskIndex]);
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  res.json({ message: "Task deleted successfully" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
