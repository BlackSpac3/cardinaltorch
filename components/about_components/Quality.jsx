"use client";
import { assets } from "@assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const Quality = () => {
  return (
    <section className="grid grid-cols-2 tab-s:grid-cols-1 gap-10 items-center">
      <div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Image
            src={assets.quality_illustration}
            alt="Quality Assurance Illustration"
            className="w-[80%] mx-auto h-auto"
          />
        </motion.div>
      </div>
      <div className="flex flex-col gap-5">
        <motion.h1
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl text-primary"
        >
          Quality Assurance Drive
        </motion.h1>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="body-text"
        >
          We take food safety very seriously, which is why we implement a
          critical control points (CCP) system.{" "}
        </motion.p>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="body-text"
        >
          This system is designed to identify and prevent potential hazards in
          our food production processes that could pose a risk to our customers’
          health and safety.
        </motion.p>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="body-text"
        >
          The CCP system is based on identifying the critical control points in
          our production processes, such as processing, storage, packaging and
          logistics, and implementing controls to ensure that these points are
          monitored and managed effectively.
        </motion.p>
      </div>
    </section>
  );
};

export default Quality;
