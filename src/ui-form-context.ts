import * as React from "react";
import { observable, action, computed } from "mobx";

export class UIForm {
  @observable public answers: Map<string, string> = new Map();

  public readAnswer(key: string): string {
    const answer = this.answers.get(key);
    return answer || "";
  }

  @action.bound public writeAnswer(key: string, value: string): void {
    this.answers.set(key, value);
  }

  @computed get entries() {
    const object: Record<string, string> = {};

    for (let [key, val] of this.answers) {
      object[key] = val;
    }

    return object;
  }
}

const form = new UIForm();

const FormContext = React.createContext(form);

export function useForm() {
  const form = React.useContext(FormContext);

  const getValue = React.useCallback(
    (key: string) => {
      return form.readAnswer(key);
    },
    [form]
  );

  const onChange = React.useCallback(
    (e: React.ChangeEvent<any>, key: string) => {
      console.log(e.target.value, form.entries);
      form.writeAnswer(key, e.target.value);
    },
    [form]
  );

  return {
    getValue,
    onChange,
  };
}
