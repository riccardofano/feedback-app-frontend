import { Component, JSX, splitProps } from "solid-js";
import Generic, { GenericProps } from "./Generic";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & GenericProps;

const Input: Component<InputProps> = (props) => {
  const [, rest] = splitProps(props, ["name", "description", "label"]);

  return (
    <Generic
      name={props.name}
      description={props.description}
      label={props.label}
      error={props.error}
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
