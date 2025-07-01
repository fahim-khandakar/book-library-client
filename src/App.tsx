import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Outlet />
      <div className="absolute bottom-0 right-0 left-0">
        <Footer />
      </div>
    </div>
  );
}

export default App;
