import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types";
import FilterButtons from "./components/FilterButtons";
import DeleteAllCompletedButton from "./components/DeleteAllCompletedButton";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return task;
  });

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

  return (
    <div className="flex flex-col">
      <TaskForm onAddTask={handleAddTask} />
      <FilterButtons currentFilter={filter} onChangeFilter={setFilter} />
      <DeleteAllCompletedButton
        tasks={tasks}
        onDeleteTaskCompleted={handleDeleteTaskCompleted}
      />
      <TaskList
        tasks={filteredTasks}
        onEditTask={handleEditTask}
        onToggleTaskCompleted={handleToggleTaskCompleted}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
