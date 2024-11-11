import { useContext, useState } from "react";
import { assets, icons } from "../assets/assets";
import { UserContext } from "../context/UserContext";
import { capitalize } from "../utils";

const EditProfile = ({ setShow }) => {
  const labelStyle = "font-medium text-sm";
  const inputStyle = "border-[1px] rounded-md px-3 py-2 w-full text-sm";
  const {
    userData: {
      personal_info: { first_name, last_name, email, profile_img },
      account_info: { type },
    },
    url,
  } = useContext(UserContext);
  const [showEditProfileImgIcon, setShowEditProfileImgIcon] = useState(false);
  return (
    <div className="flex justify-center absolute bg-[#00000070] backdrop-filter backdrop-blur-sm w-full h-full z-20">
      <div className="flex flex-col gap-5 w-[35%] bg-white place-self-center p-7 rounded-xl">
        <div className="flex gap-5 items-center w-full">
          <div
            onMouseEnter={() => setShowEditProfileImgIcon(true)}
            onMouseLeave={() => setShowEditProfileImgIcon(false)}
            className="relative"
          >
            <div
              className={`${
                showEditProfileImgIcon ? "" : "opacity-0"
              } absolute flex items-center justify-center w-full h-full bg-[#00000040] z-10 rounded-full cursor-pointer duration-200`}
            >
              {/* <img src={icons.edit_filled_white} alt="" className="w-[32px]" /> */}
              <i class="fi fi-sr-pencil text-white text-[24px]"></i>
            </div>
            <img
              src={`${url}/profile_imgs/` + profile_img}
              alt=""
              className="w-[76px] h-[76px] rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-base">{`${capitalize(first_name)} ${capitalize(
              last_name
            )}`}</p>
            <div className="flex items-center gap-1 text-xs">
              <p className=" text-gray-500">{capitalize(email)}</p>
              <img src={assets.verified_badge} alt="" className="w-[18px]" />
              {/* <p className="text-primary font-medium cursor-pointer">
                Verify email
              </p> */}
            </div>
            <div className="flex text-xs gap-1">
              <p className=" text-gray-500">{capitalize(type)}</p>
              <span className="text-primary cursor-pointer font-medium">
                - Manage users
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <hr />
          <div className="grid grid-cols-[0.5fr_1fr]">
            <p className={labelStyle}>Name</p>
            <div className="flex gap-2">
              <input
                type="text"
                className={inputStyle}
                placeholder={first_name}
              />
              <input
                type="text"
                className={inputStyle}
                placeholder={last_name}
              />
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-[0.5fr_1fr]">
            <p className={labelStyle}>Email</p>
            <input type="text" className={inputStyle} placeholder={email} />
          </div>
          <hr />
        </div>

        <div className="flex items-center justify-between text-sm">
          <p className=" text-primary">Change Password?</p>
          <div className="flex gap-2 ">
            <button
              onClick={() => setShow(false)}
              className="bg-transparent border-[1px] border-primary text-primary py-2 px-3 rounded-md duration-150"
            >
              Cancel
            </button>
            <button className="bg-primary border-[1px] py-2 px-3 rounded-md text-white">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// export default EditProfile;
