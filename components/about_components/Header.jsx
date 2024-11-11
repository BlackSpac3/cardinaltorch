"use client";
import { motion } from "framer-motion";

const Header = () => {
  const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: delay } },
  });
  return (
    <div className="w-full h-[87vh] phone-s:h-[80vh]">
      <div
        id="header-contents"
        className="relative w-full h-full px-16 phone:p-3 flex justify-center items-center bg-about bg-center bg-no-repeat bg-cover "
      >
        <div className="bg-black absolute w-full h-full opacity-30 top-0 z-[0]"></div>
        <div className="w-[70%] tab-s:w-[95%] z-[1]">
          <motion.p
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-center phone-s:pt-6 text-lg leading-relaxed font-light phone:text-[25px]  text-white"
          >
            Commodities Supply, Imagined Differently
          </motion.p>
          <motion.p
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="text-white py-5 leading-tight  text-center m-auto text-4xl"
          >
            We specialize in trading agricultural products and developing
            sustainable energy solutions.
          </motion.p>
        </div>
      </div>
    </div>
  );
};
export default Header;
