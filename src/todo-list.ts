import { observable, action, computed, reaction } from "mobx";
import { Todo } from "./todo";

interface ITodoListUIState {
  selected: string | null;
  modalOpen: boolean;
}

export class TodoList {
  @observable public todos: Todo[];
  @observable public uiState: ITodoListUIState = {
    modalOpen: false,
    selected: null
  };

  constructor(initialTodos?: Todo[]) {
    this.todos = !!initialTodos ? initialTodos : [];

    reaction(
      () => this.todos.length,
      () => {
        console.log(
          `Number of todos not completed ${this.todos.length -
            this.completed.length}`
        );
      }
    );
  }

  @action.bound public getTask(id: string | null): string | null {
    if (id === null) {
      return null;
    }

    const index = this.todos.findIndex(todo => todo.id === id);
    const result = index > -1 ? this.todos[0].task : null;
    return result;
  }

  @action.bound public addTodo(content: string): void {
    console.log("Adding Todo");
    this.todos.unshift(new Todo(content));
    this.uiState.modalOpen = false;
  }

  @action.bound public removeTodo(id: string): void {
    const index = this.todos.findIndex(todo => todo.id === id);

    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  @action.bound public updateTodoStatus(id: string) {
    const index = this.todos.findIndex(todo => todo.id === id);

    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  }

  @action.bound public updateTask(task: string) {
    if (this.uiState.selected !== null) {
      const index = this.todos.findIndex(
        todo => todo.id === this.uiState.selected
      );

      if (index > -1) {
        this.todos[index].task = task;
      }

      this.uiState.selected = null;
      this.uiState.modalOpen = false;
    }
  }

  @computed get currentTask(): null | string {
    if (this.uiState.selected === null) {
      return null;
    }

    const index = this.todos.findIndex(
      todo => todo.id === this.uiState.selected
    );
    const result = index > -1 ? this.todos[0].task : null;
    return result;
  }

  @computed get all(): Todo[] {
    return this.todos;
  }

  @computed public get completed(): Todo[] {
    return this.todos.filter(todo => todo.completed);
  }

  @computed get remaining(): Todo[] {
    return this.todos.filter(todo => !todo.completed);
  }
}
