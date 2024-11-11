import { useContext, useEffect, useRef, useState } from "react";
import TextBox from "../TextBox";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
const ForgotPassForm = ({ setPageState }) => {
  const submitBttn = useRef(null);
  const { url } = useContext(UserContext);
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
    submitBttn.current.disabled = true;

    if (!email || !emailRegex.test(email)) {
      submitBttn.current.disabled = false;
      return toast.error("Please provide a valid email", {
        id: "please-provide-recovery-email",
      });
    }

    const loadingToast = toast.loading("Sending...", {
      id: "sending-pass-request-proccessing",
    });
    try {
      const response = await axios.post(
        `${url}/api/user/forgot-password`,
        data
      );
      if (response.data.success) {
        toast.dismiss(loadingToast);
        toast.success(response.data.message, {
          id: "forgot-pass-email-successfully-sent",
        });
        submitBttn.current.disabled = false;
      } else {
        toast.dismiss(loadingToast);

        toast.error(response.data.message, { id: "response-error" });
        submitBttn.current.disabled = false;
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);

      toast.error("Problem connecting with server", {
        id: "server-connection-error",
      });
    }
  };

  useEffect(() => {
    const { email } = data;
    !emailRegex.test(email)
      ? (submitBttn.current.disabled = true)
      : (submitBttn.current.disabled = false);
  }, [data]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col mt-5 gap-5">
      <div id="forgot-pass-page-title">
        <h2 className="font-semibold font-['poppins'] text-xl">
          Reset your password
        </h2>
        <p className="text-sm font-['poppins'] text-gray-500">
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
        <button
          onClick={() => setPageState("default")}
          type="button"
          className="bttn bg-primary text-primary bg-opacity-5 duration-100"
        >
          Back to log in
        </button>
        <button
          ref={submitBttn}
          type="submit"
          className="bttn-primary font-['poppins']"
        >
          Send Instructions
        </button>
      </div>
    </form>
  );
};
export default ForgotPassForm;
