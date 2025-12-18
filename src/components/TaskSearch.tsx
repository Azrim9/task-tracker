interface TaskSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ search, onSearchChange }) => {
  return (
    <div className="flex justify-center m-2">
      <input
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="border rounded-md px-3 py-1 w-64 focus:outline-blue-500"
      />
    </div>
  );
};

export default TaskSearch;
