import { useState } from "react";
import { icons } from "../assets/assets";

const AddBanner = ({ setData }) => {
  const [banner, setBanner] = useState(false);

  const handleImageLoad = (e) => {
    setBanner(e.target.files[0]);
    setData(e.target.files[0]);
  };

  return (
    <div>
      <div id="add-img-upload">
        <label htmlFor="image">
          <div className="flex flex-col place-content-center bg-gray-100 rounded-md h-[200px] overflow-hidden cursor-pointer">
            {banner ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(banner)}
                  className="h-full object-cover"
                />
                {/* <div className="absolute bg-white w-full h-full top-0 left-0 opacity-50">
                      <div>
                        <img src="" alt="" />
                      </div>
                    </div> */}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-700">
                <i class="fi fi-rr-add-image text-[26px]"></i>
                <p>Upload Image</p>
              </div>
            )}
          </div>
        </label>
        <input
          onChange={handleImageLoad}
          type="file"
          id="image"
          hidden
          required
        />
      </div>
    </div>
  );
};
export default AddBanner;
