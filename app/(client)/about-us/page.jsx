import Header from "@components/about_components/Header";
import Network from "@components/about_components/Network";
import Overview from "@components/about_components/Overview";

import WhatWeDo from "@components/about_components/WhatWeDo";
import OurGallerySection from "@components/about_components/OurGallerySection";

import Image from "next/image";
import Quality from "@components/about_components/Quality";
import Safety from "@components/about_components/Safety";
import Subsidiary from "@components/about_components/Subsidiary";
import CompanyProfile from "@components/about_components/CompanyProfile";
import { assets } from "@assets/assets";

export const metadata = {
  title: "About",
};
const page = () => {
  return (
    <section className="relative overflow-hidden">
      <Header />
      <div className="relative w-full flex flex-col gap-[5vw] bg-gray-50 px-[10vw] py-[5vw]">
        <Image
          src={assets.maize_bg_illustration}
          priority={true}
          className=" absolute w-64 h-44 -left-20 top-40 opacity-40 select-none"
        />
        <Overview />
        <hr />
        <WhatWeDo />
        <hr />
        <Network />
      </div>
      <OurGallerySection />
      <div className="w-full flex flex-col gap-[5vw] bg-white px-[10vw] py-[5vw]">
        <Quality />
        <hr />
        <Safety />
        <hr />
        <Subsidiary />
      </div>
      <CompanyProfile />
    </section>
  );
};
export default page;
