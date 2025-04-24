import { useState, useEffect } from "react";

const TaskManagementApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskInput,
        completed: false,
        dueDate: new Date().toISOString().split("T")[0], // default to today's date
      },
    ]);
    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all tasks
  });

  const taskCount = {
    total: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };

  const taskColorByDueDate = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    if (dueDate < today) return "bg-red-500"; // overdue
    if (dueDate === today) return "bg-green-500"; // due today
    return "bg-yellow-400"; // upcoming
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-gray-200 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
        {/* Add Task */}
        <div className="flex items-center space-x-4 mb-8">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="p-4 w-full text-xl rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Add a task..."
          />
          <button
            onClick={addTask}
            className="p-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Add Task
          </button>
        </div>

        {/* Task Filter */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-4">
            <button
              onClick={() => setFilter("all")}
              className="py-2 px-4 bg-gray-200 rounded-full text-lg font-medium hover:bg-yellow-500 hover:text-white transition duration-300"
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className="py-2 px-4 bg-gray-200 rounded-full text-lg font-medium hover:bg-yellow-500 hover:text-white transition duration-300"
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className="py-2 px-4 bg-gray-200 rounded-full text-lg font-medium hover:bg-yellow-500 hover:text-white transition duration-300"
            >
              Completed
            </button>
          </div>
          <div className="text-lg font-semibold">
            {`Total: ${taskCount.total} | Active: ${taskCount.active} | Completed: ${taskCount.completed}`}
          </div>
        </div>

        {/* Task List */}
        <ul className="space-y-6">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-6 h-6 rounded-full border-gray-300 text-yellow-600"
                />
                <span
                  className={`text-xl ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'} transition duration-300 ease-in-out`}
                  onClick={() => editTask(task.id, prompt("Edit task:", task.text))}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Date Button */}
                <button
                  className={`px-4 py-2 rounded-lg ${taskColorByDueDate(task.dueDate)} text-white`}
                >
                  {task.dueDate}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => editTask(task.id, prompt("Edit task:", task.text))}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-yellow-500 transition duration-300"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add some space between content and footer */}
        <div className="my-12"></div>
      </div>
    </div>
  );
};

export default TaskManagementApp;
