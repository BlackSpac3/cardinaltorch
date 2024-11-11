"use client";
import { assets } from "@assets/assets";
import axios from "axios";
import Compressor from "compressorjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { data: session, update } = useSession();
  const bioLimit = 150;
  const profileImgRef = useRef(null);
  const submitBttnRef = useRef(null);

  const [charactersleft, setCharactersLeft] = useState(bioLimit);
  const [profileImgPreview, setProfileImgPreview] = useState(null);

  let email = session?.user?.email;
  let first_name = session?.user?.first_name;
  let last_name = session?.user?.last_name;
  let profile_img = session?.user?.profile_img;
  let bio = session?.user?.bio;

  const handleBioCharacterChange = (e) => {
    const input = e.target.value;
    setCharactersLeft(bioLimit - input.length);
  };

  const handleProfileImgUpload = (e) => {
    const img = e.target.files[0];
    profileImgRef.current.src = URL.createObjectURL(img);
    setProfileImgPreview(img);
  };

  const removeProfileImg = (e) => {
    e.preventDefault();
    profile_img = "default";
    setProfileImgPreview(null);
    profileImgRef.current.src = assets.default_profile_img;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (
      formData.get("first_name").length < 2 ||
      formData.get("last_name").length < 2
    ) {
      return toast.error("Name cannot be less than 2 characters", {
        id: "short-name-error",
      });
    }
    if (formData.get("bio").length > bioLimit) {
      return toast.error(`Bio should not be more than ${bioLimit} characters`);
    }

    if (!profileImgPreview) {
      formData.append("profile_img", profile_img);
    } else {
      const compressedImg = await new Promise((resolve, reject) => {
        new Compressor(profileImgPreview, {
          quality: 0.6,
          mimeType: "image/webp",
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error);
          },
        });
      });
      formData.append("profile_img", compressedImg, compressedImg.name);
    }

    const loadingToast = toast.loading("Updating...");
    try {
      const response = await axios.post("/api/users/update", formData);
      updateSession(response);
      toast.dismiss(loadingToast);
      toast.success(response.data.message, {
        id: "profile-update-successfull",
      });
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(error.response.data.message);
    }
  };

  const updateSession = async (response) => {
    const newSesdata = {
      ...session,
      user: { ...session?.user, ...response.data.data },
    };
    await update(newSesdata);
  };
  return (
    <section className="flex flex-col w-full h-full overflow-hidden">
      <div className="overflow-y-scroll">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row items-center lg:items-start py-10 gap-8 lg:gap-10 mx-auto w-[60%] tab:w-[90%]"
        >
          <div className="flex items-start gap-10 ">
            <div className="flex flex-col gap-3 items-center">
              <label
                htmlFor="uploadProfileImg"
                className="relative flex h-32 w-32 bg-gray-100 rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0   flex items-center justify-center  bg-[#000000] bg-opacity-20 rounded-full cursor-pointer opacity-0 hover:opacity-100 duration-200">
                  <i class="fi fi-sr-pencil text-white text-[24px]"></i>
                </div>
                <img
                  ref={profileImgRef}
                  src={profile_img}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </label>
              <input
                type="file"
                id="uploadProfileImg"
                accept=".jpeg, .jpg, .png "
                onChange={handleProfileImgUpload}
                hidden
              />
              <button
                onClick={removeProfileImg}
                className="rounded-full bg-gray-100 px-5 py-2 text-xs"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 w-full">
            <div className="flex gap-2 items-start w-full">
              <div className="form-field-div">
                <label htmlFor="first-name-input-field" className="form-label">
                  First name
                </label>
                <input
                  id="first-name-input-field"
                  name="first_name"
                  Value={first_name}
                  type="text"
                  placeholder="John"
                  className="input-box px-3 py-2"
                />
              </div>
              <div className="form-field-div">
                <label htmlFor="last-name-input-field" className="form-label">
                  Last name
                </label>
                <input
                  id="last-name-input-field"
                  type="text"
                  name="last_name"
                  Value={last_name}
                  placeholder="Doe"
                  className="input-box px-3 py-2"
                />
              </div>
            </div>

            <div className="form-field-div">
              <label htmlFor="email-input-field" className="form-label">
                Email
              </label>
              <input
                id="email-input-field"
                name="email"
                Value={email}
                type="text"
                placeholder="johndoe@example.com"
                className="input-box px-3 py-2"
              />
            </div>
            <div className="form-field-div">
              <label htmlFor="bio-input-field" className="form-label">
                Bio
              </label>

              <textarea
                id="bio-input-field"
                name="bio"
                defaultValue={bio}
                className={"input-box py-2 px-4 resize-none lg:40 leading-7"}
                placeholder="Write about yourself"
                maxLength={bioLimit}
                onChange={handleBioCharacterChange}
                rows={6}
              />
              <p className="form-label place-self-end">{`${charactersleft} characters left`}</p>
            </div>

            <button
              ref={submitBttnRef}
              type="submit"
              className="bttn-primary text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default page;
