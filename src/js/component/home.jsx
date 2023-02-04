import React, { useState, useEffect } from "react";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/joshuaknox",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.slice(1));
      })
      .catch((err) => console.error(err));
  };

  const putTasks = () => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ label: "CANNOT DELETE", done: false }, ...tasks]),
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/joshuaknox",
      options
    ).catch((err) => console.error(err));
  };

  const addTask = () => {
    setTasks([{ label: newTask, done: false }, ...tasks]);
    setNewTask("");
  };

  // Reference error: params 'item, index' exist in component local scope
  //   const deleteTask = () => {
  //     setTasks(tasks.filter((t, currentIndex) => index !== currentIndex));
  //   };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    putTasks();
  }, [tasks]);

  return (
    <div className="container p-5" style={{ width: "36rem" }}>
      <h1 className="text-center">Tasks</h1>
      <div className="d-flex input-group mb-3">
        <input
          className="form-control me-2 text-bg-light rounded"
          type="text"
          value={newTask}
          placeholder="Add a task..."
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button
          className="btn text-bg-success rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div className="taskList card">
        <ul className="list-group list-group-flush">
          {tasks.map((item, index) => (
            <li
              className="taskItem d-flex justify-content-between list-group-item"
              key={index}
            >
              <strong>{item.label}</strong>
              <button
                className="deleteBtn"
                onClick={() =>
                  setTasks(
                    tasks.filter((target, currentIndex) => index !== currentIndex)
                  )
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
