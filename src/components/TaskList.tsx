import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleTaskCompleted, onDeleteTask }) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTaskCompleted={onToggleTaskCompleted}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
