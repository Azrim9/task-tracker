import { useEffect, useState } from "react";
import type { Task } from "../types";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const totalTaskCount = tasks.length;
  const completedTaskCount = tasks.filter((task) => task.completed).length;
  const activeTaskCount = tasks.filter((task) => !task.completed).length;

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Active") return !task.completed;
      if (filter === "Completed") return task.completed;
      return task;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );

  const handleAddTask = (title: string, description: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (
    id: string,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    );
  };

  const handleToggleTaskCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTaskCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return {
    tasks,
    filter,
    search,
    filteredTasks,
    totalTaskCount,
    completedTaskCount,
    activeTaskCount,
    setFilter,
    setSearch,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleToggleTaskCompleted,
    handleDeleteTaskCompleted,
  };
};

export default useTasks;
