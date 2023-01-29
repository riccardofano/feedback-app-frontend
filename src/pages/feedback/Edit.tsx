import { A, useNavigate, useParams } from "@solidjs/router";
import { Component, createResource, JSX, Show } from "solid-js";

import Back from "../../components/Back";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Textarea from "../../components/form/Textarea";

import "./Edit.scss";

import { axios } from "../../api_config";
import { Request } from "../../types";
import { encodeFormData } from "../../helpers/encodeFormData";

const categories = ["UI", "UX", "Enhancement", "Feature", "Bug"];
const statuses = ["Suggestion", "Planned", "In-Progress", "Live"];

const fetcher = async (id: string): Promise<Request> => {
  return axios
    .get(`/feedback/${id}`)
    .then((res) => res.data)
    .catch(console.error);
};

const EditFeedback: Component = () => {
  const { id } = useParams();
  const [request] = createResource(id, fetcher);
  const navitage = useNavigate();

  const handleSubmit: JSX.EventHandler<
    HTMLFormElement,
    Event & { submitter: HTMLElement }
  > = (e) => {
    e.preventDefault();

    axios
      .patch(
        `http://localhost:8000/feedback/${id}/edit`,
        encodeFormData(e.currentTarget)
      )
      .then((res) => navitage(`/feedback/${res.data.id}`, { replace: true }))
      .catch((err) => console.error(err));
  };

  return (
    <div class="container container--skinny">
      <div class="container--inner">
        <header>
          <Back href={`/feedback/${id}`} />
        </header>

        <main class="form__container">
          <Show when={request()} fallback={<div>Loading...</div>}>
            <>
              <img
                class="floating-icon"
                src="/assets/shared/icon-edit-feedback.svg"
                alt=""
              />

              <h1 class="form-heading">Edit &lsquo;{request().title}&rsquo;</h1>

              <form class="form" onSubmit={handleSubmit}>
                <Input
                  name="title"
                  label="Feedback Title"
                  description="Add a short, descriptive headline"
                  value={request().title}
                />

                <Select
                  name="category"
                  label="Category"
                  description="Choose a category for your feedback"
                  options={categories}
                  value={request().category}
                />

                <Select
                  name="status"
                  label="Update Status"
                  description="Change feedback state"
                  options={statuses}
                  value={request().status}
                />

                <Textarea
                  name="description"
                  label="Feedback Details"
                  description="Include any specific comments on what should be improved, added, etc."
                  value={request().description}
                />

                <div class="form__footer">
                  <button class="form__delete-btn btn btn--red" type="button">
                    Delete
                  </button>
                  <A class="btn btn--dark-blue" href="/">
                    Cancel
                  </A>
                  <button class="btn btn--purple" type="submit">
                    Edit feedback
                  </button>
                </div>
              </form>
            </>
          </Show>
        </main>
      </div>
    </div>
  );
};

export default EditFeedback;
