import { observable, action, computed, reaction } from "mobx";
import { Todo } from "./todo";

// Subject + Observer

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
    this.todos.unshift(new Todo(content));
    this.uiState.modalOpen = false;
  }

  @action.bound public removeTodo(id: string): void {
    const index = this.todos.findIndex(todo => todo.id === id);

    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  @action.bound public updateTask(task: string) {
    if (this.uiState.selected !== null) {
      const index = this.todos.findIndex(this._isSelected);

      if (index > -1) {
        this.todos[index].updateTask(task);
      }

      this.uiState.selected = null;
      this.uiState.modalOpen = false;
    }
  }

  private _isSelected = (todo: Todo) => {
    return todo.id === this.uiState.selected;
  };

  @computed get currentTask(): null | string {
    if (this.uiState.selected === null) {
      return null;
    }

    const index = this.todos.findIndex(this._isSelected);
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
