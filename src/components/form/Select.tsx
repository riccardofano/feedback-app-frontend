import { Component, For, JSX, splitProps } from "solid-js";
import Generic from "./Generic";

interface SelectProps extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  description: string;
  label: string;
  options: string[];
}

const Select: Component<SelectProps> = (props) => {
  const [, rest] = splitProps(props, [
    "name",
    "description",
    "label",
    "options",
  ]);

  return (
    <Generic
      name={props.name}
      description={props.description}
      label={props.label}
    >
      <select
        name={props.name}
        {...rest}
        class="form__input"
        classList={{
          ...(props.class && { [props.class]: true }),
          ...rest.classList,
        }}
      >
        <For each={props.options}>
          {(option) => <option value={option.toLowerCase()}>{option}</option>}
        </For>
      </select>
    </Generic>
  );
};

export default Select;
