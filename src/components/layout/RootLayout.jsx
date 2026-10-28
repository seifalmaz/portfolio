import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Navbar from "../Navbar";
import Footer from "./Footer";

function RootLayout() {
  return (
    <div className="relative min-h-screen bg-[#292725] text-[#FAF6EE] selection:bg-[#6E2638]/40 selection:text-[#FAF6EE] flex flex-col justify-between overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="relative z-10 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
