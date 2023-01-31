import { A } from "@solidjs/router";
import { Component } from "solid-js";

import "./NoSuggestions.scss";

const NoSuggestions: Component = () => {
  return (
    <div class="no-suggestions">
      <img
        style={{ width: "23px", height: "24px" }}
        src="/assets/suggestions/illustration-empty.svg"
        alt=""
      />
      <h2>There is no feedback yet.</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>

      <A href="/feedback/new" class="btn btn--purple">
        + Add Feedback
      </A>
    </div>
  );
};

export default NoSuggestions;
