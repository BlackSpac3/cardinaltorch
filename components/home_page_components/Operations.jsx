"use client";
import { assets } from "@assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const Operations = () => {
  const operations = [
    {
      title: "Sourcing",
      desc: "We have a network of field operations personnel across Nigeria to source produce. Our Quality Control team ensures quality.",
      icon: assets.sourcing_icon,
    },
    {
      title: "Corporate Resources",
      desc: "Our administrative functions are based at our corporate head office in Lagos, Nigeria, which is home to major port terminals and export processing zones.",
      icon: assets.corporate_resources_icon,
    },
    {
      title: "Commodity Processing",
      desc: "Our processing facilities are certified to produce and package raw cashews into semi-finished and finished products.",
      icon: assets.commodity_processing_icon,
    },
    {
      title: "Logistics",
      desc: " We handle the entire logistics process for delivering produce to the customer's location, ensuring quality preservation during transit.",
      icon: assets.logistics_icon,
    },
  ];
  return (
    <div className="grid grid-cols-4 tab-m:grid-cols-2 phone:grid-cols-1 gap-5 phone:gap-10">
      {operations.map((operation, index) => (
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          key={index}
          className="flex flex-col phone:gap-2 items-start"
        >
          <div className="flex flex-col items-start gap-2 phone:flex-row phone:items-center">
            <div className="border border-primary aspect-square rounded-full flex items-center justify-center p-2">
              <Image src={operation.icon} alt="" className="w-5" />
            </div>
            <h2 className="font-light">{operation.title}</h2>
          </div>
          <div>
            <p className="text-sm text-gray-500">{operation.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default Operations;
