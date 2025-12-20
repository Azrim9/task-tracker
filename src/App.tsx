import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types";
import TaskFilterButtons from "./components/TaskFilterButtons";
import DeleteAllCompletedButton from "./components/DeleteAllCompletedButton";
import TaskSearch from "./components/TaskSearch";
import TaskStats from "./components/TaskStats";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
  const [search, setSearch] = useState<string>("");

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

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-2">
        <TaskSearch search={search} onSearchChange={setSearch} />
        <TaskStats
          total={totalTaskCount}
          active={activeTaskCount}
          completed={completedTaskCount}
        />
      </div>

      <TaskForm onAddTask={handleAddTask} />
      <TaskFilterButtons currentFilter={filter} onChangeFilter={setFilter} />
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
