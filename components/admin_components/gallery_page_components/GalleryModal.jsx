"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmDelDialog from "../ConfirmDelDialog";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
const GalleryModal = ({
  id,
  images,
  currentIndex,
  setCurrentIndex,
  setCurrentImg_id,
  currentImg_id,
  fetchData,
  dataToSend,
}) => {
  const { data: session } = useSession();

  const confirmDelModalIdName = "confirm-delete-image-modal";
  const [deleting, setDeleting] = useState(false);

  const curImageData = () => {
    let src;
    let desc;
    let profile_image_src;
    let full_name;
    try {
      src = images.results[currentIndex].image;
      desc = images.results[currentIndex].desc;
      profile_image_src =
        images.results[currentIndex].author.personal_info.profile_img;
      full_name = `${images.results[currentIndex].author.personal_info.first_name} ${images.results[currentIndex].author.personal_info.last_name}`;
    } catch (error) {
      console.log(error);
      src = "";
      desc = "";
      profile_image_src = "";
      full_name = "";
    }

    return { src, desc, profile_image_src, full_name };
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.results.length);
    setCurrentImg_id(
      images.results[(currentIndex + 1) % images.results.length]._id
    );
  };

  const showPrevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + images.results.length) % images.results.length
    );
    setCurrentImg_id(
      images.results[
        (currentIndex - 1 + images.results.length) % images.results.length
      ]._id
    );
  };

  const close = () => {
    document.getElementById(id).close();
    setCurrentImg_id(null);
    setCurrentIndex(null);
  };

  const delImage = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setDeleting(true);

    try {
      const res = await axios.post("/api/images/remove", {
        img_id: currentImg_id,
      });
      e.target.disabled = false;
      setDeleting(false);
      toast.success(res.data.message, { id: "image-delete-success" });
      document.getElementById(confirmDelModalIdName).close();
      document.getElementById(id).close();
      fetchData(dataToSend);
    } catch (error) {
      console.log(error);
      e.target.disabled = false;
      setDeleting(false);
      toast.error("Something went wrong somewhere", {
        id: "something-went-wrong-somewhere",
      });
    }
  };

  useEffect(() => {
    let handler = (e) => {
      if (e.keyCode == 37) {
        document.getElementById("gallery-modal-prev-button").click();
      } else if (e.keyCode == 39) {
        document.getElementById("gallery-modal-next-button").click();
      }
    };
    document.getElementById(id).addEventListener("keydown", handler);

    return () => {
      try {
        document.getElementById(id).removeEventListener("keydown", handler);
      } catch (error) {
        console.log(error);
      }
    };
  });
  return (
    <dialog
      id={id}
      className="place-self-center w-[100vw] h-[100vh] bg-black bg-opacity-50"
    >
      {images && currentIndex != null && (
        <div className="flex flex-col h-full w-full  bg-transparent text-white">
          <div className="absolute top-0 left-0 flex w-full h-full">
            <img
              className="max-w-full max-h-full flex-shrink object-contain mx-auto "
              src={curImageData().src}
            />
          </div>

          <div className="relative h-full z-20">
            <div className="flex w-full items-start justify-between px-[4vw] py-7 bg-gradient-to-b from-[#00000070] to-transparent ">
              <p className="w-[60%] phone:w-[90%]">{curImageData().desc}</p>
              <button
                title="Close"
                onClick={close}
                className=" flex justify-center items-center aspect-square hover:bg-gray-50 hover:bg-opacity-20  rounded-md focus:bg-gray-50 focus:bg-opacity-20 outline-none duration-150 "
              >
                <i className="fi fi-rr-cross p-3 active:scale-75 duration-100"></i>
              </button>
            </div>

            <div className="flex absolute top-1/2 -translate-y-1/2 w-full justify-between items-center text-white text-2xl">
              <button
                title="Previous"
                id="gallery-modal-prev-button"
                className="flex justify-center items-center m-[2vw] rounded-md hover:bg-gray-50 hover:bg-opacity-20 focus:bg-gray-50 focus:bg-opacity-20 outline-none  duration-150 "
                onClick={showPrevImage}
              >
                <i className="fi fi-rr-angle-small-left p-2 active:scale-75 duration-100"></i>
              </button>

              <button
                title="Next"
                id="gallery-modal-next-button"
                className=" flex justify-center items-center m-[2vw] rounded-md hover:bg-gray-50 hover:bg-opacity-20 focus:bg-gray-50 focus:bg-opacity-20 outline-none duration-150 "
                onClick={showNextImage}
              >
                <i className="fi fi-rr-angle-small-right p-2 active:scale-75 duration-100"></i>
              </button>
            </div>

            <div className="flex w-full absolute bottom-0 left-0 items-center justify-between px-[4vw] py-7 bg-gradient-to-t from-[#00000070] to-transparent">
              <div className="flex items-center gap-2">
                <img
                  src={curImageData().profile_image_src}
                  alt=""
                  className="w-7 h-7 rounded-full bg-gray-50"
                />
                <p>
                  Uploaded by {""}
                  <span className="capitalize">{curImageData().full_name}</span>
                </p>
              </div>
              {session?.user?.user_type == "admin" && (
                <button
                  title="Delete"
                  onClick={() =>
                    document.getElementById(confirmDelModalIdName).showModal()
                  }
                  className=" text-lg bg-red-500 flex items-center rounded-full  justify-center gap-1"
                >
                  <i className="fi fi-rr-trash p-3 active:scale-75 duration-100"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmDelDialog
        id_name={confirmDelModalIdName}
        delfunc={delImage}
        loadingState={deleting}
        warningText="This image will be permanently deleted, and this action cannot be reversed."
      />
    </dialog>
  );
};
export default GalleryModal;
