import Navbar from "./Navbar";
import ScrollToTop from "@components/ScrollToTop";
import Footer from "@components/Footer";
import NewsLetterPopUp from "@components/NewsLetterPopUp";
import { Toaster } from "react-hot-toast";
// import CommodityTradePrices from "@components/CommodityTradePrices";

const layout = ({ children }) => {
  return (
    <section className="w-full h-full overflow-hidden min-h-screen">
      <NewsLetterPopUp />
      <Toaster />
      <Navbar />
      <ScrollToTop />
      <div>{children}</div>
      <Footer />
      {/* <CommodityTradePrices /> */}
    </section>
  );
};
export default layout;
