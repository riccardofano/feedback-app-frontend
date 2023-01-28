import { A, useParams } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
  Suspense,
} from "solid-js";
import Card from "../components/Card";
import Comment from "../components/Comment";

import "./Feedback.scss";

import Back from "../components/Back";
import axios from "axios";
import { Request } from "../types";
import { encodeFormData } from "../helpers/encodeFormData";

const fetcher = async (id: number): Promise<Request> => {
  return axios
    .get(`http://localhost:8000/feedback/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const Feedback: Component = () => {
  const { id } = useParams();
  if (isNaN(+id)) {
    const navigate = useNavigate();
    navigate("/", { replace: true });
  }

  const [request, { mutate }] = createResource(+id, fetcher);

  const [comment, setComment] = createSignal("");
  const leftInComment = () => 250 - comment().length;

  const handleNewComment = (e: any) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8000/feedback/${id}/comment`,
        encodeFormData(e.currentTarget)
      )
      .then((res) => {
        mutate((prev) => ({ ...prev, comments: [...prev.comments, res.data] }));
        setComment("");
      })
      .catch(console.error);
  };

  return (
    <div class="container spacer">
      <header class="feedback-header">
        <Back href="/" />

        <A href="./edit" class="btn btn--blue feedback-header__edit">
          Edit Feedback
        </A>
      </header>

      <main class="spacer">
        <Show when={request()} fallback={<p>Loading...</p>}>
          <Card request={request()}></Card>

          <Show when={request().comments.length > 0}>
            <ul class="comment__list">
              <For each={request().comments}>
                {(comment) => <Comment comment={comment} />}
              </For>
            </ul>
          </Show>

          <form class="comment-form" onSubmit={handleNewComment}>
            <h2 class="comment-form__title">Add Comment</h2>
            {/* TODO: don't hardcode username */}
            <input type="hidden" name="username" value="velvetround" />
            <textarea
              class="comment-form__input"
              name="content"
              cols="30"
              rows="2"
              placeholder="Type your comment here"
              value={comment()}
              onInput={(e) => setComment(e.currentTarget.value)}
            />
            <div class="comment-form__footer">
              <p class="comment-form__c-count">
                {leftInComment()} Character{leftInComment() === 1 ? "" : "s"}{" "}
                left
              </p>
              <button class="btn btn--huge btn--purple" type="submit">
                Post Comment
              </button>
            </div>
          </form>
        </Show>
      </main>
    </div>
  );
};

export default Feedback;
