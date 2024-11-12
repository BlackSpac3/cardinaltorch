"use client";
import { useEffect, useState } from "react";
import { assets } from "@assets/assets";
import Image from "next/image";

const Partners = () => {
  const partners = [
    { name: "Agroforce", icon: assets.agroforce_icon, width: 280.55 },
    { name: "ETG", icon: assets.ETG_icon, width: 84.98 },
    { name: "Olam Agri", icon: assets.olam_agri_icon, width: 175.04 },
    { name: "Sucden", icon: assets.sucden_icon, width: 140.27 },
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
    <div className="w-fit tab:w-full overflow-hidden flex items-center opacity-40   mx-auto phone:mb-20 partners">
      <ul className="partners-carousel flex items-center flex-nowrap  gap-14 whitespace-nowrap flex-shrink-0">
        {partners.map((partner, index) => (
          <li className={`h-[40px] w-[${partner.width}px]`}>
            <Image
              key={index}
              src={partner.icon}
              alt={partner.name}
              className={`h-[40px] w-[${partner.width}px]`}
            />
          </li>
        ))}
        {innerWidth < 1024 &&
          partners.map((partner, index) => (
            <li className={`h-[40px] w-[${partner.width}px]`}>
              <Image
                key={index}
                src={partner.icon}
                alt={partner.name}
                className={`h-[40px] w-[${partner.width}px]`}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Partners;
