import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AllBooks from "./Modules/All Books/AllBooks";
import BorrowSummary from "./Modules/Borrow Summary/BorrowSummary";
import BookDetails from "./Modules/Book Details/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AllBooks />,
      },
      {
        path: "books",
        element: <AllBooks />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
    ],
  },
]);
