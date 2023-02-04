import { Component, JSX, splitProps } from "solid-js";
import Generic, { GenericProps } from "./Generic";

type Textarea = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & GenericProps;

const Select: Component<Textarea> = (props) => {
  const [, rest] = splitProps(props, ["name", "description", "label"]);

  return (
    <Generic
      name={props.name}
      description={props.description}
      label={props.label}
      error={props.error}
    >
      <textarea
        {...rest}
        class="form__input"
        name={props.name}
        classList={{
          ...(props.class && { [props.class]: true }),
          ...rest.classList,
        }}
      />
    </Generic>
  );
};

export default Select;
