import { A } from "@solidjs/router";
import { Component } from "solid-js";

import "./Back.scss";

interface BackProps {
  href: string;
}

const Back: Component<BackProps> = (props) => {
  return (
    <A class="go-back" href={props.href}>
      <img src="/assets/shared/icon-arrow-left.svg" alt="" />
      Go Back
    </A>
  );
};

export default Back;
