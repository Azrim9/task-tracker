import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilterButtons from "./components/TaskFilterButtons";
import DeleteAllCompletedButton from "./components/DeleteAllCompletedButton";
import TaskSearch from "./components/TaskSearch";
import TaskStats from "./components/TaskStats";
import useTasks from "./hooks/useTasks";
import TaskSortButtons from "./components/TaskSortButtons";

function App() {
  const {
    tasks,
    filter,
    search,
    sortBy,
    sortedTasks,
    totalTaskCount,
    completedTaskCount,
    activeTaskCount,
    setFilter,
    setSearch,
    setSortBy,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleToggleTaskCompleted,
    handleDeleteTaskCompleted,
  } = useTasks();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-2">
        <TaskSearch search={search} onSearchChange={setSearch} />
        <TaskStats
          total={totalTaskCount}
          active={activeTaskCount}
          completed={completedTaskCount}
        />
      </div>

      <TaskForm onAddTask={handleAddTask} />
      <TaskFilterButtons currentFilter={filter} onChangeFilter={setFilter} />
      <DeleteAllCompletedButton
        tasks={tasks}
        onDeleteTaskCompleted={handleDeleteTaskCompleted}
      />
      <TaskSortButtons sortBy={sortBy} onSetSortBy={setSortBy} />
      <TaskList
        tasks={sortedTasks}
        onEditTask={handleEditTask}
        onToggleTaskCompleted={handleToggleTaskCompleted}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
