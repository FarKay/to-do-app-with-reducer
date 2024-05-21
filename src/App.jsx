import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import { TodoProvider } from "./context/TodoContext";
import EditTodo from "./pages/EditTodo";
("./pages/EditTodo");

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="todo/:id" element={<EditTodo />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;
