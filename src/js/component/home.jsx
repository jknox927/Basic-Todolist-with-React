import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	// Handle input on Enter key press
	const pressEnter = (e) => {
		if (e.key === "Enter") {
			setTodos([{label: inputValue, done: false}, ...todos]);
			setInputValue("");
		}
	}

	// Handle delete on icon click
	const clickDelete = (index) => {
		setTodos(
			todos.filter(
				(t, currentIndex) =>
				index != currentIndex
			)
		)
	}

	// On load, populate list
	useEffect(async () => {
		const res = await fetch('https://assets.breatheco.de/apis/fake/todos/user/joshuaknox', {method: 'GET'});
		const data = await res.json();
		setTodos(data);
	}, [])

	// Run when list changes
	useEffect(async () => {
		const options = {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(todos)
		  };
		  const res = await fetch('https://assets.breatheco.de/apis/fake/todos/user/joshuaknox', options);
	}, [todos])

  return (
    <div className="container">
      <h1 className="text-center">todos</h1>
      <ul>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={pressEnter}
          placeholder="What needs to be done?"
        />
		{/*
			For each item in 'todos' and the index,
			Create a <li> element.
			On click function filters each item in the array
			to delete the clicked item.
		*/}
        {todos.map((item, index) => (
          <li>
            {item.label}{" "}
            <i
              className="fas fa-trash-alt"
              onClick={() => clickDelete(index)}
            ></i>
          </li>
        ))}
		<div className="tasksLeft">{todos.length} items left</div>
      </ul>
    </div>
  );
};

export default Home;
