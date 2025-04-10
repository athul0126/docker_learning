import React, { useState, useEffect } from "react";
import TaskList from "./components/taskList";

function App() {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskList />
    </div>
  );
}

export default App;