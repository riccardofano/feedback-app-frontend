import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import "./App.scss";
import "./Common.scss";

const Home = lazy(() => import("./pages/Home"));
const Feedback = lazy(() => import("./pages/Feedback"));
const NewFeedback = lazy(() => import("./pages/feedback/New"));
const EditFeedback = lazy(() => import("./pages/feedback/Edit"));
const Roadmap = lazy(() => import("./pages/Roadmap"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home}></Route>
      <Route path="/feedback/new" component={NewFeedback}></Route>
      <Route path="/feedback/:id" component={Feedback}></Route>
      <Route path="/feedback/:id/edit" component={EditFeedback}></Route>
      <Route path="/roadmap" component={Roadmap}></Route>
    </Routes>
  );
};

export default App;
