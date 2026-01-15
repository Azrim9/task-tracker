export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type TasksState = {
  tasks: Task[];
  filter: "All" | "Active" | "Completed";
  sortBy: "None" | "Title" | "Completed";
  search: string;
};

export type TasksAction =
  | { type: "ADD_TASK"; title: string; description: string }
  | { type: "DELETE_TASK"; id: string }
  | {
      type: "EDIT_TASK";
      id: string;
      updatedTitle: string;
      updatedDescription: string;
    }
  | { type: "TOGGLE_TASK"; id: string }
  | { type: "DELETE_COMPLETED" }
  | { type: "SET_FILTER"; filter: TasksState["filter"] }
  | { type: "SET_SORT"; sortBy: TasksState["sortBy"] }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SET_TASKS"; tasks: Task[] };
