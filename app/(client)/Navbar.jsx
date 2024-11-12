"use client";
import { easeInOut, motion } from "framer-motion";
import Link from "next/link";
import { assets } from "@assets/assets";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [aboutMenuIsOpen, setAboutMenuIsOpen] = useState(true);
  const [navbarShadow, setNavbarShadow] = useState(false);

  const [servicePage, setServicePage] = useState(true);

  const linkStyles = `${
    navbarShadow || servicePage ? "text-black" : "text-white"
  } cursor-pointer`;

  useEffect(() => {
    if (
      pathname == "/services" ||
      pathname.startsWith("/blogs") ||
      pathname == "/about-us/team" ||
      pathname == "/contact-us" ||
      pathname == "/about-us/gallery"
    ) {
      return setServicePage(true);
    }
    setServicePage(false);
  });

  const navlinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
  ];

  const container = {
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      ease: easeInOut,
      transition: {
        duration: 0.2,
      },
    },
  };

  const isActive = (path) => {
    if (path == "/") {
      return pathname === "/";
    }

    return pathname.startsWith(path);
  };

  useEffect(() => {
    const shadowTrigger = () => {
      if (window.scrollY > 0) {
        setNavbarShadow(true);
      } else {
        setNavbarShadow(false);
      }
    };
    window.addEventListener("scroll", shadowTrigger);

    return () => {
      window.removeEventListener("scroll", shadowTrigger);
    };
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`${
        navbarShadow ? "border-b  bg-white" : " bg-transparent"
      } flex fixed w-full top-0 z-50 tab-s:py-4 tab-s:px-[5vw]  justify-between px-[3vw] items-center duration-75 text-xs`}
    >
      <Link href="/">
        <motion.div variants={item}>
          <Image
            src={
              navbarShadow || servicePage
                ? assets.logo_black
                : assets.logo_white
            }
            alt="Cardinal Torch Logo"
            className={`${
              navbarShadow ? "mt-0" : "mt-3"
            } h-[26px] w-auto duration-75 select-none`}
            priority={true}
          />
        </motion.div>
      </Link>

      <div className="tab-s:hidden flex gap-7">
        <ul className="flex items-center min-h-full ">
          {navlinks.map((link, index) => (
            <Link
              key={index}
              onMouseEnter={
                link.path == "/about-us"
                  ? () => setAboutMenuIsOpen(false)
                  : () => {}
              }
              onMouseLeave={
                link.path == "/about-us"
                  ? () => setAboutMenuIsOpen(true)
                  : () => {}
              }
              href={link.path}
              onClick={() => setAboutMenuIsOpen(true)}
              className={`${
                navbarShadow || servicePage
                  ? "hover:bg-gray-50"
                  : "hover:bg-gray-50 hover:bg-opacity-15"
              } relative h-full duration-75`}
            >
              <motion.div
                variants={item}
                whileTap={{ scale: 0.9 }}
                className=" h-full flex flex-col"
              >
                <div
                  className={`${
                    isActive(link.path)
                      ? `text-primary ${linkStyles} `
                      : `${linkStyles}`
                  } ${
                    navbarShadow ? "mt-0" : "mt-3"
                  } h-full flex items-center gap-2 duration-75  px-3`}
                >
                  <p>{link.name}</p>
                  <i
                    className={`${
                      link.path === "/about-us" ? "block" : "hidden"
                    } fi fi-br-angle-down  text-[8px] ${
                      !aboutMenuIsOpen ? "-rotate-180 mt-0 " : "rotate-0 mt-1"
                    } duration-75`}
                  ></i>
                </div>
                {isActive(link.path) ? (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className={`h-[2px] w-full ${
                      navbarShadow || servicePage ? "bg-primary" : "bg-white"
                    }`}
                  ></motion.div>
                ) : (
                  <div className="h-[2px] w-full bg-transparent"></div>
                )}

                {link.path === "/about-us" ? (
                  <div
                    className={`${
                      aboutMenuIsOpen ? "h-0 p-0 my-0 hidden" : "h-fit border"
                    } absolute ${
                      navbarShadow ? "top-[64px]" : "top-[52px]"
                    } left-[50%] w-[125px] -translate-x-[50%] bg-white  overflow-hidden transition-all duration-75`}
                  >
                    <div className="flex flex-col  gap-1 py-1">
                      <Link
                        onClick={() => setAboutMenuIsOpen(true)}
                        href="/about-us/team"
                        className="hover:bg-gray-100 p-3 duration-75"
                      >
                        Our Team
                      </Link>

                      <hr className="mx-1" />
                      <Link
                        onClick={() => setAboutMenuIsOpen(true)}
                        href="/about-us/gallery"
                        className="hover:bg-gray-100 p-3 duration-75"
                      >
                        Our Gallery
                      </Link>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </motion.div>
            </Link>
          ))}
        </ul>

        <Link href="/contact-us" className="tab-s:hidden">
          <motion.button
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`${
              navbarShadow ? "mb-3" : "mb-0"
            } mt-3 bg-primary hover:bg-secondary text-white px-5 py-3 rounded-full duration-100`}
          >
            Contact Us
          </motion.button>
        </Link>
      </div>
      <div
        onClick={() => {
          setNavIsOpen(true);
        }}
        className=" hidden tab-s:block rounded-md bg-transparent p-2 hover:bg-gray-50 hover:bg-opacity-15 duration-75 cursor-pointer"
      >
        <i
          className={`${
            navbarShadow || servicePage ? "text-black" : "text-white"
          } fi fi-rr-menu-burger text-lg`}
        ></i>
      </div>

      <div
        id="sidebar-navigation"
        className={`${
          navIsOpen ? "right-0" : "right-[-100vw]"
        } hidden tab-s:block absolute bg-white h-[100vh] p-[20px] duration-[0.5s] w-[200px] z-50 top-0 shadow-[35px_0px_60px_-15px_rgba(0,0,0,70)]`}
      >
        <div
          onClick={() => {
            setNavIsOpen(false);
            setAboutMenuIsOpen(true);
          }}
          className="w-fit pr-3 py-3 aspect-square mt-2 mb-14 rounded-md active:scale-90"
        >
          <i className="fi fi-rr-cross text-lg "></i>
        </div>
        <ul className="flex flex-col gap-[10px]">
          {navlinks.map((link, index) => (
            <div key={index}>
              <div className="flex justify-between ">
                <Link
                  href={link.path}
                  onClick={() => {
                    setNavIsOpen(false);
                    setAboutMenuIsOpen(true);
                  }}
                  className="text-[20px] py-2 w-full h-full"
                >
                  {link.name}
                </Link>
                <div
                  onClick={() => setAboutMenuIsOpen((prev) => !prev)}
                  className={`${
                    link.path === "/about-us" ? "block" : "hidden"
                  } mr-2 hover:bg-gray-50 px-3 rounded-md flex items-center justify-center`}
                >
                  <i
                    className={`fi fi-rr-angle-down ${
                      !aboutMenuIsOpen ? "-rotate-180" : "rotate-0"
                    } duration-75 cursor-pointer`}
                  ></i>
                </div>
              </div>
              {link.path === "/about-us" ? (
                <div
                  className={`${
                    aboutMenuIsOpen
                      ? "gap-0 h-0 p-0 my-0"
                      : "gap-[10px] h-fit my-[10px]"
                  } flex flex-col w-full text-[18px] overflow-hidden duration-75`}
                >
                  <Link
                    onClick={() => {
                      setNavIsOpen(false);
                      setAboutMenuIsOpen(true);
                    }}
                    href="/about-us/team"
                    className="py-3"
                  >
                    Our Team
                  </Link>
                  <hr />
                  <Link
                    onClick={() => {
                      setNavIsOpen(false);
                      setAboutMenuIsOpen(true);
                    }}
                    href="/about-us/gallery"
                    className="py-3"
                  >
                    Our Gallery
                  </Link>
                </div>
              ) : (
                <></>
              )}
              <hr className="mt-[10px]" />
            </div>
          ))}
          <Link
            onClick={() => {
              setNavIsOpen(false);
            }}
            href="/contact-us"
            className="text-[20px] py-2"
          >
            Contact Us
          </Link>
          <hr />
        </ul>
      </div>
    </motion.div>
  );
};
export default Navbar;
