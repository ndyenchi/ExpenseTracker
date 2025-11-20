import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { theme } from "./theme";
import { renderRoute, routes } from "./routes";

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{renderRoute(routes)}</Routes>
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
