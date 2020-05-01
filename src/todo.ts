import { observable, action } from "mobx";
import { v4 as uuid } from "uuid";

export class Todo {
  public id: string;
  @observable public task: string;
  @observable public completed: boolean;

  constructor(content: string) {
    this.task = content;
    this.id = uuid();
    this.completed = false;
  }

  @action.bound public updateTask(updated: string): void {
    this.task = updated;
  }

  @action.bound public toggleStatus(): void {
    this.completed = !this.completed;
  }

  @action.bound public markCompleted(): void {
    this.completed = true;
  }

  @action.bound public markRemaining(): void {
    this.completed = false;
  }
}
