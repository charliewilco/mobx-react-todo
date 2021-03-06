import * as React from "react";

interface ITodoForm {
  value: string | null;
  onSubmit(value: string): void;
}

export default function TodoForm(props: ITodoForm) {
  const [value, setValue] = React.useState(
    props.value === null ? "" : props.value
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    props.onSubmit(value);

    setValue("");
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input className="Input" value={value} onChange={handleChange} />
      <div className="Tray">
        <button className="Button" type="submit" disabled={value.length === 0}>
          Submit
        </button>
      </div>
    </form>
  );
}
