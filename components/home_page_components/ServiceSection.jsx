import Link from "next/link";
import Image from "next/image";
import { services } from "@constants";
import MoreButton from "../MoreButton";

const ServiceSection = () => {
  return (
    <div className="flex flex-col m-body">
      <div id="service-section-header" className="">
        <div className="flex w-full justify-between items-center">
          <h2 className="section-header">Our Services</h2>
          <Link href="/services" className="mr-[3vw] tab-s:hidden ">
            <MoreButton>Learn More</MoreButton>
          </Link>
        </div>
        <p className="w-[60%] mt-5 tab-m:w-full">
          At Cardinal Energies, we are dedicated to providing innovative and
          sustainable energy solutions that empower businesses and communities.
          We specialize in renewable energy, solar, wind, natural gas, etc.,
          delivering reliable, cost-effective, and environmentally responsible
          power to meet your energy needs.
        </p>
      </div>
      <div
        id="service-contents"
        className="grid grid-cols-3 gap-[20px] mt-24 tab-s:block tab-s:mt-5"
      >
        {services.map((service, index) => (
          <div
            // variants={fadeIn}
            // initial="initial"
            // whileInView="animate"
            // whileHover={{ scale: 1.02 }}
            // viewport={{ once: true }}
            // custom={index + 1}
            key={index}
            className={`${
              service.title === "Sell Energy" ? "bg-primary" : "bg-[#efefef]"
            } relative p-[10%] tab-s:p-7 rounded-3xl shadow-md tab-s:mt-14`}
          >
            <Image
              // whileHover={{ scale: 1.15 }}
              src={service.icon}
              alt={service.title}
              className="absolute w-[70px] tab-m:w-16 top-[-35px]  border-solid border-white border-[5px] rounded-full"
            />
            <div
              className={`${
                service.title === "Sell Energy" ? "text-white" : "text-black"
              }`}
            >
              <h2 className="text-lg font-medium mt-4">{service.title}</h2>
              <p className="text-sm line-clamp-3 mt-1">{service.desc}</p>

              <Link href="/services" className="cursor-pointer">
                <div
                  // whileTap={{ scale: 0.95 }}
                  className="flex mt-[10px] items-center gap-2 cursor-pointer"
                >
                  <p className="text-xs font-medium leading-none">Learn more</p>
                  <i className="fi fi-rs-arrow-right"></i>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceSection;
