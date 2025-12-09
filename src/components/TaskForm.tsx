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
    <form onSubmit={handleSubmit} className="flex gap-2 mx-2 my-2">
      <input
        onChange={(e) => setTitleText(e.target.value)}
        placeholder="Title"
        value={titleText}
        className="border rounded-sm px-2 py-1"
      />
      <input
        onChange={(e) => setDescriptionText(e.target.value)}
        placeholder="Description"
        value={descriptionText}
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
