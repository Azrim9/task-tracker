interface TaskFilterButtonsProps {
  sortBy: "None" | "Title" | "Completed";
  onSetSortBy: (filter: "None" | "Title" | "Completed") => void;
}

const TaskSortButtons: React.FC<TaskFilterButtonsProps> = ({
  sortBy,
  onSetSortBy,
}) => {
  return (
    <div className="flex-col text-sm self-end px-2 py-1">
      <div className="flex gap-1">
        <button
          className={`px-2 py-0.5 rounded text-xs
              ${
                sortBy === "None"
                  ? "bg-white shadow text-blue-600 font-medium"
                  : "hover:bg-white hover:shadow text-gray-600"
              }`}
          onClick={() => onSetSortBy("None")}
        >
          None
        </button>
        <button
          className={`px-2 py-0.5 rounded text-xs
              ${
                sortBy === "Title"
                  ? "bg-white shadow text-blue-600 font-medium"
                  : "hover:bg-white hover:shadow text-gray-600"
              }`}
          onClick={() => onSetSortBy("Title")}
        >
          Title
        </button>
        <button
          className={`px-2 py-0.5 rounded text-xs
              ${
                sortBy === "Completed"
                  ? "bg-white shadow text-blue-600 font-medium"
                  : "hover:bg-white hover:shadow text-gray-600"
              }`}
          onClick={() => onSetSortBy("Completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TaskSortButtons;
