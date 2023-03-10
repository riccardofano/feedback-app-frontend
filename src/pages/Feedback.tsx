import { A, useNavigate, useParams } from "@solidjs/router";
import { Component, createResource, createSignal, For, Show } from "solid-js";
import Card from "../components/Card";
import Comment from "../components/Comment";

import "./Feedback.scss";

import { axios } from "../api_config";
import Back from "../components/Back";
import { encodeFormData } from "../helpers/encodeFormData";
import { Request } from "../types";
import { createStore } from "solid-js/store";

const fetcher = async (id: number): Promise<Request> => {
  return axios
    .get(`/feedback/${id}`)
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
  const [errors, setErrors] = createStore<{ [key: string]: string }>();

  const [comment, setComment] = createSignal("");
  const leftInComment = () => 250 - comment().length;

  const handleNewComment = (e: any) => {
    e.preventDefault();

    axios
      .post(`/feedback/${id}/comment`, encodeFormData(e.currentTarget))
      .then((res) => {
        mutate((prev) => ({ ...prev, comments: [...prev.comments, res.data] }));
        setComment("");
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
    <div class="container">
      <div class="container--inner spacer">
        <header class="feedback-header">
          <Back href="/" />

          <A href="./edit" class="btn btn--blue btn--huge">
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
                class="form__input comment-form__input"
                name="content"
                cols="30"
                rows="2"
                placeholder="Type your comment here"
                value={comment()}
                onInput={(e) => setComment(e.currentTarget.value)}
              />
              {errors.content && (
                <span class="form__error">{errors.content}</span>
              )}
              <div class="comment-form__footer">
                <p class="comment-form__c-count">
                  <Show
                    when={leftInComment() > 0}
                    fallback={
                      <span class="comment-form--danger">
                        Too many characters!
                      </span>
                    }
                  >
                    {leftInComment()} Character
                    {leftInComment() === 1 ? "" : "s"} left
                  </Show>
                </p>
                <button class="btn btn--huge btn--purple" type="submit">
                  Post Comment
                </button>
              </div>
            </form>
          </Show>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
