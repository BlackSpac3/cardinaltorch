"use client";
import { assets } from "@assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const VisionMission = () => {
  const attributes = [
    {
      icon: assets.vision_icon,
      title: "Vision",
      desc: "To become the leading commodities trading company in Africa, changing the way trading is done by bringing into play our innovative approach and leveraging relationships and our expertise.",
    },
    {
      icon: assets.mission_icon,
      title: "Mission",
      desc: "To always deliver the highest quality commodities to local and international markets -while offering innovation-fueled services to all our stakeholders.",
    },
    {
      icon: assets.mission_icon,
      title: "Company Value",
      desc: "We are committed to always ensuring Excellence & Total Quality, Maintaining Cost leadership, People-first Oriented and Innovation Driven.",
    },
  ];
  return (
    <div className="flex tab-m:flex-col items-center">
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="w-full col-span-2 duration-75 object-cover"
      >
        <Image
          src={assets.vission_mission_pic}
          alt=""
          className="h-[480px] w-full object-cover rounded-xl phone:h-auto phone:aspect-square "
        />
      </motion.div>

      <div className="flex flex-col w-full tab-m:ml-0 tab-m:mt-[-50px] ml-[-50px] gap-10">
        {attributes.map((attribute, index) => (
          <motion.div
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex tab-m:flex-col gap-5 items-center"
          >
            <div className="rounded-full min-w-[100px] min-h-[100px] h-[100px] w-[100px] tab-m:min-h-[70px] tab-m:min-w-[70px] tab-m:h-[70px] tab-m:w-[70px] bg-white flex shadow-[0_20px_40px_0_rgba(0,0,0,.1)] items-center justify-center">
              <Image
                src={attribute.icon}
                alt=""
                className="w-[55px] tab-m:w-[40px]"
              />
            </div>
            <div className="tab-m:text-center">
              <h2 className="font-light">{attribute.title}</h2>
              <p className="text-sm text-gray-500">{attribute.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default VisionMission;
