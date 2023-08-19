import { A } from "@solidjs/router";
import { Component, createSignal, JSX, mergeProps, Show } from "solid-js";

import { SimpleRequest } from "../types";
import { countComments } from "../helpers/countComments";
import "./Card.scss";
import { axios } from "../api_config";

type onClickEvent = JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;

interface CardProps {
  request: SimpleRequest;
  color?: string;
}

const Card: Component<CardProps> = (props) => {
  props = mergeProps({ type: "horizontal" }, props);
  const [upvoted, setUpvoted] = createSignal(props.request.upvoted);
  const [upvotes, setUpvotes] = createSignal(props.request.upvotes);

  const handleUpvote: onClickEvent = (e) => {
    e.preventDefault();

    axios
      .post(`/feedback/${props.request.id}/upvote`)
      .then((res) => {
        setUpvoted(res.data.upvoted);
        setUpvotes(res.data.upvotes);
      })
      .catch(console.error);
  };

  const upvoteButton = () => (
    <UpvoteButton
      upvoted={upvoted()}
      upvotes={upvotes()}
      handleUpvote={handleUpvote}
    />
  );

  return (
    <A
      class="suggestion"
      classList={{
        horizontal: props.color === undefined,
        [props.color]: props.color !== undefined,
      }}
      href={`/feedback/${props.request.id}`}
    >
      <Show when={props.color}>
        <p class="suggestion__status">
          <span class={props.color}></span>
          {props.request.status}
        </p>
      </Show>
      <div class="suggestion__start-btn">{upvoteButton()}</div>
      <div class="suggestion__info">
        <h2 class="suggestion__title">{props.request.title}</h2>
        <p class="suggestion__description">{props.request.description}</p>
        <p class="pill suggestion__category">{props.request.category}</p>
      </div>
      <div class="suggestion__footer">
        <div class="suggestion__end-btn">{upvoteButton()}</div>
        <p class="suggestion__comments">
          <img
            style={{ width: "18px", height: "16px" }}
            src="/assets/shared/icon-comments.svg"
            alt=""
          />
          <span>{props.request.commentAmount}</span>
        </p>
      </div>
    </A>
  );
};

export default Card;

interface UpvotedButtonProps {
  upvoted: boolean;
  upvotes: number;
  handleUpvote: onClickEvent;
}

const UpvoteButton: Component<UpvotedButtonProps> = (props) => {
  return (
    <button
      class="upvote suggestion__upvote"
      classList={{ upvoted: props.upvoted }}
      onClick={props.handleUpvote}
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
      {props.upvotes}
    </button>
  );
};
