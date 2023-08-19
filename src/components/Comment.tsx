import { axios } from "../api_config";
import { batch, Component, createSignal, For, Show } from "solid-js";
import { encodeFormData } from "../helpers/encodeFormData";
import { Comment as CommentType } from "../types";

import "./Comment.scss";
import "./form/Form.scss";
import { createStore } from "solid-js/store";

interface CommentProps {
  comment: CommentType;
  class?: string;
}

const Comment: Component<CommentProps> = (props) => {
  const [isReplying, setIsReplying] = createSignal(false);
  const [reply, setReply] = createSignal("");
  const [replies, setReplies] = createSignal(props.comment.replies);
  const [errors, setErrors] = createStore<{ [key: string]: string }>();

  const handleReplySubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(
        `/feedback/${props.comment.idRequest}/comment/${props.comment.id}/reply`,
        encodeFormData(e.currentTarget)
      )
      .then((res) => {
        batch(() => {
          setReplies((replies) => [...replies, res.data]);
          setIsReplying(false);
          setReply("");
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setErrors(err.response.data);
        } else {
          console.error(err.message);
        }
      });
  };

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
        <button
          class="comment__reply-btn"
          onClick={() => setIsReplying(!isReplying())}
        >
          Reply
        </button>
        <p class="comment__content">
          <Show when={props.comment.replyingTo}>
            <span class="comment__mention">@{props.comment.replyingTo}</span>
          </Show>
          {props.comment.content}
        </p>
        <Show when={isReplying()}>
          <form class="reply-form" onSubmit={handleReplySubmit}>
            {/* TODO: don't hardcode username */}
            <input type="hidden" name="username" value="velvetround" />
            <input
              type="hidden"
              name="to"
              value={props.comment.user.username}
            />
            <textarea
              class="form__textarea"
              name="content"
              placeholder="Type your reply here"
              value={reply()}
              onInput={(e) => setReply(e.currentTarget.value)}
            />
            {errors.content && (
              <span class="form__error">{errors.content}</span>
            )}
            <button class="btn btn--purple" type="submit">
              Post reply
            </button>
          </form>
        </Show>
      </div>

      <Show when={replies().length > 0}>
        <div class="comment__line" />

        <ul class="replies">
          <For each={replies()}>
            {(reply) => <Comment class="reply" comment={reply} />}
          </For>
        </ul>
      </Show>
    </li>
  );
};

export default Comment;
