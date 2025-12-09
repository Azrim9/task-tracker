import { useState } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newName: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleTaskCompleted,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.name);

  const handleEditClick = () => {
    if (isEditing) {
      onEditTask(task.id, text);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTaskCompleted(task.id)}
        />
        {!isEditing ? (
          <div>{task.name}</div>
        ) : (
          <input
            onChange={(e) => setText(e.target.value)}
            className="border rounded-sm px-2 py-1"
            value={text}
          />
        )}
        <button onClick={() => onDeleteTask(task.id)}> Delete </button>
        <button onClick={() => handleEditClick()}>
          {!isEditing ? "Edit" : "Save"}
        </button>
      </li>
    </div>
  );
};

export default TaskItem;
