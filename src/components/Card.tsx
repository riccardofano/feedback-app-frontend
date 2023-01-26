import { A } from "@solidjs/router";
import { Component } from "solid-js";

import { Request, Comment } from "../types";
import "./Card.scss";

interface CardProps {
  request: Request;
}

const Card: Component<CardProps> = (props) => {
  return (
    <A class="suggestion" href={`/feedback/${props.request.id}`}>
      <button class="suggestion__upvote" onClick={(e) => e.preventDefault()}>
        <img src="/assets/shared/icon-arrow-up.svg" alt="" />
        {props.request.upvotes}
      </button>
      <div class="suggestion__info">
        <h2 class="suggestion__title">{props.request.title}</h2>
        <p class="suggestion__desc">{props.request.description}</p>
        <p class="suggestion__category">{props.request.category}</p>
      </div>
      <p class="suggestion__comments">
        <img src="/assets/shared/icon-comments.svg" alt="" />
        <span>{countComments(props.request.comments)}</span>
      </p>
    </A>
  );
};

function countComments(comments: Array<Comment>): number {
  if (!comments) {
    return 0;
  }
  return comments.reduce((acc, comment) => acc + countReplies(comment) + 1, 0);
}

function countReplies(comment: Comment): number {
  if (!comment.replies) {
    return 0;
  }

  return countComments(comment.replies);
}

export default Card;
