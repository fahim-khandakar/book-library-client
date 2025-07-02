import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import BookCreate from "./Modules/Book Create/BookCreate";
import BorrowCreateModal from "./Modules/Borrow Create/BorrowCreate";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 pb-20">
        <Outlet />
        <BookCreate />
        <BorrowCreateModal />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
