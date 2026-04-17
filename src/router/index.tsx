import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Survey from "../pages/Survey";
import Result from "../pages/Result";
import Planner from "../pages/Planner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/survey",
    element: <Survey />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/planner",
    element: <Planner />,
  },
]);
