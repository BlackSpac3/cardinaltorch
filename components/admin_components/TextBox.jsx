"use client";
import { useState } from "react";

const TextBox = ({
  id_name,
  onChange,
  type,
  name,
  value,
  placeholder,
  icon,
  content,
  ref,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-full">
      <input
        id={id_name}
        onChange={onChange}
        type={type === "password" ? (passwordVisible ? "text" : type) : type}
        name={name}
        value={value}
        placeholder={placeholder}
        required
        ref={ref}
        className={`input-box w-full px-4 py-3 pl-12 text-gray-700`}
      />
      <i
        className={`fi fi-rr-${icon} absolute text-[14px] left-4 top-1/2 -translate-y-1/2 text-gray-600`}
      ></i>

      {type === "password" ? (
        <div
          onClick={() =>
            passwordVisible
              ? setPasswordVisible(false)
              : setPasswordVisible(true)
          }
          className={`${
            content ? "" : "hidden"
          } absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer`}
        >
          {passwordVisible ? (
            <i className="fi fi-rr-eye-crossed text-[14px] text-gray-600"></i>
          ) : (
            <i className="fi fi-rr-eye text-[16px] text-gray-600"></i>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default TextBox;
