"use client";
import { useEffect, useState } from "react";
import { assets } from "@assets/assets";
import Image from "next/image";

const Partners = () => {
  const partners = [
    {
      name: "Agroforce",
      icon: assets.agroforce_icon,
      width: "w-[280.55px] min-w-[280.55px]",
    },
    {
      name: "ETG",
      icon: assets.ETG_icon,
      width: "w-[84.98px] min-w-[84.98px]",
    },
    {
      name: "Olam Agri",
      icon: assets.olam_agri_icon,
      width: "w-[175.04px] min-w-[175.04px]",
    },
    {
      name: "Sucden",
      icon: assets.sucden_icon,
      width: "w-[140.27px] min-w-[140.27px]",
    },
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
          <li className={`min-h-[40px] h-[40px] ${partner.width}`}>
            <Image
              key={index}
              src={partner.icon}
              alt={partner.name}
              title={partner.name}
              className={`min-h-[40px] h-[40px] ${partner.width} object-scale-down`}
            />
          </li>
        ))}
        {innerWidth < 1024 &&
          partners.map((partner, index) => (
            <li
              aria-hidden
              className={`min-h-[40px] h-[40px] ${partner.width}`}
            >
              <Image
                key={index}
                src={partner.icon}
                alt={partner.name}
                title={partner.name}
                className={`min-h-[40px] h-[40px] ${partner.width} object-scale-down`}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Partners;
