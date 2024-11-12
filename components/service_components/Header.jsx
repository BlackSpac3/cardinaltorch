"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { assets } from "@assets/assets";
import Image from "next/image";

const slides = [
  {
    img: assets.product1,
    bg: "bg-[#ff6868]",
    text: "text-[#ffffff]",
    dots: "bg-[#ffffff]",
  },
  {
    img: assets.product2,
    bg: "bg-[#e5cba2]",
    text: "text-[#000000]",
    dots: "bg-[#000000]",
  },
  {
    img: assets.product3,
    bg: "bg-[#ffde7a]",
    text: "text-[#ffffff]",
    dots: "bg-[#ffffff]",
  },
  {
    img: assets.product4,
    bg: "bg-[#e5bb43]",
    text: "text-[#000000]",
    dots: "bg-[#000000]",
  },
  {
    img: assets.product5,
    bg: "bg-gray-50",
    text: "text-[#000000]",
    dots: "bg-[#000000]",
  },
];

const Header = () => {
  const [slide, setSlide] = useState(0); // Default text color
  const imgRef = useRef(null);

  const nextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${slides[slide].bg} ${slides[slide].text} px-[7vw] phone:px-4 rounded-2xl py-[4vw] transition-colors duration-500 mt-20`}
    >
      <div className="grid grid-cols-2 tab-m:grid-cols-1 w-full items-center gap-10">
        <div>
          <motion.p
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="small-section-title"
          >
            Coming soon
          </motion.p>
          <motion.h2
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            className="section-big-text mt-3 phone:text-center"
          >
            Our Ready-to-Eat Cashew Snacks.
          </motion.h2>
        </div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col items-center gap-7"
        >
          <div
            className={` flex items-center ${slides[slide].text} duration-150`}
          >
            <div
              onClick={prevSlide}
              className={`p-3  rounded-md ${slides[slide].dots} hover:bg-opacity-20 bg-opacity-0 duration-150 cursor-pointer active:scale-90 opacity-30 hover:opacity-100`}
            >
              <i className="fi fi-sr-angle-left text-2xl opacity-75"></i>
            </div>

            <Image
              src={slides[slide].img}
              alt="Ready to eat Cashew Nuts"
              ref={imgRef}
              className="h-[260px] w-[260px] object-contain rounded-md select-none"
            />

            <div
              onClick={nextSlide}
              className={`p-3  rounded-md ${slides[slide].dots} hover:bg-opacity-20 bg-opacity-0 duration-150 cursor-pointer active:scale-90 opacity-30 hover:opacity-100`}
            >
              <i className="fi fi-sr-angle-right text-2xl opacity-75"></i>
            </div>
          </div>
          <span className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                className={
                  slide === idx
                    ? `${slides[slide].dots} cursor-pointer h-[0.5rem] w-[0.5rem]  border-none outline-none rounded`
                    : ` ${slides[slide].dots} bg-opacity-20 cursor-pointer h-[0.5rem] w-[0.5rem]  border-none outline-none rounded`
                }
              />
            ))}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
