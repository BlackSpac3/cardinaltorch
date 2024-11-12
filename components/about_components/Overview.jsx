"use client";
import { motion } from "framer-motion";
const Overview = () => {
  return (
    <div className="mx-auto flex flex-col items-center text-center px-[7vw] tab-s:px-0 gap-14">
      <p className="small-section-title text-primary">About Us</p>
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="section-big-text phone:text-2xl"
      >
        We leverage ethical local collaborations to meet the increasing demand
        for Africa-sourced agricultural commodities in the global market.
      </motion.p>
      <hr className="w-[200px] border-black" />
      <motion.p
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="body-text "
      >
        <span className=" font-semibold text-primary">
          Cardinal Torch Company Limited
        </span>{" "}
        was established in 2020 with the objective of transforming the commodity
        and agricultural trading sector in Nigeria and Africa by engaging in
        large-scale commodity trading and processing of semi and finished
        agricultural commodities with a particular emphasis on combined export
        and local consumption, enhancing efficiency, productivity, and
        sustainability within the sector.
        <br />
        <br />
        We’re currently engaged in the business of commodities trading and
        processing with offerings that spans the entire value chain from
        plantation to production, processing, exports &distribution. Our primary
        products at the moment are Cocoa, & Cashews (Semi-Processed and
        Table-ready Brands). We are building capacity to export over 1000MT of
        semi-processed Cashew products and 5000MT Cocoa beans per annum.
      </motion.p>
    </div>
  );
};
export default Overview;
