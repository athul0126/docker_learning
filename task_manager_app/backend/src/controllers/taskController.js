const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); // ✅ Always returns an array
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};


exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title});
  await task.save();
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete task" });
  }
};