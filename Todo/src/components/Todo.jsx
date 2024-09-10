import { useId } from "react";
import editIcon from "../assets/pen-to-square-solid.svg";
import xmarkIcon from "../assets/circle-xmark-regular.svg";
import deleteIcon from "../assets/trash-can-solid.svg";

const Todo = ({
  todo,
  completeMathod,
  isEditing,
  edit,
  tigaredEdit,
  editMathod,
  deleteMathod
}) => {
  const id = useId();
  const [editText, setEditText] = edit;

  return (
    <div className={`todo ${todo.color} ${todo.isComplete ? "completed" : ""}`}>
      <div className="todoContent">
        <div className="checkBox">
          <input
            type="checkbox"
            id={id}
            checked={todo.isComplete}
            onChange={() => completeMathod(todo.id)}
          />
          <label htmlFor={id}></label>
        </div>

        <input
          type="text"
          disabled={!isEditing}
          autoFocus
          value={isEditing ? editText : todo.text}
          title={todo.text}
          className="todoText"
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => editMathod(todo)}
          onKeyUp={(e) => e.key === "Enter" && editMathod(todo)}
        />
      </div>

      {todo.isComplete || (
        <div className="controls">
          <button className="controlBtn" onClick={() => tigaredEdit(todo)}>
            {isEditing ? (
              <img src={xmarkIcon} alt="delete" />
            ) : (
              <img src={editIcon} alt="edit" />
            )}
          </button>
          <button className="controlBtn" onClick={() => deleteMathod(todo.id)}>
            <img src={deleteIcon} alt="delete" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
