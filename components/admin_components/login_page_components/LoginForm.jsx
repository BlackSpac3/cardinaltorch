import { UserContext } from "../../context/UserContext.jsx";
import { useState, useContext, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { storeInSession } from "../../common/session.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import TextBox from "../TextBox.jsx";

const LoginForm = ({ setSidebarIsOpen, setPageState }) => {
  const submitBttn = useRef(null);
  const navigate = useNavigate();
  const { url, setUserData } = useContext(UserContext);
  const linkStyle = "text-primary font-medium cursor-pointer";
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    submitBttn.current.disabled = true;

    const { email, password } = data;

    if (!email) {
      submitBttn.current.disabled = false;
      return toast.error("Please fill in a valid email", {
        id: "no-email-error",
      });
    }

    if (!password) {
      submitBttn.current.disabled = false;
      return toast.error("Please enter your password", {
        id: "no-password-error",
      });
    }

    const loadingToast = toast.loading("Logging In...", {
      id: "loggin-in-proccess",
    });
    try {
      const response = await axios.post(`${url}/api/user/login`, data);
      if (response.data.success) {
        storeInSession("user", JSON.stringify(response.data.user));
        setUserData(response.data.user);
        setSidebarIsOpen(false);
        toast.dismiss(loadingToast);
        navigate("/");
        toast.success("Login Successful");
      } else {
        toast.dismiss(loadingToast);
        toast.error(response.data.message);
      }
      submitBttn.current.disabled = false;
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("An unknown error occured");
      submitBttn.current.disabled = false;
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      id="login-popup-container"
      className="flex flex-col mt-5 gap-5"
    >
      <div id="login-page-title">
        <h2 className="font-semibold font-['poppins'] text-xl">
          Welcome back!
        </h2>
        <p className="text-sm font-['poppins'] text-gray-500">
          Please log in to your account
        </p>
      </div>

      <div id="login-page-input" className="flex flex-col gap-2">
        <TextBox
          id_name="email-input"
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Your email"
          icon="envelope"
        />
        <TextBox
          id_name="password-input"
          type="password"
          name="password"
          value={data.password}
          onChange={onChangeHandler}
          placeholder="Password"
          icon="lock"
          content={data.password}
        />
      </div>
      <button
        ref={submitBttn}
        type="submit"
        className="bttn-wide font-['poppins']"
      >
        Log in
      </button>

      <div className="w-[100%] justify-center">
        <p className="text-center font-['poppins']">
          Forgot password?{" "}
          <span
            onClick={() => setPageState("forgot-pass")}
            className={linkStyle}
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};
export default LoginForm;
