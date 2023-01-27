import { A, Navigate, useParams } from "@solidjs/router";
import { Component } from "solid-js";

import Back from "../../components/Back";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Textarea from "../../components/form/Textarea";

import "./Edit.scss";

import data from "../../data.json";

const categories = ["UI", "UX", "Enhancement", "Feature", "Bug"];
const statuses = ["Suggestion", "Planned", "In-Progress", "Live"];

const EditFeedback: Component = () => {
  const { id } = useParams();
  const request = data.productRequests.find((request) => request.id === +id);

  if (!request) {
    Navigate({ href: "/" });
  }

  return (
    <div class="container container--skinny">
      <header>
        <Back />
      </header>

      <main class="form__container">
        <img
          class="floating-icon"
          src="/assets/shared/icon-edit-feedback.svg"
          alt=""
        />

        <h1>Edit &lsquo;{request.title}&rsquo;</h1>

        <form class="form">
          <Input
            name="title"
            label="Feedback Title"
            description="Add a short, descriptive headline"
            value={request.title}
          />

          <Select
            name="category"
            label="Category"
            description="Choose a category for your feedback"
            options={categories}
            value={request.category}
          />

          <Select
            name="status"
            label="Update Status"
            description="Change feedback state"
            options={statuses}
            value={request.status}
          />

          <Textarea
            name="details"
            label="Feedback Details"
            description="Include any specific comments on what should be improved, added, etc."
            value={request.description}
          />

          <div class="form__footer">
            <button class="form__delete-btn btn btn--red" type="button">
              Delete
            </button>
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

export default EditFeedback;