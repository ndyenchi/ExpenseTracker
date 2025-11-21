import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { TransactionProvider } from "./contexts/ExpenseContext";
import { theme } from "./theme";
import { renderRoute, routes } from "./routes";

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <TransactionProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>{renderRoute(routes)}</Routes>
          </Suspense>
        </BrowserRouter>
      </TransactionProvider>
    </MantineProvider>
  );
}

export default App;
