"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TextBox from "../TextBox";

const LoginPage = () => {
  const route = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("login-submit-button").disabled = true;
    const { email, password } = data;
    if (!email) {
      document.getElementById("login-submit-button").disabled = false;
      return toast.error("Please fill in a valid email", {
        id: "no-email-error",
      });
    }
    if (!password) {
      document.getElementById("login-submit-button").disabled = false;
      return toast.error("Please enter your password", {
        id: "no-password-error",
      });
    }
    const loadingToast = toast.loading("Logging In...", {
      id: "loggin-in-proccess",
    });

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        console.log(response);
        if (response.status == 401) {
          toast.dismiss(loadingToast);
          return toast.error("Invalid credentials");
        }
        toast.dismiss(loadingToast);
        toast.error("something went wrong");
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("Login Successfull");
      route.push("/admin");
    } catch (error) {
      console.log("Error: ", error);
      toast.dismiss(loadingToast);
      toast.error("something went ", { id: "response-success-error" });
    } finally {
      document.getElementById("login-submit-button").disabled = false;
    }
  };

  return (
    <form onSubmit={HandleSubmit} className="flex flex-col mt-5 gap-5">
      <div>
        <h2 className="font-semibold text-xl">Welcome back!</h2>
        <p className="text-sm text-gray-500">Please log in to your account</p>
      </div>
      <div className="flex flex-col gap-2">
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
        id="login-submit-button"
        type="submit"
        className="bttn-wide w-full"
      >
        Log in
      </button>
      <div className="w-[100%] justify-center">
        <p className="text-center">
          Forgot password?{" "}
          <Link
            href="/forgot-password"
            className="text-primary font-medium cursor-pointer"
          >
            Click here
          </Link>
        </p>
      </div>
    </form>
  );
};
export default LoginPage;
