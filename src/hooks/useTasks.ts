import { useEffect, useMemo, useState } from "react";
import type { Task } from "../types";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<"All" | "Active" | "Completed">(() => {
    return JSON.parse(localStorage.getItem("filter") ?? "All");
  });

  const [sortBy, setSortBy] = useState<"None" | "Title" | "Completed">(() => {
    return JSON.parse(localStorage.getItem("sortBy") ?? "None");
  });

  const [search, setSearch] = useState<string>(() => {
    return localStorage.getItem("search") ?? "";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("filter", JSON.stringify(filter));
    localStorage.setItem("sortBy", JSON.stringify(sortBy));
    localStorage.setItem("search", search);
  }, [tasks, filter, sortBy, search]);

  const totalTaskCount = tasks.length;
  const completedTaskCount = tasks.filter((task) => task.completed).length;
  const activeTaskCount = tasks.filter((task) => !task.completed).length;

  const filteredTasks = useMemo(() => {
    return tasks
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
  }, [tasks, filter, search]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === "Title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "Completed") {
        return Number(b.completed) - Number(a.completed);
      }
      return 0;
    });
  }, [filteredTasks, sortBy]);

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
    sortBy,
    filteredTasks,
    sortedTasks,
    totalTaskCount,
    completedTaskCount,
    activeTaskCount,
    setFilter,
    setSearch,
    setSortBy,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleToggleTaskCompleted,
    handleDeleteTaskCompleted,
  };
};

export default useTasks;
