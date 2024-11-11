"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AddImgDropZone from "@components/AddImgDropZone";

const UploadImagePage = ({ setState }) => {
  const characterLimit = 150;
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const submitBttnRef = useRef(null);

  useEffect(() => {
    submitBttnRef.current.disabled = true;
  }, []);

  const handleImageSelection = (e) => {
    const selectedImg = e.target.files[0];

    if (selectedImg) {
      if (selectedImg.size > 1024 * 1024 * 6) {
        toast.error("Image should be less than 6MB", { id: "Image-too-large" });
      } else {
        setImage(selectedImg);
        if (!desc) {
          submitBttnRef.current.disabled = true;
        } else {
          submitBttnRef.current.disabled = false;
        }
      }
    }
  };

  const handleDescChangeEvent = (e) => {
    const input = e.target.value;

    setDesc(input);

    if (!image || !input) {
      submitBttnRef.current.disabled = true;
    } else {
      submitBttnRef.current.disabled = false;
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    submitBttnRef.current.disabled = true;
    let formData = new FormData();

    if (!image) {
      return toast.error("Please select an image to upload", {
        id: "no-image-err",
      });
    }

    if (!desc) {
      return toast.error("Please give the image a description", {
        id: "no-image-desc-err",
      });
    }

    formData.append("image", image);
    formData.append("desc", desc);

    const loadingToast = toast.loading("Uploading...");
    try {
      const res = await axios.post(`/api/images/upload`, formData);
      toast.dismiss(loadingToast);
      toast.success(res.data.message, { id: "image-upload-successfull" });
      setDesc("");
      setImage(null);
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex flex-col w-full h-full overflow-hidden">
      <nav className="w-full px-[3vw]">
        <div className="flex gap-2 items-center py-2 border-b">
          <button onClick={() => setState("view")} className="">
            <i className="fi fi-rr-angle-left"></i>
          </button>
          <p className="text-lg">Upload Image</p>
        </div>
      </nav>
      <section className="overflow-y-scroll">
        <div className="grid grid-cols-2 tab-m:flex tab-m:flex-col gap-5 w-[90%] mx-auto py-5 ">
          <div className="flex w-full aspect-square rounded-md overflow-hidden">
            <label
              htmlFor="upload-img-selector"
              className="flex w-full h-full cursor-pointer"
            >
              {!image ? (
                <AddImgDropZone />
              ) : (
                <img
                  src={typeof image == "object" && URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-full bg-gray-50 object-cover overflow-hidden hover:opacity-90"
                />
              )}
            </label>
            <input
              id="upload-img-selector"
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              onChange={handleImageSelection}
              hidden
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="form-field-div">
              <label htmlFor="upload-img-desc-textarea" className="form-label">
                Description
              </label>
              <textarea
                id="upload-img-desc-textarea"
                name="desc"
                value={desc}
                maxLength={characterLimit}
                placeholder="Write a short description about this image"
                className={`input-box px-4 py-3 resize-none`}
                onChange={handleDescChangeEvent}
                // onKeyDown={handleBlogDescKeyDown}
                rows={3}
              ></textarea>
              <p className="text-end text-xs text-gray-500">
                {characterLimit - desc.length} characters left
              </p>
            </div>
            <button
              ref={submitBttnRef}
              onClick={uploadImage}
              className="bttn-primary place-self-end"
            >
              Upload
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
export default UploadImagePage;
