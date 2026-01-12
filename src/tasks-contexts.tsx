import { createContext, useContext } from "react";
import useTasks from "./hooks/useTasks";

type TasksContextValue = ReturnType<typeof useTasks>;

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const tasks = useTasks();

  return (
    <TasksContext.Provider value={tasks}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const ctx = useContext(TasksContext);

  if (!ctx) {
    throw new Error("useTasksContext must be used inside TasksProvider");
  }
  return ctx;
};
