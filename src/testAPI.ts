import type { Task } from "./types";

export const testFetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 1000);
  });
};
