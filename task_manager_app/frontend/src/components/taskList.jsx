import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState({ title: "" });
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => {
        setTasks(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks");
      });
  };

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:5000/api/tasks", {
        title: newTask.title,
      })
      .then((res) => {
        setTasks((prev) => [...prev, res.data]);
        setNewTask({ title: "" });
      })
      .catch((err) => {
        console.error("Error adding task:", err);
        setError("Failed to add task");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Mark task as complete
  const markTaskAsDone = (id) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { completed: true })
      .then((res) => {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? res.data : task))
        );
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        setError("Failed to update task");
      });
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Task List</h2>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ title: e.target.value })}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: "0.5rem" }}>
            <strong>{task.title}</strong> -{" "}
            {task.completed ? (
              "✅ Done"
            ) : (
              <>
                ⏳ Pending{" "}
                <button onClick={() => markTaskAsDone(task._id)}>
                  Mark as Done
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
