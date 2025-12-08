const TaskItem = ({ task, onToggleTaskCompleted, onDeleteTask }) => {
  return (
    <div>
      <li>
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTaskCompleted(task.id)}
          />
        </div>
        <div>{task.name}</div>
        <button onClick={() => onDeleteTask(task.id)}> Delete </button>
      </li>
    </div>
  );
};

export default TaskItem;
