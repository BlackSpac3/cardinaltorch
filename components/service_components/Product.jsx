"use client";
import { assets } from "@assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const Product = () => {
  const products = [
    {
      img: assets.cashews_img,
      name: "Cashews",
      desc: "Our current capacity is 200 MT of Raw Cashew Nuts and 50 MT of semi-processed cashews per month. Our table-ready brands will be launched in Q4 2023.",
    },
    {
      img: assets.cocoa_img,
      name: "Cocoa",
      desc: "Cardinal Torch is strong player in global Cocoa trade, shipping up to 200MT of cocoa products to overseas buyers monthly.",
    },
    {
      img: assets.coffee_img,
      name: "Coffee",
      desc: "Coffee is vital to the global economy, with various industries depending on it, including roasters, packers, growers, marketers and many more.",
    },
    {
      img: assets.soya_img,
      name: "Soya",
      desc: "Soybeans are a significant protein source in many diets, first domesticated by Chinese farmers around 1100 BC. Cultivated worldwide as a food source.",
    },
    {
      img: assets.sesame_img,
      name: "Seseme Seed",
      desc: "Nutritionally, sesame seeds are rich in healthy fats, protein, fiber, and a range of minerals like calcium, magnesium, and iron.",
    },
  ];
  return (
    <div className="relative flex gap-3 phone:flex-col shrink-0 overflow-x-scroll pb-4">
      {products.map((product, index) => (
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          key={index}
          className="flex flex-col gap-1 rounded-md border overflow-hidden min-w-[240px]"
        >
          <Image
            src={product.img}
            alt={product.name}
            className="w-full aspect-[10/7] object-cover rounded-t-md overflow-hidden"
          />
          <div className="flex flex-col gap-1 p-3">
            <h3>{product.name}</h3>
            <p className="body-text">{product.desc}</p>
          </div>
        </motion.div>
      ))}
      <img
        src="/sesemum.png"
        className="absolute w-64 h-44 -left-64 -top-32  opacity-40 phone:w-36 phone:h-28"
        alt=""
        srcset=""
      />
    </div>
  );
};
export default Product;
