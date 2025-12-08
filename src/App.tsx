import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      name: text,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTaskCompleted = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleTaskCompleted={handleToggleTaskCompleted}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
