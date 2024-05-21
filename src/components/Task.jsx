/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Task.module.css";
import { useTodo } from "../context/TodoContext";

function Task({ task }) {
  const { onDeleteTask, onToggleTask } = useTodo();

  return (
    <li
      className={`${styles.todoItem} ${
        task.completed ? styles.todoItemCompleted : styles.todoItem
      }`}
    >
      <div className={styles.inputItem}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
        <span
          className={`${styles.span} ${
            task.completed ? styles.spanCompleted : styles.span
          }`}
        >
          {task.name}
        </span>
      </div>
      <div className={styles.btn}>
        <button
          className={`${styles.itemBtn} ${
            task.completed ? styles.itemBtnCompleted : styles.itemBtn
          }`}
          onClick={() => onDeleteTask(task.id)}
          disabled={task.completed}
        >
          delete
        </button>
        <Link to={`todo/${task.id}`}>
          <button
            className={`${styles.itemBtn} ${
              task.completed ? styles.itemBtnCompleted : styles.itemBtn
            }`}
          >
            edit
          </button>
        </Link>
      </div>
    </li>
  );
}

export default Task;
