import { observable, action, computed, reaction } from "mobx";
import { Todo } from "./todo";

export class TodoList {
  @observable public todos: Todo[];

  constructor(initialTodos?: Todo[]) {
    this.todos = !!initialTodos ? initialTodos : [];

    reaction(
      () => this.todos,
      () => {
        console.log(this.completed);
      }
    );
  }

  @action.bound public getTask(id: string | null): Todo | null {
    if (id === null) {
      console.log("Get task", null);

      return null;
    }
    const index = this.todos.findIndex(todo => todo.id === id);
    const result = index > -1 ? this.todos[0] : null;
    console.log("Get task", null);
    return result;
  }

  @action.bound public addTodo(content: string): void {
    this.todos.unshift(new Todo(content));
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

  @action.bound public updateTask(id: string, task: string) {
    const index = this.todos.findIndex(todo => todo.id === id);

    if (index > -1) {
      this.todos[index].task = task;
    }
  }

  @computed get all(): Todo[] {
    return this.todos;
  }

  @computed public get completed(): Todo[] {
    console.log("I called completed");
    return this.todos.filter(todo => todo.completed);
  }

  @computed get remaining(): Todo[] {
    return this.todos.filter(todo => !todo.completed);
  }
}
