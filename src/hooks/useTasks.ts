import { useEffect, useMemo, useState, useReducer } from "react";
import type { Task, TasksAction } from "../types";

const tasksReducer = (state: Task[], action: TasksAction) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: action.title,
          description: action.description,
          completed: false,
        },
      ];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.id);

    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.id
          ? {
              ...task,
              title: action.updatedTitle,
              description: action.updatedDescription,
            }
          : task
      );

    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );

    case "DELETE_COMPLETED":
      return state.filter((task) => !task.completed);

    default:
      return state;
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
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
        if (filter === "All") return true;
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
    dispatch({ type: "ADD_TASK", title, description });
  };

  const handleDeleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", id });
  };

  const handleEditTask = (
    id: string,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    dispatch({ type: "EDIT_TASK", id, updatedTitle, updatedDescription });
  };

  const handleToggleTaskCompleted = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", id });
  };

  const handleDeleteTaskCompleted = () => {
    dispatch({ type: "DELETE_COMPLETED" });
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
