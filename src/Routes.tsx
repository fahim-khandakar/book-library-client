import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AllBooks from "./Modules/All Books/AllBooks";
import BookSummary from "./Modules/Book Summary/BookSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/borrow-summary",
        element: <BookSummary />,
      },
    ],
  },
]);
