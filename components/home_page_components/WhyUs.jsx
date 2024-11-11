"use client";
import { assets } from "@assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";
const WhyUs = () => {
  const attributes = [
    {
      title: "Maintaining high quality standards",
      desc: "At Cardinal Torch, we uphold high standards to meet domestic and international quality requirements.",
    },
    {
      title: "Environmental & Creative Methods",
      desc: "Agricultural productivity is increased and environmental stewardship is promoted through the use of creative techniques.",
    },
    {
      title: " Service You Can Trust",
      desc: "We are regarded highly in the agro-commodity sector because of our track record of providing dependable services to client.",
    },
  ];
  return (
    <div className=" relative flex tab-m:flex-col-reverse gap-10">
      <Image
        src={assets.maize_bg_illustration}
        className=" absolute w-64 h-44 -left-52 -top-20 opacity-40 select-none"
        alt=""
        srcset=""
        priority={true}
      />
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, delay: 1 }}
        className=" w-full "
      >
        <div className="flex flex-col gap-7 items-start w-[70%] tab-m:w-[100%]">
          <p className="font-light text-sm w-full">Why Us</p>
          <h2 className="text-4xl font-bold leading-tight">
            We are <br /> accredited!
          </h2>
          <p className="font-light text-gray-500 text-sm">
            Committed to excellence in agribusiness through adherence to
            industry standards for sustainable operations and innovative
            solutions.
          </p>

          <div className="flex flex-col gap-5">
            {attributes.map((attribute, index) => (
              <div key={index} className="flex gap-5 items-start">
                <i className="fi fi-bs-arrow-down-left -rotate-90 text-primary"></i>
                <div>
                  <h2 className="font-light">{attribute.title}</h2>
                  <p className="text-sm text-gray-500">{attribute.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex flex-col gap-7 w-full items-start tab-m:items-center"
      >
        <p className="font-light text-sm">About Us</p>
        <h2 className="text-4xl font-bold leading-tight">
          “ We’re remaining in the lead through strategic value Management. ”
        </h2>
        <p className="font-light text-sm ">
          Our corporate policies are integral to building and maintaining a
          positive reputation, fostering long-term relationships with
          stakeholders, and achieving sustainable success.
        </p>
        <button className="px-5 py-3 active:scale-[0.9] hover:scale-[1.1] hover:bg-secondary duration-100 bg-primary text-white rounded-full">
          Read More
        </button>
      </motion.div>
    </div>
  );
};
export default WhyUs;
