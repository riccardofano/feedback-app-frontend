import { A } from "@solidjs/router";
import { Component, createSignal, JSX } from "solid-js";

import { Request } from "../types";
import { countComments } from "../helpers/countComments";
import "./Card.scss";
import axios from "axios";

interface CardProps {
  request: Request;
}

const Card: Component<CardProps> = (props) => {
  const [upvoted, setUpvoted] = createSignal(props.request.upvoted);

  const handleUpvote: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    e
  ) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/feedback/${props.request.id}/upvote`)
      .then((res) => setUpvoted(res.data))
      .catch(console.error);
  };

  return (
    <A class="suggestion" href={`/feedback/${props.request.id}`}>
      <button
        class="upvote suggestion__upvote"
        classList={{ upvoted: upvoted() }}
        onClick={handleUpvote}
      >
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke="#4661E6"
            stroke-width="2"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
        {props.request.upvotes}
      </button>
      <div class="suggestion__info">
        <h2 class="suggestion__title">{props.request.title}</h2>
        <p class="suggestion__desc">{props.request.description}</p>
        <p class="pill suggestion__category">{props.request.category}</p>
      </div>
      <p class="suggestion__comments">
        <img src="/assets/shared/icon-comments.svg" alt="" />
        <span>{countComments(props.request.comments)}</span>
      </p>
    </A>
  );
};

export default Card;
