import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Proccessing from "../Proccessing";
import Image from "next/image";
import { assets } from "@assets/assets";

const AddUserDialog = ({ id, fetchfunc, query, acct_type }) => {
  const nameLimit = 3;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const inputStyle = "border rounded-md px-3 py-2 w-full text-sm outline-none";
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_type: "user",
  });
  const submitBttnRef = useRef(null);
  let { first_name, last_name, email, user_type } = formData;

  const [addUserLoading, setAddUserLoading] = useState(false);
  const addUser = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    submitBttnRef.current.disabled = true;
    if (first_name.length < nameLimit || last_name.length < nameLimit) {
      setAddUserLoading(false);
      submitBttnRef.current.disabled = false;
      return toast.error("User must have a first and last name", {
        id: "no-user-name-err",
      });
    }
    if (!emailRegex.test(email)) {
      setAddUserLoading(false);
      submitBttnRef.current.disabled = fasle;

      return toast.error("Please provide a valid email", {
        id: "invalid-email-err",
      });
    }

    try {
      const res = await axios.post("/api/users/register", formData);
      setAddUserLoading(false);
      submitBttnRef.current.disabled = false;

      toast.success(res.data.message, { id: "add-user-sucess" });
      fetchfunc({ query, acct_type });
      document.getElementById(id).close();
    } catch (error) {
      console.log(error);
      setAddUserLoading(false);
      submitBttnRef.current.disabled = false;
      document.getElementById(id).close();
      toast.error(error.response.data.message, { id: "add-user-error" });
    }
  };

  const handleInputFieldChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (first_name.length < nameLimit || last_name.length < nameLimit) {
      submitBttnRef.current.disabled = true;
    } else if (!emailRegex.test(email)) {
      submitBttnRef.current.disabled = true;
    } else {
      submitBttnRef.current.disabled = false;
    }
  }, [formData]);
  return (
    <dialog
      id={id}
      className="rounded-xl w-[40%] tab-m:w-fit phone:w-[90%] mx-auto my-auto"
    >
      <form className="flex flex-col gap-5  p-7 ">
        <div className="flex items-start justify-between">
          <div className="flex gap-2 items-center w-full">
            <Image
              src={assets.default_profile_img}
              alt="Profile Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[76px] h-[76px] rounded-full object-cover"
            />

            <div className="flex flex-col">
              <p className="text-base">{`${!first_name ? "John" : first_name} ${
                !last_name ? "Doe" : last_name
              }`}</p>
              <p className=" text-gray-500 text-xs">
                {!email ? "johndoe@example.com" : email}
              </p>
            </div>
          </div>
          <select
            name="user_type"
            id=""
            defaultValue={user_type}
            className="border rounded-md px-2 py-1 text-sm"
            onChange={handleInputFieldChange}
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </div>
        {addUserLoading && (
          <Proccessing color="primary" message="Adding user..." />
        )}
        <div className="flex flex-col gap-2 w-full tab-m:gap-5">
          <hr />
          <div className="grid grid-cols-[0.5fr_1fr] tab-m:flex-col tab-m:flex tab-m:gap-2">
            <label className="form-label">Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="first_name"
                className={inputStyle}
                placeholder="John"
                onChange={handleInputFieldChange}
              />
              <input
                type="text"
                name="last_name"
                className={inputStyle}
                placeholder="Doe"
                onChange={handleInputFieldChange}
              />
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-[0.5fr_1fr] tab-m:flex-col tab-m:flex tab-m:gap-2 ">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={inputStyle}
              placeholder="johndoe@example.com"
              onChange={handleInputFieldChange}
            />
          </div>
          <hr />
        </div>

        <div className="flex gap-2 place-self-end text-sm">
          <button formMethod="dialog" className="bttn-outline">
            Cancel
          </button>
          <button
            ref={submitBttnRef}
            onClick={addUser}
            className="bttn-primary"
          >
            {addUserLoading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default AddUserDialog;
