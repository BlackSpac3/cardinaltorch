"use client";
import Link from "next/link";
import { assets } from "@assets/assets";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { emailRegex } from "@utils";
import toast from "react-hot-toast";
import axios from "axios";
const Footer = () => {
  const pathname = usePathname();
  const [home, setHome] = useState(true);
  useEffect(() => {
    if (pathname == "/") {
      return setHome(true);
    }
    setHome(false);
  });

  const subscribe = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    const email = document.getElementById(
      "subsriber-footer-email-input-field"
    ).value;

    if (!email || !emailRegex.test(email)) {
      e.target.disabled = false;
      return toast.error("Enter a valid email adddress", {
        id: "subscriber-invalid-email-error",
      });
    }

    const loadingToast = toast.loading("Subscribing...", {
      id: "subscribing-to-news-letter-process",
    });

    try {
      const response = await axios.post("/api/subscribe", { email });
      toast.dismiss(loadingToast);
      toast.success(response.data.message, {
        id: "newsletter-subscription-successfull",
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.response.data.message) {
        return toast.error(error.response.data.message, {
          id: "newsletter-subscription-error",
        });
      }
      return toast.error("Error connecting to server", {
        id: "newsletter-subscription-error",
      });
    } finally {
      e.target.disabled = false;
    }
  };
  return (
    <div
      className={`${
        home && "bg-gray-50"
      } flex flex-col items-center w-full font-light`}
    >
      <footer className="flex flex-col bg-[#4f8c66] px-[10vw] phone:px-[7vw] pb-10 pt-14 text-white gap-10 w-full items-center z-0 text-sm">
        <div className="w-[60%] tab-s:w-[80%] phone:w-full text-center phone:text-left">
          <h2 className="text-3xl tab-s:text-2xl font-medium ">
            Subscribe to our newsletter
          </h2>
          <p className="mt-1">
            Be the first to know about our current deals and market trends,
            subscribe to stay updated
          </p>

          <div className="flex mt-5 bg-white">
            <input
              type="email"
              name="email"
              required
              id="subsriber-footer-email-input-field"
              placeholder="Enter email here"
              className="p-3 w-full text-black outline-none rounded-none"
            />
            <button
              onClick={subscribe}
              className="bg-gray-900 px-5 py-3 disabled:bg-gray-100 disabled:text-[#9ea5b0] duration-75"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div
          id="footer-content"
          className="w-[100%] grid grid-cols-[1fr_1fr_1fr_1.5fr] gap-[80px] tab-m:grid-cols-2 tab-s:flex tab-s:flex-col tab-s:gap-[35px] "
        >
          <div
            id="footer-content-1"
            className="flex flex-col items-start gap-[20px]"
          >
            <h2 className="text-white font-extralight">COMPANY</h2>
            <ul className="flex flex-col gap-2">
              <Link href="/" className="cursor-pointer hover:underline">
                Home
              </Link>
              <Link href="/about-us" className="cursor-pointer hover:underline">
                About Us
              </Link>
              <Link href="/services" className="cursor-pointer hover:underline">
                Services
              </Link>
              <Link
                href="/about-us/gallery"
                className="cursor-pointer hover:underline"
              >
                Our Gallery
              </Link>
            </ul>
          </div>

          <div
            id="footer-content-2"
            className="flex flex-col items-start gap-[20px]"
          >
            <h2 className="text-white font-extralight">FOLLOW US</h2>
            <ul className="flex flex-col gap-2">
              <Link
                href="https://www.instagram.com/cardinaltorch?igsh=a2VhYzg4anpwd2Vo"
                target="blank"
                className="cursor-pointer hover:underline flex items-center gap-2"
              >
                <Image
                  src={assets.instagram_icon}
                  alt="Instagram"
                  className="w-5"
                />
                <p>Instagram</p>
              </Link>

              <Link
                href="https://x.com/cardinaltorch_?s=21&t=Y3OtPTNTjfprSu9U1vM83A"
                target="blank"
                className="cursor-pointer hover:underline flex items-center gap-2"
              >
                <Image
                  src={assets.twitter_icon}
                  alt="Twitter"
                  className="w-5"
                />
                <p>Twitter</p>
              </Link>

              <Link
                href="https://linkedin.com/in/cardinal-torch-company-limited-2bb358249"
                target="blank"
                className="cursor-pointer hover:underline flex items-center gap-2"
              >
                <Image
                  src={assets.linkedin_icon}
                  alt="LinkedIn"
                  className="w-5"
                />
                <p>LinkedIn</p>
              </Link>
            </ul>
          </div>

          <div
            id="footer-content-3"
            className="flex flex-col items-start gap-[20px]"
          >
            <h2 className="text-white font-extralight">SUPPORT</h2>
            <ul className="flex flex-col gap-2">
              <li>Need any help?</li>
              <Link
                href="mailto:info@cardinaltorch.com"
                className="hover:underline cursor-pointer"
              >
                info@cardinaltorch.com
              </Link>
            </ul>
          </div>

          <div
            id="footer-content-4"
            className="flex flex-col items-start gap-5"
          >
            <h2 className="text-white font-extralight">GET IN TOUCH</h2>
            <ul className="flex flex-col gap-2">
              <li className=" ">+234-904-031-9206</li>
              <li className=" ">
                19b, Sinari Daranijo, Victoria Island, Lagos, Nigeria.
              </li>
            </ul>
          </div>
        </div>
        <hr className=" w-full opacity-30" />
        <p id="footer-copyright" className="tab-m:text-center">
          Copyright 2024 © Cardinaltorch.com - All Right Reserved.
        </p>
      </footer>
    </div>
  );
};
export default Footer;
