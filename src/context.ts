import * as React from "react";
import { Todo } from "./todo";
import { TodoList } from "./todo-list";

const INITIAL_TODO = [
  new Todo("Call dad"),
  new Todo("Replace guitar strings"),
  new Todo("Fill out time sheet"),
  new Todo("Drink all the coffee"),
  new Todo("Learn Ruby"),
  new Todo("O M F G Delete your browser history")
];

const todos = new TodoList(INITIAL_TODO);

export const TodoContext = React.createContext(todos);

export function useTodos() {
  return React.useContext<TodoList>(TodoContext);
}
