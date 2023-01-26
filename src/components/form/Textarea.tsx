import { Component, For, JSX, splitProps } from "solid-js";
import Generic from "./Generic";

interface Textarea extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  description: string;
  label: string;
}

const Select: Component<Textarea> = (props) => {
  const [, rest] = splitProps(props, ["name", "description", "label"]);

  return (
    <Generic
      name={props.name}
      description={props.description}
      label={props.label}
    >
      <textarea
        {...rest}
        class="form__input"
        name={props.name}
        classList={{
          ...(props.class && { [props.class]: true }),
          ...rest.classList,
        }}
      ></textarea>
    </Generic>
  );
};

export default Select;
