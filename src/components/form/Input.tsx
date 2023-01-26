import { Component, JSX, splitProps } from "solid-js";
import Generic from "./Generic";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  description: string;
  label: string;
}

const Input: Component<InputProps> = (props) => {
  const [, rest] = splitProps(props, ["name", "description", "label"]);

  return (
    <Generic
      name={props.name}
      description={props.description}
      label={props.label}
    >
      <input
        {...rest}
        name={props.name}
        class="form__input"
        classList={{
          ...(props.class && { [props.class]: true }),
          ...rest.classList,
        }}
        type="text"
      />
    </Generic>
  );
};

export default Input;
