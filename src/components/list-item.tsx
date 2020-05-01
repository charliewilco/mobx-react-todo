import * as React from "react";
import { Todo } from "../todo";
import { FiEdit3, FiCheckCircle, FiTrash2 } from "react-icons/fi";

interface IListItemProps {
  todo: Todo;
  onUpdate(id: string, task: string): void;
  onEdit(id: string): void;
  onRemove(id: string): void;
}

export function ListItem(props: IListItemProps) {
  const onRemove = () => props.onRemove(props.todo.id);
  const onEdit = () => props.onEdit(props.todo.id);
  const onToggle = () => props.todo.toggleStatus();
  const disabled = props.todo.completed;
  return (
    <li className="ListItem">
      <div className="Todo">
        <button className="ActionButton" onClick={onToggle}>
          <FiCheckCircle
            size={16}
            color={props.todo.completed ? "#9de4b5" : "#04060b"}
          />
        </button>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginLeft: 8
          }}
        >
          <div className="InlineContent">
            {props.todo.completed ? (
              <span>
                <b style={{ color: "#9de4b5" }}>Completed!</b>{" "}
                <span className="strike">{props.todo.task}</span>
              </span>
            ) : (
              <span>{props.todo.task}</span>
            )}
          </div>

          <div className="InlineActions">
            <button className="ActionButton" onClick={onRemove}>
              <FiTrash2 size={16} />
            </button>
            <button
              className="ActionButton"
              disabled={disabled}
              onClick={onEdit}
            >
              <FiEdit3 size={16} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
