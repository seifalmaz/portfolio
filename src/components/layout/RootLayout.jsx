import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Navbar from "../Navbar";
import Footer from "./Footer";
import Cursor from "../Cursor";

function RootLayout() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      <ScrollToTop />
      <Cursor />
      <Navbar />
      <main id="main-content" className="relative z-10 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
