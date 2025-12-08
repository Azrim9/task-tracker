import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mx-2 my-2">
      <input
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a Task"
        value={text}
        className="border rounded-sm px-2 py-1"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-400 text-white px-4 rounded-md"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
