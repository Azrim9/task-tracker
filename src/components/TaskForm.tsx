import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTask(titleText, descriptionText);
    setTitleText("");
    setDescriptionText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 m-2 shadow-sm border border-gray-300 rounded-lg bg-amber-50"
    >
      <span className="font-semibold text-lg self-center">
        Create your task list
      </span>

      <input
        onChange={(e) => setTitleText(e.target.value)}
        placeholder="Title"
        value={titleText}
        className="border rounded-md px-2 py-1 focus:outline-blue-500 w-full"
      />

      <textarea
        onChange={(e) => setDescriptionText(e.target.value)}
        placeholder="Description"
        value={descriptionText}
        rows={4}
        className="border rounded-md px-2 py-1 text-sm focus:outline-blue-500 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded-md w-24 self-center"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
