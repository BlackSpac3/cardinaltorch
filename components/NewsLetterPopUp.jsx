"use client";
// import { setCookie } from "../utils";
import { setCookie, getCookie } from "@utils";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { emailRegex } from "@utils";

const NewsLetterPopUp = () => {
  const submit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    const email = document.getElementById(
      "subscriber-popup-email-input-field"
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

      setTimeout(() => {
        setCookie("nl", "closed", 1);
        document.getElementById("newsletter-popup").close();
      }, 500);
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
      className="mx-auto my-auto bg-newsletter bg-no-repeat bg-center w-[900px] tab-m:w-[700px] tab-s:w-[80%] phone:w-[90%] h-[500px] rounded-xl 0 overflow-hidden"
    >
      <Toaster />
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-14 phone:gap-7 justify-center text-white w-[80%] tab-s:w-full  p-10 text-center">
          <h2 className="text-4xl tab-s:text-2xl leading-tight font-light">
            <span className="font-semibold underline underline-offset-4">
              Stay Informed:
            </span>{" "}
            Subscribe to Our Newsletter for the Latest in Commodity Insights and
            Market Trends!
          </h2>
          <div className="w-full flex  flex-col items-center gap-5">
            <div className="bg-white w-[80%] tab-s:w-full tab-s:text-sm text-black rounded-full p-1 phone:p-0 phone:rounded-none phone:bg-transparent">
              <div className="w-full flex phone:flex-col bg-white rounded-full p-1 phone:p-0 phone:rounded-none phone:bg-transparent phone:gap-2">
                <input
                  id="subscriber-popup-email-input-field"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full outline-none px-5 phone:px-5 phone:py-3"
                />
                <button
                  type="button"
                  onClick={submit}
                  className="bg-primary px-10 py-3 rounded-full min-w-fit text-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-[#9ea5b0] duration-75"
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
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#00000080] to-transparent z-[-1]"></div>
      </div>
    </dialog>
  );
};
export default NewsLetterPopUp;
