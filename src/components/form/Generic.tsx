import { Component, JSX, Show } from "solid-js";

import "./Form.scss";

export interface GenericProps {
  name: string;
  label: string;
  description: string;
  error?: string;
}

interface PrivateGenericProps extends GenericProps {
  children: JSX.Element;
}

const Generic: Component<PrivateGenericProps> = (props) => {
  return (
    <>
      <label class="form__label" for={props.name}>
        <span>{props.label}</span>
        <p class="form__description">{props.description}</p>
        {props.children}
      </label>
      <Show when={props.error}>
        <span class="form__error">{props.error}</span>
      </Show>
    </>
  );
};

export default Generic;
