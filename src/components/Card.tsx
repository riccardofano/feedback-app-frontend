import { A } from "@solidjs/router";
import { Component, createSignal, JSX, mergeProps, Show } from "solid-js";

import { Request } from "../types";
import { countComments } from "../helpers/countComments";
import "./Card.scss";
import axios from "axios";

type onClickEvent = JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;

interface CardProps {
  request: Request;
  type?: "vertical" | "horizontal";
  color?: string;
}

const Card: Component<CardProps> = (props) => {
  props = mergeProps({ type: "horizontal" }, props);
  const [upvoted, setUpvoted] = createSignal(props.request.upvoted);
  const [upvotes, setUpvotes] = createSignal(props.request.upvotes);

  const handleUpvote: onClickEvent = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/feedback/${props.request.id}/upvote`)
      .then((res) => {
        setUpvoted(res.data.upvoted);
        setUpvotes(res.data.upvotes);
      })
      .catch(console.error);
  };

  return (
    <A
      classList={{
        suggestion: props.type === "horizontal",
        "stack-card": props.type === "vertical",
        [props.color]: props.color !== undefined,
      }}
      href={`/feedback/${props.request.id}`}
    >
      <Show
        when={props.type === "horizontal"}
        fallback={
          <VerticalCard
            request={props.request}
            upvoted={upvoted()}
            upvotes={upvotes()}
            handleUpvote={handleUpvote}
            color={props.color}
          ></VerticalCard>
        }
      >
        <HorizonalCard
          request={props.request}
          upvoted={upvoted()}
          upvotes={upvotes()}
          handleUpvote={handleUpvote}
        ></HorizonalCard>{" "}
      </Show>
    </A>
  );
};

export default Card;

interface HorizontalCardProps {
  request: Request;
  upvoted: boolean;
  upvotes: number;
  handleUpvote: onClickEvent;
}

const HorizonalCard: Component<HorizontalCardProps> = (props) => {
  return (
    <>
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
      <div class="suggestion__info">
        <h2 class="suggestion__title">{props.request.title}</h2>
        <p class="suggestion__desc">{props.request.description}</p>
        <p class="pill suggestion__category">{props.request.category}</p>
      </div>
      <p class="suggestion__comments">
        <img src="/assets/shared/icon-comments.svg" alt="" />
        <span>{countComments(props.request.comments)}</span>
      </p>
    </>
  );
};

interface VerticalCardProps extends HorizontalCardProps {
  color: string;
}

const VerticalCard: Component<VerticalCardProps> = (props) => {
  return (
    <>
      <p class="stack-card__status">
        <span class={props.color}></span>
        {props.request.status}
      </p>
      <h3 class="stack-card__title">{props.request.title}</h3>
      <p class="stack-card__description">{props.request.description}</p>
      <span class="pill stack-card__category">{props.request.category}</span>

      <div class="stack-card__footer">
        <button
          class="upvote horizontal"
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
          {props.request.upvotes}
        </button>
        <p>
          <img
            src="/assets/shared/icon-comments.svg"
            alt="Number of comments"
          />
          {countComments(props.request.comments)}
        </p>
      </div>
    </>
  );
};
