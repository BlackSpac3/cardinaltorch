"use client";

import TextBox from "@components/admin_components/TextBox";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

const page = () => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [data, setData] = useState({
    email: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { email } = data;
    const submitBttn = document.getElementById("reset-password-submit-bttn");
    submitBttn.disabled = true;

    if (!email || !emailRegex.test(email)) {
      submitBttn.disabled = false;
      return toast.error("Please provide a valid email", {
        id: "please-provide-recovery-email",
      });
    }

    const loadingToast = toast.loading("Sending...", {
      id: "sending-pass-request-proccessing",
    });

    try {
      const response = await axios.post("/api/users/forgot-password", data);

      toast.dismiss(loadingToast);
      toast.success(response.data.message, {
        id: "forgot-pass-email-successfully-sent",
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response.data.message);
    } finally {
      submitBttn.disabled = false;
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col mt-5 gap-5">
      <div id="forgot-pass-page-title">
        <h2 className="font-semibold text-xl">Reset your password</h2>
        <p className="text-sm text-gray-500">
          Enter the email address you used to register with.
        </p>
      </div>
      <TextBox
        id_name="recovery-email-input"
        type="email"
        name="email"
        onChange={onChangeHandler}
        value={data.email}
        placeholder="Email address"
        icon="envelope"
      />
      <div className="w-full flex items-center justify-between">
        <Link
          href="/login"
          className="bttn bg-primary text-primary bg-opacity-5 duration-100"
        >
          Back to log in
        </Link>
        <button
          id="reset-password-submit-bttn"
          type="submit"
          className="bttn-primary"
        >
          Send Instructions
        </button>
      </div>
    </form>
  );
};
export default page;
