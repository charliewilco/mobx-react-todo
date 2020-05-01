import * as React from "react";
import produce from "immer";

interface ITodoListState {
  modalOpen: boolean;
  selected: null | string;
}

export enum TodoActions {
  OPEN_MODAL = "OPEN_MODAL",
  DISMISS_MODAL = "DISMISS_MODAL"
}

export type Action = {
  type: TodoActions.OPEN_MODAL | TodoActions.DISMISS_MODAL;
};

export const reducer: React.Reducer<ITodoListState, Action> = produce(
  (draft: ITodoListState, action: Action) => {
    switch (action.type) {
      case TodoActions.DISMISS_MODAL: {
        draft.modalOpen = false;
        draft.selected = null;

        break;
      }

      case TodoActions.OPEN_MODAL: {
        draft.modalOpen = true;
        break;
      }
    }
  }
);
