import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 pb-20">
        <Outlet />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
