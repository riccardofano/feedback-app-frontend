import { A } from "@solidjs/router";
import { Component, For } from "solid-js";
import { countComments } from "../helpers/countComments";
import { Request } from "../types";

import "./Stack.scss";

interface StackProps {
  title: string;
  description: string;
  requests: Request[];
  color: string;
}

const Stack: Component<StackProps> = (props) => {
  return (
    <div class="stack">
      <h2 class="stack__title">
        {props.title} ({props.requests.length})
      </h2>
      <p class="stack__description">{props.description}</p>

      <ul class="stack__list">
        <For each={props.requests}>
          {(request) => (
            <li>
              <A
                class="stack-card"
                classList={{ [props.color]: true }}
                href={`/feedback/${request.id}`}
              >
                <p class="stack-card__status">
                  <span class={props.color}></span>
                  {request.status}
                </p>
                <h3 class="stack-card__title">{request.title}</h3>
                <p class="stack-card__description">{request.description}</p>
                <span class="pill stack-card__category">
                  {request.category}
                </span>

                <div class="stack-card__footer">
                  <button class="upvote horizontal">
                    <svg
                      width="10"
                      height="7"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 6l4-4 4 4"
                        stroke="#4661E6"
                        stroke-width="2"
                        fill="none"
                        fill-rule="evenodd"
                      />
                    </svg>
                    {request.upvotes}
                  </button>
                  <p>
                    <img
                      src="/assets/shared/icon-comments.svg"
                      alt="Number of comments"
                    />
                    {countComments(request.comments)}
                  </p>
                </div>
              </A>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Stack;
