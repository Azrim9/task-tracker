import type { Task } from "../types";

interface DeleteAllCompltedButtonProps {
  tasks: Task[];
  onDeleteTaskCompleted: () => void;
}

const DeleteAllCompletedButton: React.FC<DeleteAllCompltedButtonProps> = ({
  tasks,
  onDeleteTaskCompleted,
}) => {
  const hasCompleted = tasks.some((task) => task.completed);

  return (
    <div className="flex justify-center gap-2 m-2">
      <button
        onClick={() => onDeleteTaskCompleted()}
        className={`border rounded-md px-3 py-1 text-white ${
          hasCompleted ? "bg-red-500 hover:bg-red-400" : "bg-red-500"
        }`}
      >
        Delete Completed
      </button>
    </div>
  );
};

export default DeleteAllCompletedButton;
