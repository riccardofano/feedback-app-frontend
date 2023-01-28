import { A } from "@solidjs/router";
import { Component } from "solid-js";

import "./Back.scss";

interface BackProps {
  href: string;
  class?: string;
}

const Back: Component<BackProps> = (props) => (
  <A class="go-back" classList={{ [props.class]: true }} href={props.href}>
    <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9L2 5l4-4"
        stroke="#4661E6"
        stroke-width="2"
        fill="none"
        fill-rule="evenodd"
      />
    </svg>
    Go Back
  </A>
);

export default Back;
