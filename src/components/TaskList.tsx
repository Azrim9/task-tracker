import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (
    id: string,
    updatedTitle: string,
    updatedDescription: string
  ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTaskCompleted,
  onDeleteTask,
  onEditTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">No tasks yet...</div>
    );
  }
  return (
    <div>
      <ul className="flex flex-col gap-3 w-full items-center">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTaskCompleted={onToggleTaskCompleted}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
