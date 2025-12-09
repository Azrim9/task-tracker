import { useState } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (
    id: string,
    updatedTitle: string,
    updatedDescription: string
  ) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleTaskCompleted,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState(task.title);
  const [descriptionText, setDescriptionText] = useState(task.description);

  const handleEditClick = () => {
    if (isEditing) {
      onEditTask(task.id, titleText, descriptionText);
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
          <div>
            <div>{task.title}</div>
            <div>{task.description}</div>
          </div>
        ) : (
          <div>
            <input
              onChange={(e) => setTitleText(e.target.value)}
              className="border rounded-sm px-2 py-1"
              value={titleText}
            />
            <input
              onChange={(e) => setDescriptionText(e.target.value)}
              className="border rounded-sm px-1 py-1"
              value={descriptionText}
            />
          </div>
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
