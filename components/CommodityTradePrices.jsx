"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CommodityTradePrices = () => {
  const commodities = [
    {
      name: "Cocoa (CCO)",
      price: "NGN 11,000.48",
      percentageInc: "-3.61%",
      inc: false,
    },
    {
      name: "Maize White (MAZ)",
      price: "NGN 1,000",
      percentageInc: "0.00%",
      inc: false,
    },
    {
      name: "Sesame Seed Cleaned (SSC)",
      price: "NGN 2,300",
      percentageInc: "0.00%",
      inc: false,
    },
    {
      name: "Soyabean (SBS)",
      price: "NGN 2,870",
      percentageInc: "6.75%",
      inc: true,
    },
    {
      name: "Sorghum (SGM)",
      price: "NGN 900",
      percentageInc: "0.0%",
      inc: false,
    },
    {
      name: "Ginger Dried Split (GNG)",
      price: "NGN 990",
      percentageInc: "0.0%",
      inc: false,
    },
    {
      name: "Raw Cashew Nuts (CSN)",
      price: "NGN 1,350",
      percentageInc: "0.0%",
      inc: false,
    },
    {
      name: "Paddy Rice (PRL)",
      price: "NGN 1,010",
      percentageInc: "7.81%",
      inc: false,
    },
  ];
  const [navbarShadow, setNavbarShadow] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [home, setHome] = useState(true);
  const linkStyles = `${
    navbarShadow || !home ? "text-black" : "text-white"
  } cursor-pointer`;

  const pathname = usePathname();
  const shadowTrigger = () => {
    const scrolledTo = window.scrollY + window.innerHeight;
    const threshold = 100;
    const isReachBottom = document.body.scrollHeight - threshold <= scrolledTo;
    if (isReachBottom) {
      setBottom(true);
    } else {
      setBottom(false);
    }
    if (window.scrollY > 0) {
      setNavbarShadow(true);
    } else {
      setNavbarShadow(false);
    }
  };

  window.addEventListener("scroll", () => shadowTrigger());
  useEffect(() => {
    if (pathname == "/") {
      return setHome(true);
    }
    setHome(false);
  });
  return (
    <div
      className={`${
        bottom ? "bg-[#4f8c66]" : "bg-transparent"
      } w-full fixed bottom-0 z-40 px-[3vw] pb-4`}
    >
      <div
        id="commodities"
        className={`${
          navbarShadow || !home ? "bg-gray-50 shadow-sm" : "bg-transparent"
        } w-full  flex  overflow-hidden items-center  text-xs commodities rounded-md `}
      >
        <div className="  bg-gray-800 py-3 px-4 flex justify-center items-center z-[2] whitespace-nowrap">
          <p className="text-white">Market Price</p>
        </div>
        <ul
          id="commodity-carousel"
          className="flex items-center flex-nowrap gap-[1rem] py-3 whitespace-nowrap commodity-carousel"
        >
          {commodities.map((commodity, index) => (
            <li
              key={index}
              className={`flex items-center gap-3 ${linkStyles} cursor-text`}
            >
              <p className="whitespace-nowrap">{commodity.name}</p>
              <p className="">{commodity.price}</p>
              <p className={commodity.inc ? "text-primary" : "text-red-500"}>
                {commodity.percentageInc}
              </p>
            </li>
          ))}
          {commodities.map((commodity, index) => (
            <li
              key={index}
              className={`flex items-center gap-3 ${linkStyles} cursor-text`}
            >
              <p className="whitespace-nowrap">{commodity.name}</p>
              <p>{commodity.price}</p>
              <p className={commodity.inc ? "text-primary" : "text-red-500"}>
                {commodity.percentageInc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CommodityTradePrices;
