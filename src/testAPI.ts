// testAPI.ts
import type { Task } from "./types";

let tasksDB: Task[] = [
  {
    id: "1",
    title: "Basic",
    description: "Hooks, state, effects",
    completed: false,
  },
  {
    id: "2",
    title: "Advanced",
    description: "Advanced models",
    completed: true,
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTasks = async (): Promise<Task[]> => {
  await delay(1000);
  return [...tasksDB];
};

export const createTask = async (
  title: string,
  description: string,
): Promise<Task> => {
  await delay(500);

  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    description,
    completed: false,
  };

  tasksDB.push(newTask);
  return newTask;
};

export const updateTask = async (
  id: string,
  updates: Partial<Task>,
): Promise<Task> => {
  await delay(500);

  const task = tasksDB.find((t) => t.id === id);
  if (!task) throw new Error("Task not found");

  Object.assign(task, updates);
  return task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await delay(500);
  tasksDB = tasksDB.filter((t) => t.id !== id);
};
