import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
const initialTodos = JSON.parse(localStorage.getItem("todos")) || []

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const [editText, setEditText] = useState("");

  useEffect(() =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  // handle Add functionality
  const handleAdd = (e) => {
    e.preventDefault();
    if (!todoText) {
      alert("Todo cannot be empty");
      return;
    }

    const isAvailable = todos.some(
      (todo) => todo.text.toLowerCase() === todoText.trim().toLowerCase()
    );
    if (isAvailable) {
      alert("Todo already exists");
      setTodoText("");
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: todoText.trim(),
      isComplete: false,
      isEditing: false,
      color: colorpicker(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setTodoText("");
  };

  // complete Functinality
  const handleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  // Delete Functinality
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Edit Functinality
  const tigaredEdit = (todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === todo.id
          ? { ...todo, isEditing: !prevTodo.isEditing }
          : prevTodo
      )
    );
    setEditText(todo.text);
  };

  const handleEdit = (paraTodo) => {
    const isAvailable = todos.some(
      (mainTodo) =>
        mainTodo.text.toLowerCase() === editText.trim().toLowerCase()
    );

    if (isAvailable) {
      tigaredEdit(paraTodo);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === paraTodo.id
          ? { ...todo, text: editText.trim(), isEditing: false }
          : todo
      )
    );

    setEditText("");
  };

  // colorpicker functionality for random color
  const colorpicker = () => {
    const color = ["todoColorOne", "todoColorTwo", "todoColorThree", "todoColorFour"]
    const randomColor = color[Math.floor(Math.random() * color.length)];
    
    if(randomColor === todos[0]?.color) {
      colorpicker()
    }else return randomColor;
  }

  return (
    <>
      <div className="todoContainer">
        <h1 className="todoHeading">What's the plan for today? </h1>
        <form className="todoForm" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Add Todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button type="submit" className="addBtn">
            Add Todo
          </button>
        </form>

        <div className="todoList">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              completeMathod={handleComplete}
              isEditing={todo.isEditing}
              edit={[editText, setEditText]}
              tigaredEdit={tigaredEdit}
              editMathod={handleEdit}
              deleteMathod={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
