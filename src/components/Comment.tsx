import { Component, For, Show } from "solid-js";
import { Comment as CommentType } from "../types";

import "./Comment.scss";

interface CommentProps {
  comment: CommentType;
  class?: string;
}

const Comment: Component<CommentProps> = (props) => {
  return (
    <li class="comment" classList={{ [props?.class]: props.class?.length > 0 }}>
      <div class="comment__box">
        <img
          class="comment__image"
          src={`/assets/user-images${props.comment.user.image}`}
          alt=""
        />
        <p class="comment__user">
          <span class="comment__name">{props.comment.user.name}</span>
          <span class="comment__username">{props.comment.user.username}</span>
        </p>
        <button class="comment__reply-btn">Reply</button>
        <p class="comment__content">
          <Show when={props.comment.replyingTo}>
            <span class="comment__mention">@{props.comment.replyingTo}</span>
          </Show>
          {props.comment.content}
        </p>
      </div>

      <Show when={props.comment.replies}>
        <div class="comment__line" />

        <ul class="replies">
          <For each={props.comment.replies}>
            {(reply) => <Comment class="reply" comment={reply} />}
          </For>
        </ul>
      </Show>
    </li>
  );
};

export default Comment;
