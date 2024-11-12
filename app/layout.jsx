import { Inter } from "next/font/google";
import "@styles/global.css";

import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: {
    default: "Cardinal Torch",
    template: "%s - Cardinal Torch",
  },
  description:
    "We Are Redefining Africa's Commodity Supply Chain. We are engaged in the business of commodities trade. Our primary products are Cocoa, Soya, Coffee & Cashew.",
  twitter: {
    card: "summary_large_image",
  },
  verification: { google: "itqkWIEn5ul4jYd1RVKBGwmndRai0tygvGRmkQ_4OjI" },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkeletonTheme baseColor="#f3f4f6" highlightColor="#efefef">
          <Toaster />
          <section>{children}</section>
        </SkeletonTheme>
      </body>
    </html>
  );
};

export default RootLayout;
