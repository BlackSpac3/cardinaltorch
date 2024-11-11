"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section className="w-[50%] tab-s:w-full">
      <p className="small-section-title text-gray-500">
        <Link href="/about-us" className="hover:text-primary">
          About{" "}
        </Link>
        / Our Team
      </p>
      <motion.h2
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-6xl font-medium mt-2"
      >
        Meet Our Team
      </motion.h2>
      <motion.p
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="body-text mt-5"
      >
        Meet our exceptional team at Cardinal Torch! Comprising of diverse
        talents and expertise, we are a dedicated group commited to excellence.
      </motion.p>
    </section>
  );
};
export default Header;
