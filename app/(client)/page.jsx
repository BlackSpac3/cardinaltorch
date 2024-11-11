import { assets } from "@assets/assets";
import AboutUs from "@components/home_page_components/AboutUs";
import Hero from "@components/home_page_components/Hero";
import Operations from "@components/home_page_components/Operations";
import Partners from "@components/home_page_components/Partners";
import VisionMission from "@components/home_page_components/VisionMission";
import WhyUs from "@components/home_page_components/WhyUs";
import Image from "next/image";

export const metadata = {
  title: "Home",
};

const page = () => {
  return (
    <div className="overflow-x-hidden">
      <div
        id="slider-frame"
        className="fixed top-0 w-full  h-screen overflow-hidden -z-10 overflow-x-hidden"
      >
        <div
          id="slider-overlay"
          className="absolute w-full h-screen bg-[#00000040] z-10 "
        ></div>

        <div className="slide-wrapper flex w-full flex-shrink-0">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/hero1.jpg"
            className="min-w-full   h-screen object-cover overflow-hidden  object-center select-none "
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/hero2.jpg"
            className="min-w-full   h-screen object-cover overflow-hidden  object-center select-none "
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/hero3.jpg"
            className="min-w-full   h-screen object-cover overflow-hidden  object-center select-none "
          />
        </div>
      </div>
      <Hero />
      <div className="w-full bg-white">
        <AboutUs />
      </div>
      <div className=" relative w-full flex flex-col gap-[5vw] phone:gap-14 bg-gray-50 px-[10vw] phone:pt-20 phone:pb-0 pt-[10vw] pb-[5vw]">
        <Image
          src={assets.cocoa_bg_illustration}
          className=" absolute w-64 h-44 -right-16 -top-20 opacity-40 phone:w-36 phone:h-28 select-none"
          alt=""
          srcset=""
          priority={true}
        />
        <VisionMission />
        <hr />
        <Operations />
        <hr />
        <WhyUs />
        <hr />
        <Partners />
      </div>
    </div>
  );
};
export default page;
