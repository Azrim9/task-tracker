import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newName: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTaskCompleted,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <div>
      <ul>
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
