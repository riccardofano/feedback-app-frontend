import { A } from "@solidjs/router";
import { Component } from "solid-js";

import Back from "../../components/Back";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Textarea from "../../components/form/Textarea";

import "./New.scss";

const categories = ["UI", "UX", "Enhancement", "Feature", "Bug"];

const NewFeedback: Component = () => {
  return (
    <div class="container container--skinny">
      <header>
        <Back />
      </header>

      <main class="form__container">
        <img
          class="floating-icon"
          src="/assets/shared/icon-new-feedback.svg"
          alt=""
        />

        <h1>Create new Feedback</h1>

        <form class="form">
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
            name="details"
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
