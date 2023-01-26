import { A } from "@solidjs/router";
import { Component } from "solid-js";

import "./Back.scss";

const Back: Component = () => {
  return (
    <A class="go-back" href="/">
      <img src="/assets/shared/icon-arrow-left.svg" alt="" />
      Go back
    </A>
  );
};

export default Back;
