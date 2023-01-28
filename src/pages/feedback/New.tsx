import { A, Navigate, useNavigate } from "@solidjs/router";
import axios from "axios";
import { Component, JSX } from "solid-js";

import Back from "../../components/Back";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Textarea from "../../components/form/Textarea";
import { encodeFormData } from "../../helpers/encodeFormData";

import "./New.scss";

const categories = ["UI", "UX", "Enhancement", "Feature", "Bug"];

const NewFeedback: Component = () => {
  const navitage = useNavigate();

  const handleSubmit: JSX.EventHandler<
    HTMLFormElement,
    Event & { submitter: HTMLElement }
  > = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/feedback/new",
        encodeFormData(e.currentTarget)
      )
      .then((res) => navitage(`/feedback/${res.data.id}`, { replace: true }))
      .catch((err) => console.error(err));
  };

  return (
    <div class="container container--skinny">
      <header>
        <Back href="/" />
      </header>

      <main class="form__container">
        <img
          class="floating-icon"
          src="/assets/shared/icon-new-feedback.svg"
          alt=""
        />

        <h1>Create new Feedback</h1>

        <form class="form" onSubmit={handleSubmit}>
          <Input
            name="title"
            label="Feedback Title"
            description="Add a short, descriptive headline"
          />

          <Select
            name="category"
            label="Category"
            description="Choose a category for your feedback"
            options={categories}
          />

          <Textarea
            name="description"
            label="Feedback Details"
            description="Include any specific comments on what should be improved, added, etc."
          />

          <div class="form__footer grid-end">
            <A class="btn btn--dark-blue" href="/">
              Cancel
            </A>
            <button class="btn btn--purple" type="submit">
              Add feedback
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewFeedback;
