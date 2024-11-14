"use client";
import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { emailRegex } from "@utils";
import axios from "axios";

const ContactUsPage = () => {
  const inputStyle =
    "w-full p-3 border outline-green-300 rounded-md resize-none";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitBttn = document.getElementById("contact-us-form-submit-button");
    submitBttn.disabled = true;

    if (!formData.get("name")) {
      submitBttn.disabled = false;
      return toast.error("Please enter your name", {
        id: "contact-us-form-no-name-error",
      });
    }

    if (!formData.get("email") || !emailRegex.test(formData.get("email"))) {
      submitBttn.disabled = false;
      return toast.error("Please provide a valid email", {
        id: "contact-us-form-invalid-email-error",
      });
    }

    if (!formData.get("message")) {
      submitBttn.disabled = false;
      return toast.error("Please enter a message", {
        id: "contact-us-form-no-message-error",
      });
    }

    const loadingToast = toast.loading("Sending...", {
      id: "contact-us-form-sending-toast",
    });
    try {
      const response = await axios.post("/api/contact-us", formData);
      toast.dismiss(loadingToast);
      toast.success(response.data.message, {
        id: "contact-us-form-message-sent-successfully",
      });
    } catch (error) {
      if (error.response.data.message) {
        return toast.error(error.response.data.message, {
          id: "contact-us-form-api-error",
        });
      }

      return toast.error("Error connecting to server", {
        id: "contact-us-form-server-error",
      });
    } finally {
      submitBttn.disabled = false;
    }

    console.log(formData.get("name"));
    console.log(formData.get("email"));
    console.log(formData.get("number"));
    console.log(formData.get("company"));
    console.log(formData.get("message"));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setError(true);
      }
    }, 50000);

    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <section className="mt-[30px] tab-s:mt-[70px] flex flex-col gap-10 p-[5vw]">
      <div id="about-header" className="">
        <section className="w-[50%] tab-s:w-full">
          <motion.h2
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-5xl font-medium"
          >
            Contact Us
          </motion.h2>
          <motion.p
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="body-text mt-5"
          >
            We'd love to hear from you! Please feel free to get in touch if you
            have any questions, feedback, or want to connect. Your thoughts and
            insights are important to us, and we're here to help.
          </motion.p>
        </section>
      </div>
      <hr />
      <div className="grid grid-cols-2 tab-s:grid-cols-1 items-start gap-10">
        <form onSubmit={submitForm} className="flex flex-col gap-3">
          <div>
            <input
              required
              className={inputStyle}
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              //   required
              type="text"
              name="email"
              className={inputStyle}
              placeholder="Email"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              name="number"
              className={inputStyle}
              placeholder="Number"
            />

            <input
              type="text"
              name="company"
              className={inputStyle}
              placeholder="Company"
            />
          </div>
          <div>
            <div>
              <textarea
                rows={4}
                className={inputStyle}
                name="message"
                required
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end ">
            <button
              id="contact-us-form-submit-button"
              type="submit"
              className=" outline-green-300 px-7 py-3 rounded-full bg-primary text-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-[#9ea5b0] duration-75"
            >
              Send
            </button>
          </div>
        </form>

        <div>
          {error && (
            <div className="error-message">
              <p>Sorry, the map could not be loaded. Please try again later.</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center">
              <PuffLoader color={"#2fae60"} loading={loading} size={50} />
            </div>
          )}
          <iframe
            className="w-[100%] rounded-md tab-s:mt-5"
            height="350"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            style={{ border: 0, display: loading ? "none" : "block" }}
            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=19,%20Sinari%20Daranijo%20Street,%20Victoria%20island%20Lagos+(Cardinal%20Torch%20Company%20Limited)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            onLoad={handleLoad}
          >
            <a href="https://www.gps.ie/">gps tracker sport</a>
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
