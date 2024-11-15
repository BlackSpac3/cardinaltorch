"use client";
import { assets } from "@assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const Safety = () => {
  return (
    <section className="grid grid-cols-2 items-center tab-s:flex tab-s:flex-col-reverse gap-10">
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col gap-4 w-[90%]"
      >
        <h1 className="text-2xl text-primary">Health & Safety Measures</h1>
        <p className="body-text ">
          We prioritize the safety and well-being of our employees, contractors,
          and suppliers. Our Health and Safety process (HSC) is a comprehensive
          program that outlines the measures we take to create a safe working
          environment and prevent accidents, injuries, and illnesses. We believe
          that our Health and Safety process (HSC) is essential to our business
          operations and demonstrates our commitment to the safety and
          well-being of our employees, contractors, and suppliers.
        </p>
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col gap-6"
      >
        <Image
          src={assets.health_safety_illustration}
          alt="Health & Safety Measures Illustration"
        />
      </motion.div>
    </section>
  );
};

export default Safety;
