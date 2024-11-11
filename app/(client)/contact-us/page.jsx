"use client";
import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";

const page = () => {
  const inputStyle =
    "w-full p-3 border outline-green-300 rounded-md resize-none";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
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
            transition={{ duration: 0.5, delay: 1 }}
            className="text-5xl font-medium"
          >
            Contact Us
          </motion.h2>
          <motion.p
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, delay: 1 }}
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
        <form action="" className="flex flex-col gap-3">
          <div>
            <input
              required
              className={inputStyle}
              type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              required
              type="email"
              className={inputStyle}
              placeholder="Email"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <input
              required
              type="text"
              className={inputStyle}
              placeholder="tab-s Number"
            />

            <input
              required
              type="text"
              className={inputStyle}
              placeholder="Company"
            />
          </div>
          <div>
            <div>
              <textarea
                rows={4}
                className={inputStyle}
                name=""
                id=""
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end ">
            <button className=" outline-green-300 px-7 py-3 rounded-full bg-primary text-white">
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

export default page;
