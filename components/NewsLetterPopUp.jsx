"use client";
// import { setCookie } from "../utils";
import { setCookie, getCookie } from "@utils";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const NewsLetterPopUp = () => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submit = async (e) => {
    e.preventDefault();

    const email = document.getElementById(
      "subscriber-popup-email-input-field"
    ).value;

    if (!email || !emailRegex.test(email)) {
      return alert("Enter a valid email adddress");
    }
    const loadingToast = toast.loading("Subscribing...", {
      id: "subscribing-to-news-letter-process",
    });
    try {
      const response = await axios.post(`/api/subscribe`, { email });
      toast.dismiss(loadingToast);
      toast.success("You have successfully subscribed to our newsletter", {
        id: "newsletter-subscription-successfull",
      });
      setCookie("nl", "closed", 1);
      document.getElementById("newsletter-popup").close();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong somewhere", {
        id: "newsletter-subscription-error",
      });
    }
  };

  const close = () => {
    document.getElementById("newsletter-popup").close();
    setCookie("nl", "closed", 1);
  };

  useEffect(() => {
    const nl = getCookie("nl");

    const timer = setTimeout(() => {
      if (!nl) {
        document.getElementById("newsletter-popup").showModal();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (e.keyCode === 27) {
        setCookie("nl", "closed", 1);
      }
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  });
  return (
    <dialog
      id="newsletter-popup"
      className="mx-auto my-auto bg-newsletter bg-no-repeat bg-center w-[900px] tab-m:w-[700px] tab-s:w-[80%] h-[500px] rounded-xl 0 overflow-hidden"
    >
      <Toaster />
      <div className="flex items-center justify-center w-full h-full">
        <form
          onSubmit={submit}
          className="flex flex-col items-center gap-14 justify-center text-white w-[80%] tab-s:w-full  p-10 text-center"
        >
          <h2 className="text-4xl tab-s:text-2xl leading-tight font-light">
            <span className="font-semibold underline underline-offset-4">
              Stay Informed:
            </span>{" "}
            Subscribe to Our Newsletter for the Latest in Commodity Insights and
            Market Trends!
          </h2>
          <div className="w-full flex  flex-col items-center gap-5">
            <div className="bg-white w-[80%] tab-s:w-full tab-s:text-sm text-black rounded-full p-1">
              <div className="w-full flex bg-white rounded-full p-1">
                <input
                  id="subscriber-popup-email-input-field"
                  // type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full outline-none px-5"
                />
                <button
                  type="submit"
                  className="bg-primary px-10 py-3 rounded-full min-w-fit text-white"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <p
              onClick={close}
              className="underline underline-offset-4 cursor-pointer text-lg"
            >
              Cancel
            </p>
          </div>
        </form>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#00000080] to-transparent z-[-1]"></div>
      </div>
    </dialog>
  );
};
export default NewsLetterPopUp;
