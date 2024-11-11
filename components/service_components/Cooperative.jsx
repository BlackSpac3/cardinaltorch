"use client";
import { motion } from "framer-motion";
import { assets } from "@assets/assets";
import Image from "next/image";

const Cooperative = () => {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 1000,
    },
    show: {
      opacity: 1,
      y: 0,
      ease: "easeOut",
      transition: {
        duration: 1.15,
        type: "spring",
      },
    },
  };
  return (
    <section className="bg-gray-50 px-[10vw] py-16 phone:p-6">
      <div className="flex phone:flex-col-reverse items-center gap-5">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-full"
        >
          <h1 className="text-primary text-[30px]">Join Our Cooperative</h1>
          <p className="body-text">
            Cardinal Torch Cooperative provides a platform for individual and
            corporate members to collaborate on commodity processing and export
            contracts and benefit from the proceeds of trade.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className=" bg-primary hover:bg-secondary text-white px-5 py-3 rounded-full mt-5 duration-100"
          >
            Find out more
          </motion.button>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center w-full"
        >
          <Image src={assets.cooperative_img} alt="" srcset="" />
        </motion.div>
      </div>
    </section>
  );
};

export default Cooperative;
