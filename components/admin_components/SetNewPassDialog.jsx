import TextBox from "./TextBox";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import GlobalNav from "@components/GlobalNav";

const SetNewPassDialog = () => {
  const { data: session, update } = useSession();
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
  const submitBttn = useRef(null);
  const [validLength, setValidLength] = useState(false);

  const [confirmed, setConfirmed] = useState(false);
  const [data, setData] = useState({
    confirmPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const checkIcon = "fi fi-sr-check text-primary text-[10px] duration-100";
  const crossIcon = "fi fi-sr-cross text-red-600 text-[10px] duration-100";

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    submitBttn.current.disabled = true;
    setIsLoading(true);
    const { confirmPassword, newPassword } = data;

    if (!confirmPassword.length || !newPassword.length) {
      submitBttn.current.disabled = false;
      setIsLoading(false);
      return toast.error("Fill in all fields", {
        id: "fill-in-all-fields-error",
      });
    }

    if (!passwordRegex.test(newPassword)) {
      submitBttn.current.disabled = false;
      setIsLoading(false);
      return toast.error("Set stronger password", {
        id: "set-stronger-pass-error",
      });
    }

    if (confirmPassword != newPassword) {
      submitBttn.current.disabled = false;
      setIsLoading(false);
      return toast.error("Password does not match", {
        id: "pass-does-not-match-error",
      });
    }

    const loadingToast = toast.loading("Updating...");
    try {
      const response = await axios.post("/api/users/set-password", {
        password: newPassword,
      });

      const newSesdata = {
        ...session,
        user: { ...session?.user, default_pass: false },
      };

      await update(newSesdata);
      toast.dismiss(loadingToast);
      toast.success(response.data.message, {
        id: "password-update-succeassful",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.data.message) {
          return toast.error(error.response.data.message);
        }
      }
      toast.dismiss(loadingToast);
      toast.error("Something went wrong somewhere");
    } finally {
      setIsLoading(false);
      submitBttn.current.disabled = false;
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <GlobalNav />
      <div className="bg-white shadow-lg w-[380px] phone:w-[90%] rounded-md mx-auto my-10 outline-none p-7">
        <div className="flex flex-col gap-2">
          <div className="">
            <h2 className=" text-lg font-medium">Welcome!</h2>
            <p className="text-sm text-gray-500 mt-1">
              To make your account secure, please create a new password to
              replace the temporary password you were given in the email.
            </p>
            <div className="flex flex-col gap-1 mt-3 text-xs text-gray-500">
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
                    className={
                      /[0-9]/.test(data.newPassword) ? checkIcon : crossIcon
                    }
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
                    className={
                      /[A-Z]/.test(data.newPassword) ? checkIcon : crossIcon
                    }
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
                      /[!@#$%^&*]/.test(data.newPassword)
                        ? checkIcon
                        : crossIcon
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
          </div>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-2 mt-5">
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

            <button ref={submitBttn} type="submit" className="bttn-wide mt-2">
              {isLoading ? "Updating..." : "Save Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SetNewPassDialog;
