import { A } from "@solidjs/router";
import { axios } from "../api_config";
import { Component, Show } from "solid-js";
import Back from "../components/Back";
import Stack from "../components/Stack";
import { Request, User } from "../types";

import "./Roadmap.scss";
import { createQuery } from "@tanstack/solid-query";

const fetcher = async (): Promise<{
  currentUser: User;
  productRequests: Request[];
}> => {
  return axios.get("/feedback/all").then((res) => res.data);
};

const Roadmap: Component = () => {
  const query = createQuery(() => ["todos"], fetcher);

  // HACK: reset html overflow when you click 'view'
  // from the mobile homepage and the sidebar is open
  document.documentElement.style.overflow = "";

  const dividedRequests = () => {
    return query.data?.productRequests.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || []).concat([req]);
      return acc;
    }, {});
  };

  return (
    <div class="container roadmap">
      <header class="roadmap__header">
        <div>
          <Back href="/" class="roadmap__header__back" />
          <h1 class="roadmap__header__title">Roadmap</h1>
        </div>
        <A class="btn btn--purple" href="/feedback/new">
          + Add feedback
        </A>
      </header>

      <main class="roadmap__grid">
        <Show when={dividedRequests()} fallback={<div>Loading...</div>}>
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
        </Show>
      </main>
    </div>
  );
};

export default Roadmap;
