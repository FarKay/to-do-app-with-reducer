/* eslint-disable react/prop-types */
import { useState } from "react";
import List from "../components/List";
import styles from "./Todo.module.css";
import { useTodo } from "../context/TodoContext";

function Todo() {
  const { onAddTask } = useTodo();

  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const id = crypto.randomUUID();
    const newTask = {
      id,
      name,
      completed: false,
    };

    onAddTask(newTask);

    setName("");
  }

  return (
    <main>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>My ToDo List</h1>
        <div className={styles.inputContainer}>
          <input
            className={styles.todoInput}
            type="text"
            placeholder="Add task..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className={styles.addBtn}>Add Task</button>
        </div>
        <List />
      </form>
    </main>
  );
}

export default Todo;
