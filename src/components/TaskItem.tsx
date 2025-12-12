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
    <li className="flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-white shadow-sm w-[98%]">
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTaskCompleted(task.id)}
        />

        {!isEditing ? (
          <div
            className={`flex flex-col overflow-y-auto max-h-36 break-all ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            <div className="text-lg font-semibold">{task.title}</div>
            <div className="text-sm text-gray-700">{task.description}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-[80%]">
            Title:
            <input
              onChange={(e) => setTitleText(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm focus:outline-blue-500 w-[50%]"
              value={titleText}
            />
            Description:
            <textarea
              onChange={(e) => setDescriptionText(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm focus:outline-blue-500 w-full"
              rows={10}
              value={descriptionText}
            />
          </div>
        )}
      </div>

      <div className="flex gap-1">
        <button
          className="bg-blue-600 hover:bg-blue-400 text-white px-2 py-1 rounded-md text-sm"
          onClick={() => handleEditClick()}
        >
          {!isEditing ? "Edit" : "Save"}
        </button>
        <button
          className="bg-red-600 hover:bg-red-400 text-white px-2 py-1 rounded-md text-sm"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
