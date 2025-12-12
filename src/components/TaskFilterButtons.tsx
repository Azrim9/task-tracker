type FilterType = "All" | "Active" | "Completed";
const filters = ["All", "Active", "Completed"] as const;

interface TaskFilterButtons {
  currentFilter: FilterType;
  onChangeFilter: (newFilter: FilterType) => void;
}

const TaskFilterButtons: React.FC<TaskFilterButtons> = ({
  currentFilter,
  onChangeFilter,
}) => {
  return (
    <div className="flex justify-center gap-2">
      {filters.map((filter) => (
        <button
          onClick={() => onChangeFilter(filter)}
          className={`border rounded-md px-3 py-1 text-white 
            ${
              currentFilter === filter
                ? "bg-blue-800"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TaskFilterButtons;
