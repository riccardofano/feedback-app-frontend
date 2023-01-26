import { Component } from "solid-js";

import "./NoSuggestions.scss";

const NoSuggestions: Component = () => {
  return (
    <div class="no-suggestions">
      <img src="/assets/suggestions/illustration-empty.svg" alt="" />
      <h2>There is no feedback yet.</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>

      <button>+ Add Feedback</button>
    </div>
  );
};

export default NoSuggestions;
