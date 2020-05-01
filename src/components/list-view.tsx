import * as React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import { Dialog } from "@reach/dialog";
import { observer } from "mobx-react-lite";

import "@reach/tabs/styles.css";
import "@reach/dialog/styles.css";
import { Todo } from "../todo";
import { ListItem } from "./list-item";
import TodoForm from "./form";
import { Action, TodoActions, reducer } from "./reducer";

interface IListProps {
  todos: Todo[];
  onRemove(id: string): void;
  onToggleStatus(id: string): void;
  dispatch: React.Dispatch<Action>;
}

function List(props: IListProps): JSX.Element {
  return (
    <div>
      <ul className="List">
        {props.todos.length > 0 ? (
          props.todos.map(t => (
            <ObserverListItem
              key={t.id}
              todo={t}
              onToggleStatus={props.onToggleStatus}
              onEdit={id => props.dispatch({ type: TodoActions.EDIT_TODO, id })}
              onRemove={props.onRemove}
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
        <button
          className="Button"
          type="button"
          onClick={() =>
            props.dispatch({
              type: TodoActions.OPEN_MODAL
            })
          }
        >
          Add New
        </button>
      </div>
    </div>
  );
}

interface IListViewProps {
  completed: Todo[];
  all: Todo[];
  remaining: Todo[];
  getTask(id: string): Todo | null;
  onTaskUpdate(id: string, value: string): void;
  onToggleStatus(id: string): void;
  onRemove(id: string): void;
  onAdd(task: string): void;
}

const ObserverListItem = observer(ListItem);
const ObserverList = observer(List);

export const ListView: React.FC<IListViewProps> = function(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    modalOpen: false,
    selected: null,
    currentFilter: "All",
    todos: []
  });

  return (
    <>
      <Tabs>
        <TabList className="Filters">
          <Tab>All</Tab>
          <Tab>Completed</Tab>
          <Tab>Todo</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ObserverList
              dispatch={dispatch}
              onRemove={props.onRemove}
              onToggleStatus={props.onToggleStatus}
              todos={props.all}
            />
          </TabPanel>
          <TabPanel>
            <ObserverList
              dispatch={dispatch}
              onToggleStatus={props.onToggleStatus}
              onRemove={props.onRemove}
              todos={props.completed}
            />
          </TabPanel>
          <TabPanel>
            <ObserverList
              dispatch={dispatch}
              onToggleStatus={props.onToggleStatus}
              onRemove={props.onRemove}
              todos={props.remaining}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Dialog
        aria-label="Update or Add a Todo"
        isOpen={state.modalOpen}
        onDismiss={() =>
          dispatch({
            type: TodoActions.DISMISS_MODAL
          })
        }
      >
        <TodoForm
          value={props.getTask(state.selected)}
          onSubmit={value =>
            state.selected !== null
              ? props.onTaskUpdate(state.selected.id, value)
              : props.onAdd(value)
          }
        />
      </Dialog>
    </>
  );
};
