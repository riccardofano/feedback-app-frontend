import { A, useNavigate } from "@solidjs/router";
import { axios } from "../../api_config";
import { Component, JSX } from "solid-js";

import Back from "../../components/Back";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Textarea from "../../components/form/Textarea";
import { encodeFormData } from "../../helpers/encodeFormData";

const categories = ["UI", "UX", "Enhancement", "Feature", "Bug"];

const NewFeedback: Component = () => {
  const navitage = useNavigate();

  const handleSubmit: JSX.EventHandler<
    HTMLFormElement,
    Event & { submitter: HTMLElement }
  > = (e) => {
    e.preventDefault();

    axios
      .post("/feedback/new", encodeFormData(e.currentTarget))
      .then((res) => navitage(`/feedback/${res.data.id}`, { replace: true }))
      .catch((err) => console.error(err));
  };

  return (
    <div class="container container--skinny">
      <div class="container--inner">
        <header>
          <Back href="/" />
        </header>

        <main class="form__container">
          <img
            class="floating-icon"
            src="/assets/shared/icon-new-feedback.svg"
            alt=""
          />

          <h1 class="form-heading">Create new Feedback</h1>

          <form class="form" onSubmit={handleSubmit}>
            <Input
              name="title"
              label="Feedback Title"
              description="Add a short, descriptive headline"
              placeholder="You must insert a title"
              value="My awesome feedback"
              required
            />

            <Select
              name="category"
              label="Category"
              description="Choose a category for your feedback"
              options={categories}
              required
            />

            <Textarea
              name="description"
              label="Feedback Details"
              description="Include any specific comments on what should be improved, added, etc."
              placeholder="You must insert a description"
              value="My great feedback details"
              required
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
    </div>
  );
};

export default NewFeedback;
