import { useEffect, useMemo, useState } from "react";
import type { Task } from "../types";
import { fetchTasks } from "../testAPI";

const useTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

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
    localStorage.setItem("filter", JSON.stringify(filter));
    localStorage.setItem("sortBy", JSON.stringify(sortBy));
    localStorage.setItem("search", search);
  }, [filter, sortBy, search]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch(() => {
        setError("Failed to load tasks");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const totalTaskCount = tasks.length;
  const completedTaskCount = tasks.filter((t) => t.completed).length;
  const activeTaskCount = tasks.filter((t) => !t.completed).length;

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "Active") return !task.completed;
        if (filter === "Completed") return task.completed;
        return true;
      })
      .filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
  }, [tasks, filter, search]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === "Title") return a.title.localeCompare(b.title);
      if (sortBy === "Completed")
        return Number(b.completed) - Number(a.completed);
      return 0;
    });
  }, [filteredTasks, sortBy]);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
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
    updatedDescription: string,
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task,
      ),
    );
  };

  const handleToggleTaskCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
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
    isLoading,
    error,
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
