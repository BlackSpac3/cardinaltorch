"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextBox from "../TextBox";
import toast from "react-hot-toast";
import axios from "axios";

const ResetPassForm = ({ token }) => {
  const route = useRouter();

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

  const submitBttn = useRef(null);

  const [validLength, setValidLength] = useState(false);

  const [confirmed, setConfirmed] = useState(false);
  const [data, setData] = useState({
    confirmPassword: "",
    newPassword: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const checkIcon = "fi fi-sr-check text-primary text-[10px] duration-100";
  const crossIcon = "fi fi-sr-cross text-red-600 text-[10px] duration-100";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    submitBttn.current.disabled = true;
    const { confirmPassword, newPassword } = data;

    if (!confirmPassword.length || !newPassword.length) {
      submitBttn.current.disabled = false;
      return toast.error("Fill in all fields", { id: "blank-field-error" });
    }

    if (!passwordRegex.test(newPassword)) {
      submitBttn.current.disabled = false;
      return toast.error("Set stronger password", {
        id: "set-stronger-pass-error",
      });
    }

    if (confirmPassword != newPassword) {
      submitBttn.current.disabled = false;
      return toast.error("Password does not match", {
        id: "pass-does-not-match-error",
      });
    }

    const loadingToast = toast.loading("Updating...");
    try {
      const response = await axios.post("/api/users/set-password", {
        token,
        password: newPassword,
      });

      toast.dismiss(loadingToast);
      toast.success(response.data.message, {
        id: "password-update-succeassful",
      });
      route.replace("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.data.message) {
          return toast.error(error.response.data.message);
        }
      }
      toast.dismiss(loadingToast);
      toast.error("Something went wrong somewhere");
    } finally {
      submitBttn.current.disabled = false;
    }
  };

  useEffect(() => {
    const { confirmPassword, newPassword } = data;

    newPassword.length < 8 ? setValidLength(false) : setValidLength(true);

    if (confirmPassword != newPassword || !passwordRegex.test(newPassword)) {
      submitBttn.current.disabled = true;
      setConfirmed(false);
    } else {
      submitBttn.current.disabled = false;
      setConfirmed(true);
    }
  }, [data]);

  return (
    <form
      onSubmit={onSubmitHandler}
      action=""
      className=" h-fit mt-8 flex flex-col gap-2 w-[420px] phone:w-[90%] text-sm items-center mx-auto"
    >
      <div className="flex flex-col items-center text-center w-[80%]">
        <div className="p-2 bg-primary bg-opacity-5 rounded-full">
          <div className="p-3 aspect-square flex items-center justify-center rounded-full text-primary bg-primary bg-opacity-5">
            <i className="fi fi-sr-lock text-2xl opacity-80"></i>
          </div>
        </div>
        <h2 className="text-xl  w-full mt-4">Reset Account Password</h2>
        <p className="text-gray-500 text-sm">
          Your new password must be different from previously used passwords.
        </p>
      </div>
      <div className="flex flex-col w-full gap-2 mt-5">
        <TextBox
          id_name="new-password-input"
          onChange={onChangeHandler}
          type="password"
          name="newPassword"
          value={data.newPassword}
          placeholder="Enter New Password"
          icon="unlock"
          content={data.newPassword}
        />
        <div
          className={` rounded-md duration-100 ${
            data.confirmPassword.length > 0
              ? confirmed
                ? "border-[#2fae60] border"
                : "border-red-500 border"
              : " duration-100"
          }`}
        >
          <TextBox
            id_name="current-password-input"
            onChange={onChangeHandler}
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Confirm New Password"
            icon="unlock"
            content={data.confirmPassword}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1 text-xs text-gray-500 w-full">
        <p>Password must include:</p>

        <div className="flex flex-col gap-1 pl-2">
          <div className="flex gap-2">
            <i className={validLength ? checkIcon : crossIcon}></i>
            <p
              className={
                validLength
                  ? "text-primary duration-100"
                  : "text-red-600 duration-100"
              }
            >
              At least 8 characters
            </p>
          </div>

          <div className="flex gap-2">
            <i
              className={/[0-9]/.test(data.newPassword) ? checkIcon : crossIcon}
            ></i>
            <p
              className={
                /[0-9]/.test(data.newPassword)
                  ? "text-primary duration-100"
                  : "text-red-600 duration-100"
              }
            >
              At least one number (0 - 9)
            </p>
          </div>

          <div className="flex gap-2">
            <i
              className={/[A-Z]/.test(data.newPassword) ? checkIcon : crossIcon}
            ></i>
            <p
              className={
                /[A-Z]/.test(data.newPassword)
                  ? "text-primary duration-100"
                  : "text-red-600 duration-100"
              }
            >
              At least one uppercase letter (A - Z)
            </p>
          </div>

          <div className="flex gap-2">
            <i
              className={
                /[!@#$%^&*]/.test(data.newPassword) ? checkIcon : crossIcon
              }
            ></i>
            <p
              className={
                /[!@#$%^&*]/.test(data.newPassword)
                  ? "text-primary duration-100"
                  : "text-red-600 duration-100"
              }
            >
              At least one special character (!@#$%^&*)
            </p>
          </div>
        </div>
      </div>

      <button ref={submitBttn} type="submit" className="bttn-wide mt-2 w-full">
        Reset Password
      </button>
    </form>
  );
};
export default ResetPassForm;
