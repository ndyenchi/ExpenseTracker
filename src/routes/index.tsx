import { lazy } from "react";
import { Route } from "react-router-dom";
import { AppLayout } from "../layouts";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Expense = lazy(() => import("../pages/Expense"));
const Statistics = lazy(() => import("../pages/Statistics"));

interface RouteConfig {
  path?: string;
  index?: boolean;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const routes: RouteConfig = {
  path: "/",
  element: <AppLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "expenses", element: <Expense /> },
    { path: "stats", element: <Statistics /> },
  ],
};

export function renderRoute(route: RouteConfig) {
  const { path, index, element, children } = route;

  if (index) {
    return <Route key="index" index element={element} />;
  }

  return (
    <Route key={path} path={path} element={element}>
      {children?.map(renderRoute)}
    </Route>
  );
}
