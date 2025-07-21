import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface Task {
  id: number;
  title: string;
}

let tasks: Task[] = [];

app.get('/tasks', (_req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask: Task = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: 'Task deleted' });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('API is up and running, Yay! Try /tasks to put in your first task!');
});

app.listen(port, () => {
  console.log(`QuickTask API running at http://localhost:${port}`);
});
