import { Component, For } from "solid-js";
import { Request } from "../types";
import Card from "./Card";

import "./Stack.scss";

interface StackProps {
  title: string;
  description: string;
  requests: Request[];
  color: string;
}

const Stack: Component<StackProps> = (props) => {
  return (
    <div class="stack">
      <h2 class="stack__title">
        {props.title} ({props.requests.length})
      </h2>
      <p class="stack__description">{props.description}</p>

      <ul class="stack__list">
        <For each={props.requests}>
          {(request) => (
            <li>
              <Card request={request} color={props.color} />
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Stack;
