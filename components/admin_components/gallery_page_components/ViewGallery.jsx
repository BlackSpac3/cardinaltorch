"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import filterPaginationData from "@lib/helpers/filterPaginationData";
import toast from "react-hot-toast";
import ImgSkelentonCard from "../Skelentons/ImgSkelentonCard";
import NoDataMessage from "../NoDataMessage";
import Pagination from "../Pagination";
import GalleryModal from "./GalleryModal";
import { useSession } from "next-auth/react";

const ViewGallery = ({ setState }) => {
  const { data: session } = useSession();

  const max = 9;
  const [images, setImages] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentImg_id, setCurrentImg_id] = useState(null);

  const [author_id, setAuthor_id] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.keyCode == 13 && query.length) {
      fetchImages({ query: e.target.value, author_id });
    }
  };
  const clearSearch = (e) => {
    setQuery(e.target.value);
    e.target.value == "" && fetchImages({ query: e.target.value, author_id });
  };

  const filterSearch = (e) => {
    e.target.value == "all"
      ? setAuthor_id("")
      : setAuthor_id(session?.user?.user_id);

    if (e.target.value == "all") {
      fetchImages({ query, author_id: "" });
    } else {
      fetchImages({ query, author_id: session?.user?.user_id });
    }
  };

  const galleryModalIdName = "gallery-modal";

  const openModal = (index) => {
    setCurrentIndex(index);
    setCurrentImg_id(images.results[index]._id);
    document.getElementById(galleryModalIdName).showModal();
  };

  const fetchImages = async ({ query, author_id, page = 1, max = 9 }) => {
    setImages(null);
    setCurrentImg_id(null);
    setCurrentIndex(null);
    let formatedData;
    await axios
      .post("/api/images/list", {
        query,
        page,
        max,
        author_id,
      })
      .then(async (res) => {
        formatedData = await filterPaginationData({
          state: images,
          data: res.data.data,
          page,
          max,
          countRoute: "/api/images/count",
          data_to_send: { query, author_id },
        });
      })
      .catch((error) => {
        toast.error("Error connecting to server");
      });

    setImages(formatedData);
  };

  useEffect(() => {
    fetchImages({ query, author_id });
  }, []);

  return (
    <section className="flex relative w-full h-full">
      <div className="hidden tab-s:block fixed bottom-0 p-2 w-full z-10 bg-white">
        <button
          onClick={() => setState("upload")}
          className="bttn-wide w-full "
        >
          Upload Image
        </button>
      </div>
      <div className="flex flex-col items-center py-10 px-[3vw] tab-m:px-[5vw] gap-10 overflow-y-scroll w-full">
        <div className="flex justify-between w-full gap-2 ">
          <div className="flex w-[50%] tab-s:w-full">
            <SearchBox
              filter={filterSearch}
              options={[
                { name: "All", value: "all" },
                { name: "By me", value: "by me" },
              ]}
              onKeyDown={handleSearch}
              onChange={clearSearch}
              search={() => query.length && fetchImages({ query, author_id })}
              placeholder="Find Pictures"
            />
          </div>

          <button
            onClick={() => setState("upload")}
            className="bttn-primary text-xs tab-s:hidden"
          >
            Upload Image
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 phone:grid-cols-1 w-full">
          {!images ? (
            <ImgSkelentonCard cards={9} />
          ) : images.results.length ? (
            images.results.map((image, index) => {
              const image_url = image.image;
              const author_img = image.author.personal_info.profile_img;
              const author = `${image.author.personal_info.first_name} ${image.author.personal_info.last_name}`;

              return (
                <div
                  key={index}
                  onClick={() => openModal(index)}
                  className="relative rounded-md h-[200px] cursor-pointer"
                >
                  <div
                    className={`
              absolute flex flex-col justify-end w-full aspect-video left-0 top-0 rounded-md bg-[#00000060] opacity-0 hover:opacity-100 z-1 p-5 text-white  `}
                  >
                    <div>
                      <p className="line-clamp-3 leading-tight">{image.desc}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={author_img}
                          alt=""
                          className="w-[20px] h-[20px] rounded-full bg-gray-50"
                        />

                        <p className="text-sm text-gray-100">
                          Uploaded by{" "}
                          <span className="capitalize">{author}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <picture>
                    <source type="image/webp" />
                    <img
                      key={index}
                      className="w-full aspect-video rounded-md object-cover"
                      src={image_url}
                      alt={image.desc}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </picture>
                </div>
              );
            })
          ) : (
            <div className="col-span-3">
              <NoDataMessage message="No Images" />
            </div>
          )}
        </div>
        <Pagination
          state={images}
          fetchData={fetchImages}
          dataToSend={{ query, author_id }}
          max={max}
        />
      </div>

      <GalleryModal
        id={galleryModalIdName}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setCurrentImg_id={setCurrentImg_id}
        currentImg_id={currentImg_id}
        fetchData={fetchImages}
        dataToSend={{ query, author_id }}
      />
    </section>
  );
};
export default ViewGallery;
