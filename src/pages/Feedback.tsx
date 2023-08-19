import { A, useNavigate, useParams } from "@solidjs/router";
import { Component, createSignal, For, Show } from "solid-js";
import Card from "../components/Card";
import Comment from "../components/Comment";

import "./Feedback.scss";

import { axios } from "../api_config";
import Back from "../components/Back";
import { encodeFormData } from "../helpers/encodeFormData";
import { Request } from "../types";
import { createStore } from "solid-js/store";
import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";

const fetcher = async (id: number): Promise<Request> => {
  return axios.get(`/feedback/${id}`).then((res) => res.data);
};

const createComment = async ({
  id,
  formData,
}: {
  id: number;
  formData: string;
}) => {
  return axios.post(`/feedback/${id}/comment`, formData);
};

const Feedback: Component = () => {
  const { id } = useParams();
  if (isNaN(+id)) {
    const navigate = useNavigate();
    navigate("/", { replace: true });
  }

  const queryClient = useQueryClient();
  const query = createQuery(
    () => ["posts", +id],
    () => fetcher(+id)
  );
  const addMutation = createMutation({
    mutationFn: createComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
  const [errors, setErrors] = createStore<{ [key: string]: string }>();

  const [comment, setComment] = createSignal("");
  const leftInComment = () => 250 - comment().length;

  const handleNewComment = (e: any) => {
    e.preventDefault();
    try {
      addMutation.mutate({
        id: +id,
        formData: encodeFormData(e.currentTarget),
      });
    } catch (err) {
      setErrors(err.response.data);
    }
    setComment("");
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
          <Show when={query.data} fallback={<p>Loading...</p>}>
            <Card request={query.data}></Card>

            <Show when={query.data.comments.length > 0}>
              <ul class="comment__list">
                <For each={query.data.comments}>
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
                    when={leftInComment() >= 0}
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
