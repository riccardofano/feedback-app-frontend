import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import "./App.scss";

const Home = lazy(() => import("./pages/Home"));
const Feedback = lazy(() => import("./pages/Feedback"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home}></Route>
    </Routes>
  );
};

export default App;
