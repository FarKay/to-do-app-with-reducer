/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import styles from "./EditTask.module.css";
import { useTodo } from "../context/TodoContext";
import { useNavigate } from "react-router-dom";

function EditTodo() {
  const { editTask, tasks } = useTodo();

  const [taskToEdit, setTaskToEdit] = useState({});

  useEffect(() => {
    const taskToEditID = window.location.href.split("/todo/")[1];
    const task = tasks.find((t) => t?.id === taskToEditID);

    setTaskToEdit(task);
  }, []);

  const navigate = useNavigate();
  function backTodoPage(e) {
    e.preventDefault();

    navigate("/");
  }

  return (
    <form
      className={styles.editContainer}
      onSubmit={(e) => {
        e.preventDefault();
        editTask(taskToEdit);
      }}
    >
      <div className={styles.name}>
        <label htmlFor="name" className={styles.labelName}>
          Name:
        </label>
        <input
          type="text"
          className={styles.nameInput}
          // value={taskToEdit.name}
          defaultValue={taskToEdit?.name ?? ""}
          onChange={(e) =>
            setTaskToEdit((t) => ({
              ...t,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div className={styles.btns}>
        <button className={styles.editBtn}>Edit Task</button>
        <button className={styles.backBtn} onClick={backTodoPage}>
          Back
        </button>
      </div>
    </form>
  );
}

export default EditTodo;
