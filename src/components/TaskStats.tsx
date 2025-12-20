interface TaskStatsProps {
  total: number;
  active: number;
  completed: number;
}

const TaskStats: React.FC<TaskStatsProps> = ({ total, active, completed }) => {
  return (
    <div className="flex justify-center gap-4 text-sm text-gray-500 m-2">
      <span> Total: {total} </span>
      <span> Active: {active}</span>
      <span> Completed: {completed}</span>
    </div>
  );
};

export default TaskStats;
