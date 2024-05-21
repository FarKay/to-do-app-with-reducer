/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const TodoContext = createContext();

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) ?? [],
  // tasks: [],
};

const editTask = (state, payload) => {
  const tasks = state.tasks;
  const taskToEdit = tasks.find((task) => task.id === payload.updateTask.id);
  const filteredTask = tasks.filter((task) => task.id !== taskToEdit.id);

  const newTasksList = [...filteredTask, payload.updateTask];
  // console.log(newTasksList);
  // console.log(payload);
  // console.log(filteredT  ask);

  return { ...state, tasks: newTasksList };
};

function reducer(state, action) {
  switch (action.type) {
    case "task/add":
      return {
        ...state.tasks,
        tasks: [...state.tasks, action.payload],
      };
    case "task/delete":
      return {
        ...state.tasks,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "task/edit":
      return editTask(state, action.payload);
    case "task/toggle":
      return {
        ...state.tasks,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
}

// const iniState = function () {
//   const localData = localStorage.getItem("task");
//   return localData ? JSON.parse(localData) : [];
// };

function TodoProvider({ children }) {
  const [{ tasks }, dispatch] = useReducer(reducer, initialState);

  //   const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(task) {
    dispatch({ type: "task/add", payload: task });
  }

  function handleDeleteTask(id) {
    dispatch({ type: "task/delete", payload: id });
  }

  function handleToggleTask(id) {
    dispatch({ type: "task/toggle", payload: { id } });
  }

  function editTask(updateTask) {
    dispatch({ type: "task/edit", payload: { updateTask } });
  }

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

  return (
    <TodoContext.Provider
      value={{
        tasks,
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask,
        onToggleTask: handleToggleTask,
        editTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined)
    throw new Error("TodoContext was used outside TodoProvider");
  return context;
}

export { TodoProvider, useTodo };
