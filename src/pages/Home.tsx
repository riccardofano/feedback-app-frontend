import { A } from "@solidjs/router";
import { axios } from "../api_config";
import { Component, For, lazy, Show } from "solid-js";
import { SimpleRequest, User } from "../types";

import Aside from "../components/Aside";
import Card from "../components/Card";
const NoSuggestions = lazy(() => import("../components/NoSuggestions"));

import "./Home.scss";
import { createLocalStorage } from "@solid-primitives/storage";
import { createQuery } from "@tanstack/solid-query";

const fetcher = async (): Promise<{
  currentUser: User;
  productRequests: SimpleRequest[];
}> => {
  return axios.get("/feedback/all").then((res) => res.data);
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
  const query = createQuery(() => ["posts"], fetcher);

  const tags = ["All", "UI", "UX", "Enhancement", "Feature", "Bug"];
  const [filters, setFilters] = createLocalStorage({
    prefix: "rf-feedback-app",
  });

  if (!filters.tag) setFilters("tag", "All");
  if (!filters.ordering) setFilters("ordering", "most-upvoted");

  const productRequests = () => {
    if (filters.tag === "All") {
      return query.data?.productRequests;
    }

    return query.data?.productRequests.filter(
      (request) => request.category === filters.tag.toLowerCase()
    );
  };

  const orderedRequests = () => {
    const [order, orderBy] = filters.ordering.split("-");
    const orderFn = (a: number, b: number) => {
      return order === "least" ? a - b : b - a;
    };

    return productRequests()?.sort((a, b) => {
      if (orderBy === "upvoted") {
        return orderFn(a.upvotes, b.upvotes);
      }
      return orderFn(a.commentAmount, b.commentAmount);
    });
  };

  const roadmapCount = () =>
    productRequests()?.reduce((acc, request) => {
      acc[request.status] = (acc[request.status] ?? 0) + 1;
      return acc;
    }, {});

  return (
    <div class="grid container">
      <Aside
        currentTag={filters.tag}
        tags={tags}
        handleTagChange={(tag: string) => setFilters("tag", tag)}
        roadmap={roadmap}
        roadmapCount={roadmapCount()}
      />
      <div>
        <header class="suggestions__banner">
          <img
            style={{ width: "23px", height: "24px" }}
            src="/assets/suggestions/icon-suggestions.svg"
            alt=""
          />
          <p>{roadmapCount()?.["suggestion"] || 0} Suggestions</p>
          <label>
            Sort by:
            <select
              value={filters.ordering}
              onChange={(e) => setFilters("ordering", e.currentTarget.value)}
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
