import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (text: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      name: text,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTaskCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: string, newName: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name: newName } : task))
    );
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onEditTask={handleEditTask}
        onToggleTaskCompleted={handleToggleTaskCompleted}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
