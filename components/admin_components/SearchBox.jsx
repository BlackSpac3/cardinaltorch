"use client";
import { useEffect, useState, useRef } from "react";

const SearchBox = ({
  filter,
  options = [{}],
  placeholder,
  onKeyDown,
  onChange,
  search,
}) => {
  const [focus, setFocus] = useState(false);
  const searchButtonRef = useRef(null);
  const inputRef = useRef(null);

  return (
    <div className="relative flex items-center w-full bg-gray-50 rounded-md py-[6px] text-sm">
      {filter && (
        <select
          onChange={filter}
          name=""
          id=""
          className="bg-transparent pl-3  text-placeholder max-wit-fit outline-none cursor-pointer"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} className="">
              {option.name}
            </option>
          ))}
        </select>
      )}
      <input
        ref={inputRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={onKeyDown}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className={`bg-transparent pl-3 ${
          filter && "border-l ml-2 "
        }  outline-none py-1 w-full`}
      />

      <div
        className={`${focus ? "block" : "hidden"} w-[1px] h-full bg-[#e5e7eb]`}
      ></div>
      <button
        onClick={search}
        ref={searchButtonRef}
        className={`h-full  flex justify-center px-3 items-center text-placeholder ${
          focus ? "hover:text-primary cursor-pointer" : "cursor-text"
        }`}
      >
        <i className="fi fi-rr-search "></i>
      </button>
    </div>
  );
};
export default SearchBox;
