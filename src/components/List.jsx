/* eslint-disable react/prop-types */
// import { useTodo } from "../context/TodoContext";
import Task from "./Task";
import styles from "./List.module.css";
import { useTodo } from "../context/TodoContext";
import { useEffect, useState } from "react";

function List() {
  const { tasks } = useTodo();

  const [sortTasks, setSortTask] = useState([]);

  useEffect(
    function () {
      const sortedArray = [...tasks].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSortTask(sortedArray);
    },
    [tasks]
  );

  return (
    <ul className={styles.todoList}>
      {sortTasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  );
}

export default List;
