import { A } from "@solidjs/router";
import { Component, createSignal, For, Show } from "solid-js";

import "./Aside.scss";

interface AsideProps {
  currentTag: string;
  tags: string[];
  handleTagChange: (tag: string) => void;
  roadmap: { [key: string]: { name: string; class: string } };
  roadmapCount: { [key: string]: number } | undefined;
}

const Aside: Component<AsideProps> = (props) => {
  const [open, setOpen] = createSignal(false);

  const toggleSidebar = () => {
    setOpen(!open());
    document.documentElement.style.overflow = open() ? "hidden" : "";
  };

  return (
    <aside classList={{ open: open() }}>
      <header class="header">
        <div>
          <h1 class="header__title">Frontend Mentor</h1>
          <p class="header__desc">Feedback Board</p>
        </div>

        <button class="header__btn" onClick={toggleSidebar}>
          <Show
            when={open()}
            fallback={
              <img
                src="/assets/shared/mobile/icon-hamburger.svg"
                alt="Open menu bar"
              />
            }
          >
            <img
              src="/assets/shared/mobile/icon-close.svg"
              alt="Close menu bar"
            />
          </Show>
        </button>
      </header>
      <div class="sidebar">
        <section class="tags">
          <For each={props.tags}>
            {(tag) => (
              <button
                class="tag"
                classList={{ active: tag === props.currentTag }}
                onClick={() => props.handleTagChange(tag)}
              >
                {tag}
              </button>
            )}
          </For>
        </section>
        <section class="milestones">
          <div class="milestones__header">
            <p class="milestones__header__title">Roadmap</p>
            <A class="milestones__header__link" href="/roadmap">
              View
            </A>
          </div>
          <ul class="milestones__list">
            <For each={Object.keys(props.roadmap)}>
              {(milestone) => {
                const m = props.roadmap[milestone];
                return (
                  <li class="milestone">
                    <span class={`milestone__color ${m.class}`} />
                    <p class="milestone__text">{m.name}</p>
                    <span class="milestone__count">
                      {props.roadmapCount?.[milestone] || 0}
                    </span>
                  </li>
                );
              }}
            </For>
          </ul>
        </section>
      </div>
      <div class="overlay" />
    </aside>
  );
};

export default Aside;
