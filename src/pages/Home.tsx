import { A } from "@solidjs/router";
import axios from "axios";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  lazy,
  Show,
} from "solid-js";
import Card from "../components/Card";
import { Request, User } from "../types";
const NoSuggestions = lazy(() => import("../components/NoSuggestions"));

import "./Home.scss";

const fetcher = async (): Promise<{
  currentUser: User;
  productRequests: Request[];
}> => {
  return axios
    .get("http://localhost:8000/feedback/all")
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const roadmap = {
  planned: { name: "Planned", class: "orange" },
  "in-progress": { name: "In-Progress", class: "purple" },
  live: { name: "Live", class: "blue" },
};

const Home: Component = () => {
  const [data] = createResource(fetcher);

  const tags = ["All", "UI", "UX", "Enhancement", "Feature", "Bug"];
  const [currentTag, setCurrentTag] = createSignal("All");

  const productRequests = () => {
    if (currentTag() === "All") {
      return data()?.productRequests;
    }
    return data()?.productRequests.filter(
      (request) => request.category === currentTag().toLowerCase()
    );
  };

  const roadmapCount = () =>
    productRequests()?.reduce((acc, request) => {
      acc[request.status] = (acc[request.status] ?? 0) + 1;
      return acc;
    }, {});

  return (
    <div class="grid container">
      <aside>
        <header class="header">
          <h1 class="header__title">Frontend Mentor</h1>
          <p class="header__desc">Feedback Board</p>
        </header>
        <section class="tags">
          <For each={tags}>
            {(tag) => (
              <button
                class="tag"
                classList={{ active: tag === currentTag() }}
                onClick={() => setCurrentTag(tag)}
              >
                {tag}
              </button>
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
                    <span class="milestone__count">
                      {roadmapCount()?.[milestone] || 0}
                    </span>
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
          <A href="/feedback/new" class="btn btn--purple">
            + Add Feedback
          </A>
        </header>
        <main class="suggestions">
          <Show
            when={productRequests()?.length > 0}
            fallback={<NoSuggestions />}
          >
            <For each={productRequests()}>
              {(request) => <Card request={request} />}
            </For>
          </Show>
        </main>
      </div>
    </div>
  );
};

export default Home;
