/* @refresh reload */
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: 10 } },
});

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  ),
  document.getElementById("root") as HTMLElement
);
