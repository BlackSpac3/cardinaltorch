import { Inter } from "next/font/google";
import "@styles/global.css";

import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: {
    default: "Cardinal Torch",
    template: "%s | Cardinal Torch",
  },
  description:
    "Cardinal Torch Company Limited was established in 2020 with the objective of transforming the commodity and agricultural trading sector in Nigeria and Africa. To this end, we leverage technology and innovation through ethical local collaborations to meet the increasing demand for Africa sourced agricultural commodities in the global market.",
  twitter: {
    card: "summary_large_image",
  },
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
