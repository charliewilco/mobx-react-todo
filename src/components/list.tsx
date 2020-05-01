import * as React from "react";
import { observer } from "mobx-react-lite";
import { ListItem } from "./list-item";
import { Todo } from "../todo";
import { useTodos } from "../context";

export interface IListProps {
  todos: Todo[];
}

const ObserverListItem = observer(ListItem);

export function List(props: IListProps): JSX.Element {
  const todos = useTodos();

  const onOpenModal = () => {
    todos.uiState.modalOpen = true;
  };

  const onEdit = (id: string) => {
    todos.uiState.modalOpen = true;
    todos.uiState.selected = id;
  };

  return (
    <div>
      <ul className="List">
        {props.todos.length > 0 ? (
          props.todos.map(t => (
            <ObserverListItem
              key={t.id}
              todo={t}
              onEdit={onEdit}
              onRemove={todos.removeTodo}
              onUpdate={(id, task) => t.updateTask(task)}
            />
          ))
        ) : (
          <div>
            <h2>Nothing to see here!</h2>
          </div>
        )}
      </ul>
      <div className="ActionTray">
        <button className="Button" type="button" onClick={onOpenModal}>
          Add New
        </button>
      </div>
    </div>
  );
}
