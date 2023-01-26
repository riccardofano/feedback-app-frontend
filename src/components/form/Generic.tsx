import { Component, JSX } from "solid-js";

import "./Form.scss";

interface GenericProps {
  name: string;
  label: string;
  description: string;
  children: JSX.Element;
}

const Generic: Component<GenericProps> = (props) => {
  return (
    <label class="form__label" for={props.name}>
      <span>{props.label}</span>
      <p class="form__description">{props.description}</p>
      {props.children}
    </label>
  );
};

export default Generic;
