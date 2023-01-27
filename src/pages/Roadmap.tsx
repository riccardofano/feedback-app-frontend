import { A } from "@solidjs/router";
import { Component } from "solid-js";
import Back from "../components/Back";
import Stack from "../components/Stack";

import "./Roadmap.scss";

import data from "../data.json";

const Roadmap: Component = () => {
  const dividedRequests = () => {
    return data.productRequests.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || []).concat([req]);
      return acc;
    }, {});
  };

  return (
    <div class="container roadmap">
      <header class="roadmap__header">
        <div>
          <Back class="roadmap__header__back" />
          <h1 class="roadmap__header__title">Roadmap</h1>
        </div>
        <A class="btn btn--purple" href="/feedback/new">
          + Add feedback
        </A>
      </header>

      <main class="roadmap__grid">
        <Stack
          title="Planned"
          color="orange"
          description="Ideas prioritized for research"
          requests={dividedRequests()["planned"]}
        />
        <Stack
          title="In-progress"
          color="purple"
          description="Currently being developed"
          requests={dividedRequests()["in-progress"]}
        />
        <Stack
          title="Live"
          color="blue"
          description="Released features"
          requests={dividedRequests()["live"]}
        />
      </main>
    </div>
  );
};

export default Roadmap;
