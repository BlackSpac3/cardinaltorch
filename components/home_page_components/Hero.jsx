"use client";
import { motion } from "framer-motion";
const Hero = () => {
  const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: delay } },
  });
  return (
    <motion.div className="flex items-center justify-center relative w-full h-screen text-white text-center">
      <div className="flex flex-col items-center gap-10 px-[3vw] w-[75%] tab-s:w-full z-[1]">
        <div>
          <motion.p
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="font-light text-lg phone:text-sm"
          >
            Redefining Africa's Commodity Supply Chainz
          </motion.p>
          <motion.h2
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="text-5xl tab-s:text-4xl leading-tight mt-5 font-light"
          >
            Your Trusted Partner in Seamless{" "}
            <span className="font-semibold underline underline-offset-4">
              Commodity Trade
            </span>{" "}
            and Market Solutions.
          </motion.h2>
        </div>
        {/* <button className="bg-transparent border rounded-full px-7 py-3">
          Learn More
        </button> */}
      </div>
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-[#00000050] to-transparent w-full h-[50%] z-0"></div>
    </motion.div>
  );
};
export default Hero;
