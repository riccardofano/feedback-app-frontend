import { A } from "@solidjs/router";
import axios from "axios";
import {
  Component,
  createResource,
  createSignal,
  For,
  lazy,
  Show,
} from "solid-js";
import Card from "../components/Card";
import { countComments } from "../helpers/countComments";
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
    .catch(console.error);
};

const roadmap = {
  planned: { name: "Planned", class: "orange" },
  "in-progress": { name: "In-Progress", class: "purple" },
  live: { name: "Live", class: "blue" },
};
const orderingOptions = {
  "most-upvoted": "Most upvoted",
  "least-upvoted": "Least upvoted",
  "most-comments": "Most comments",
  "least-comments": "Least comments",
};

const Home: Component = () => {
  const [data] = createResource(fetcher);

  const tags = ["All", "UI", "UX", "Enhancement", "Feature", "Bug"];
  const [currentTag, setCurrentTag] = createSignal("All");
  const [ordering, setOrdering] = createSignal("most-upvoted");

  const productRequests = () => {
    if (currentTag() === "All") {
      return data()?.productRequests;
    }
    return data()?.productRequests.filter(
      (request) => request.category === currentTag().toLowerCase()
    );
  };

  const orderedRequests = () => {
    const [order, orderBy] = ordering().split("-");
    const orderFn = (a: number, b: number) => {
      return order === "least" ? a - b : b - a;
    };

    return productRequests()?.sort((a, b) => {
      if (orderBy === "upvoted") {
        return orderFn(a.upvotes, b.upvotes);
      }
      return orderFn(countComments(a.comments), countComments(b.comments));
    });
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
            <select
              value={ordering()}
              onChange={(e) => setOrdering(e.currentTarget.value)}
            >
              <For each={Object.entries(orderingOptions)}>
                {([value, display]) => <option value={value}>{display}</option>}
              </For>
            </select>
          </label>
          <A href="/feedback/new" class="btn btn--purple">
            + Add Feedback
          </A>
        </header>
        <main class="suggestions">
          <Show
            when={orderedRequests()?.length > 0}
            fallback={<NoSuggestions />}
          >
            <For each={orderedRequests()}>
              {(request) => <Card request={request} />}
            </For>
          </Show>
        </main>
      </div>
    </div>
  );
};

export default Home;
