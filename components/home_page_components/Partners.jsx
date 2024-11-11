"use client";
import { useEffect, useState } from "react";
import { assets } from "@assets/assets";
import Image from "next/image";

const Partners = () => {
  const partners = [
    { name: "Agroforce", icon: assets.agroforce_icon },
    { name: "ETG", icon: assets.ETG_icon },
    { name: "Olam Agri", icon: assets.olam_agri_icon },
    { name: "Sucden", icon: assets.sucden_icon },
  ];

  const [innerWidth, setInnerWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let handler = (e) => {
        setInnerWidth(window.innerWidth);
      };

      window.addEventListener("resize", handler);

      return () => {
        window.removeEventListener("resize", handler);
      };
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
    }
  }, []);

  return (
    <div className="relative w-fit tab:w-full overflow-hidden flex items-center opacity-40 flex-shrink  mx-auto phone:mb-20 partners">
      <div className="partners-carousel flex items-center flex-nowrap whitespace-nowrap gap-14">
        {partners.map((partner, index) => (
          <Image
            key={index}
            src={partner.icon}
            alt={partner.name}
            className="h-10 w-auto"
          />
        ))}
        {innerWidth < 1080 &&
          partners.map((partner, index) => (
            <Image
              key={index}
              src={partner.icon}
              alt={partner.name}
              className="h-10 w-auto"
            />
          ))}
      </div>
    </div>
  );
};
export default Partners;
