import * as React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import { Dialog } from "@reach/dialog";
import { observer } from "mobx-react-lite";

import { List } from "./list";
import TodoForm from "./form";
import { useTodos } from "../context";

interface IListViewProps {}

const ObserverList = observer(List);

export const ListView: React.FC<IListViewProps> = function() {
  const todos = useTodos();

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
            <ObserverList todos={todos.todos} />
          </TabPanel>
          <TabPanel>
            <ObserverList todos={todos.completed} />
          </TabPanel>
          <TabPanel>
            <ObserverList todos={todos.remaining} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Dialog
        aria-label="Update or Add a Todo"
        isOpen={todos.uiState.modalOpen}
        onDismiss={() => {
          todos.uiState.modalOpen = false;
        }}
      >
        <TodoForm
          value={todos.currentTask}
          onSubmit={value =>
            todos.uiState.selected !== null
              ? todos.updateTask(value)
              : todos.addTodo(value)
          }
        />
      </Dialog>
    </>
  );
};
