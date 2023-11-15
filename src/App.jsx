import { useState } from "react";
import "./App.css";

function App() {
  const todoList = [
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Finish ToDo app",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 3,
      title: "Enjoy",
      isComplete: false,
      isEditing: false,
    },
  ];

  const [todos, setTodos] = useState(todoList);
  const [todoInput, setTodoInput] = useState("");
  const [todoId, setTodoId] = useState(4);

  function addTodo(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) {
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: todoId, title: todoInput, isComplete: false },
    ]);
    setTodoInput("");
    handleTodoId();
  }

  function handleInput(e) {
    setTodoInput(e.target.value);
  }

  function handleTodoId() {
    setTodoId((prevId) => prevId + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos].filter((el) => el.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((el) => {
      if (el.id == id) {
        el.isComplete = !el.isComplete;
      }
      return el;
    });
    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const editableTodos = todos.map((el) => {
      if (el.id == id) {
        el.isEditing = true;
      }
      return el;
    });
    setTodos(editableTodos);
  }

  function updateTodoText(event, id) {
    const updatedTodoText = todos.map((el) => {
      if (el.id == id) {
        if (event.target.value.trim().length == 0) {
          el.isEditing = false;
        } else {
          el.title = event.target.value;
          el.isEditing = false;
        }
      }
      return el;
    });
    setTodos(updatedTodoText);
  }

  function undoText(id) {
    const prevText = todos.map((el) => {
      if (el.id == id) {
        el.isEditing = false;
      }
      return el;
    });
    setTodos(prevText);
  }

  function completeAll() {
    setTodos((prevTodos) =>
      prevTodos.map((el) => ({
        ...el,
        isComplete: true,
      }))
    );
  }

  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="w-1/2 grid grid-rows-1 bg-slate-200 p-5 rounded">
          <h1 className="text-2xl font-bold mb-8">Todo App</h1>
          <form className="flex justify-between" onSubmit={addTodo}>
            <div>
              <label htmlFor="taskInput" className="text-gray-600 mt-3">
                What do you need to do?
              </label>
              <input
                value={todoInput}
                onChange={handleInput}
                type="text"
                id="taskInput"
                className="w-2/3 bg-transparent border-b border-gray-600 focus:ring-0"
              />
            </div>
          </form>
          <ul>
            {todos.map((el) => (
              <li className="flex mt-8 justify-between px-8" key={el.id}>
                <div>
                  <input
                    onChange={() => completeTodo(el.id)}
                    checked={el.isComplete}
                    type="checkbox"
                  />
                  {el.isEditing ? (
                    <input
                      type="text"
                      className="ms-2 bg-transparent border-b-4 border-black"
                      autoFocus
                      defaultValue={el.title}
                      onBlur={(event) => updateTodoText(event, el.id)}
                      onKeyDown={(event) => {
                        if (event.key == "Enter") {
                          updateTodoText(event, el.id);
                        } else if (event.key == "Escape") {
                          undoText(el.id);
                        }
                      }}
                    />
                  ) : (
                    <span
                      className={`ms-2 ${
                        el.isComplete == true ? "line-through" : ""
                      }`}
                      onDoubleClick={() => markAsEditing(el.id)}
                    >
                      {el.title}
                    </span>
                  )}
                </div>
                <button onClick={() => deleteTodo(el.id)}>X</button>
              </li>
            ))}
          </ul>

          <div className="w-100 px-8 bg-gray-600 h-[1px] my-8"></div>

          <div className="flex justify-between px-8">
            <button
              onClick={completeAll}
              className="border p-2 border-gray-600 rounded bg-white"
            >
              Check All
            </button>
            <p>3 items remaning</p>
          </div>

          <div className="w-100 px-8 bg-gray-600 h-[1px] my-8"></div>

          <div className="flex justify-between px-8 w-full">
            <div className="w-1/3 flex justify-between">
              <button className="border p-2 border-gray-600 rounded bg-white">
                All
              </button>
              <button className="border p-2 border-gray-600 rounded bg-white">
                Active
              </button>
              <button className="border p-2 border-gray-600 rounded bg-white">
                Completed
              </button>
            </div>
            <button className="border p-2 border-gray-600 rounded bg-white">
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
