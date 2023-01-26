import { A } from "@solidjs/router";
import { Component, For } from "solid-js";
import Card from "../components/Card";

import data from "../data.json";

import "./Home.scss";

const Home: Component = () => {
  const productRequests = data.productRequests;
  const tags = ["UI", "UX", "Enchancement", "Feature", "Bug"];
  const roadmap = {
    planned: { name: "Planned", class: "orange", count: 0 },
    "in-progress": { name: "In-Progress", class: "purple", count: 0 },
    live: { name: "Live", class: "blue", count: 0 },
  };

  data.productRequests.forEach((request) => {
    if (request.status in roadmap) {
      roadmap[request.status].count += 1;
    }
  });

  return (
    <div class="grid container">
      <aside>
        <header class="header">
          <h1 class="header__title">Frontend Mentor</h1>
          <p class="header__desc">Feedback Board</p>
        </header>
        <section class="tags">
          <A class="tag" href="/">
            All
          </A>
          <For each={tags}>
            {(tag) => (
              <A class="tag" href={`/${tag.toLowerCase()}`} end>
                {tag}
              </A>
            )}
          </For>
        </section>
        <section class="milestones">
          <div class="milestones__header">
            <p class="milestones__header__title">Roadmap</p>
            <A class="milestones__header__link" href="/roadmap">
              View
            </A>
          </div>
          <ul class="milestones__list">
            <For each={Object.keys(roadmap)}>
              {(milestone) => {
                const m = roadmap[milestone];
                return (
                  <li class="milestone">
                    <span class={`milestone__color ${m.class}`} />
                    <p class="milestone__text">{m.name}</p>
                    <span class="milestone__count">{m.count}</span>
                  </li>
                );
              }}
            </For>
          </ul>
        </section>
      </aside>
      <div>
        <header class="suggestions__banner">
          <img src="/assets/suggestions/icon-suggestions.svg" alt="" />
          <p>6 Suggestions</p>
          <label>
            Sort by:
            <select>
              <option value="">Most Upvotes</option>
              <option value="">Least Upvotes</option>
              <option value="">Most Comments</option>
              <option value="">Least Comments</option>
            </select>
          </label>
          <button>+ Add Feedback</button>
        </header>
        <main class="suggestions">
          <For each={productRequests}>
            {(request) => <Card request={request} />}
          </For>
        </main>
      </div>
    </div>
  );
};

export default Home;
