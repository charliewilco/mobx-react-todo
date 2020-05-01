import { observable } from "mobx";

export class UIState {
  @observable public modalOpen: boolean = false;
  @observable public select: string | null = null;
}
