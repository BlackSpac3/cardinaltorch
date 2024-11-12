"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  return (
    <section className="w-[55%] tab-s:w-full">
      <p className="small-section-title text-gray-500">
        <Link href="/about-us" className="hover:text-primary">
          About
        </Link>{" "}
        / Gallery
      </p>
      <motion.h2
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="text-6xl font-medium mt-2"
      >
        Gallery
      </motion.h2>
      <motion.p
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="body-text mt-5"
      >
        Welcome to our Gallery! Browse through a collection of our favorite
        work, each reflecting our passion and attention to detail. We’re excited
        to share our journey with you.
      </motion.p>
    </section>
  );
};

export default Header;
