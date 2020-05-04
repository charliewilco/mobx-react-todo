import * as React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "../ui-form-context";

export default observer(function SomeForm() {
  const { onChange, getValue } = useForm();

  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            value={getValue("foo")}
            onChange={(e) => onChange(e, "foo")}
          />
        </div>

        <div>
          <input
            type="text"
            value={getValue("bar")}
            onChange={(e) => onChange(e, "bar")}
          />
        </div>
      </form>
    </div>
  );
});
