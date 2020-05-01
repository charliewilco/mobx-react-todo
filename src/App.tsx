import * as React from "react";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { Todo } from "./todo";
import { TodoList } from "./todo-list";
import { ListView } from "./components/list-view";
import "mobx-react-lite/batchingForReactDom";

const todos = new TodoList([
  new Todo("Call dad"),
  new Todo("Replace guitar strings")
]);

const ObserverList = observer(ListView);

function App() {
  console.log(todos.completed);
  return (
    <div className="Container">
      <h1>Tasks</h1>
      <ObserverList
        getTask={todos.getTask}
        onAdd={todos.addTodo}
        onRemove={todos.removeTodo}
        onTaskUpdate={todos.updateTask}
        onToggleStatus={todos.updateTodoStatus}
        all={todos.todos}
        completed={todos.completed}
        remaining={todos.remaining}
      />
    </div>
  );
}

export default observer(App);
