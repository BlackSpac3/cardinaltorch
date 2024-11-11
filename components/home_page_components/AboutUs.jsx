"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div
      id="about"
      className=" relative  w-full px-[10vw] py-[5vw] phone:py-14 font-light text-center"
    >
      {/* <div className="absolute bg-ci bg-contain bg-no-repeat w-full h-48 -left-10 top-0 skew-x-12 transform-skew-x: 12deg phone:-left-24 phone:skew-x-12 transform-skew-x: 40deg opacity-40 z-0"></div> */}

      <div className=" mx-auto w-[70%] tab-s:w-full">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="font-semibold text-primary text-lg"
        >
          We leverage ethical local collaborations to meet the increasing demand
          for Africa-sourced agricultural commodities in the global market.
        </motion.h2>
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="leading-relaxed font-light text-gray-500 mb-10 mt-5"
        >
          Our company was established with the objective of transforming the
          commodity and agricultural trading sector in Nigeria and Africa by
          engaging in large-scale commodity trading and processing into semi and
          finished agraaicultural commodities with a particular emphasis on
          enhancing efficiency, productivity, and sustainability.
        </motion.p>

        <Link
          href="/about-us"
          className=" px-5 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white duration-75"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
export default AboutUs;
