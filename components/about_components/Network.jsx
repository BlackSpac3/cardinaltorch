"use client";
import { assets } from "@assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const Network = () => {
  return (
    <section className="relative">
      <div className="flex justify-between tab:block gap-14">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-[70%] phone:w-[100%]"
        >
          <div className="pb-3">
            <h1 className="section-big-text">
              "We have a strong network of partners within and outside the
              continent"
            </h1>
          </div>

          <p className="body-text">
            We leverage ethical local collaborations to meet the increasing
            demand for Africa-sourced agricultural commodities in the global
            market. Our services cover the entire commodity value chains,
            including sourcing, processing, local supplies, and exports.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-[80%] m-auto"
        >
          <div className=" grid grid-cols-2 phone:grid-cols-1  gap-5 tab:mt-12 ">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-1xl text-primary">FARMERS</h1>
              <p className="body-text">
                Improved Standard of living for farmers by encouraging better
                output and adequate compensation.
              </p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-1xl text-primary ">LOCAL COMMUNITIES</h2>
              <p className="body-text">
                Direct and Indirect employment opportunities created for
                residents in our communities of operation and corporate social
                responsibility.
              </p>
            </div>
            <div className=" w-full flex flex-col gap-2">
              <h1 className=" text-1xl text-primary ">INVESTORS</h1>
              <p className="body-text">
                Profitable returns for stakeholders in our business and beyond
                that, we have created a business that delivers impact.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Image
        src={assets.cocoa_bg_illustration}
        className=" absolute w-64 h-44 -right-48 top-48 opacity-40 select-none"
        alt=""
        priority={true}
      />
    </section>
  );
};

export default Network;
