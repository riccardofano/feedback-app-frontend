import { A, useParams } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import { Component, createSignal, For, Show } from "solid-js";
import Card from "../components/Card";
import Comment from "../components/Comment";

import "./Feedback.scss";

import data from "../data.json";
import Back from "../components/Back";

const Feedback: Component = () => {
  const { id } = useParams();
  if (isNaN(+id)) {
    const navigate = useNavigate();
    navigate("/", { replace: true });
  }

  const [comment, setComment] = createSignal("");
  const leftInComment = () => 250 - comment().length;

  const request = data.productRequests.find((request) => request.id === +id);
  return (
    <div class="container spacer">
      <header class="feedback-header">
        <Back />

        <button class="feedback-header__edit">Edit Feedback</button>
      </header>

      <main class="spacer">
        <Card request={request}></Card>

        <Show when={request.comments.length > 0}>
          <ul class="comment__list">
            <For each={request.comments}>
              {(comment) => <Comment comment={comment} />}
            </For>
          </ul>
        </Show>

        <form class="comment-form">
          <h2 class="comment-form__title">Add Comment</h2>
          <textarea
            class="comment-form__input"
            cols="30"
            rows="2"
            placeholder="Type your comment here"
            value={comment()}
            onInput={(e) => setComment(e.currentTarget.value)}
          />
          <div class="comment-form__footer">
            <p class="comment-form__c-count">
              {leftInComment()} Character{leftInComment() === 1 ? "" : "s"} left
            </p>
            <button class="comment-form__submit" type="submit">
              Post Comment
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Feedback;
