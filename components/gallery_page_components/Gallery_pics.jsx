"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import filterPaginationData from "@lib/helpers/filterPaginationData";
import GalleryModal from "@components/GalleryModal";
import toast from "react-hot-toast";
import Pagination from "@components/admin_components/Pagination";
import GalleryCardSkeleton from "@components/skeletons/GalleryCardSkeleton";

const Gallery_pics = () => {
  const [images, setImages] = useState(null);
  const galleryModalIdName = "gallery-modal";
  const [currentIndex, setCurrentIndex] = useState(null);
  const max = 12;

  const openModal = (index) => {
    setCurrentIndex(index);
    document.getElementById(galleryModalIdName).showModal();
  };

  const fetchImages = async () => {
    setImages(null);
    setCurrentIndex(null);
    let formatedData;
    let page = 1;
    await axios
      .post("/api/images/list", {
        page,
        max,
      })
      .then(async (res) => {
        formatedData = await filterPaginationData({
          state: images,
          data: res.data.data,
          page,
          max,
          countRoute: "/api/images/count",
        });
      })
      .catch((error) => {
        toast.error("Error connecting to server");
      });

    setImages(formatedData);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="">
      <section className="grid grid-cols-auto-fill-280 gap-[10px]">
        {!images ? (
          <GalleryCardSkeleton cards={max} />
        ) : images.results.length ? (
          images.results.map((image, index) => (
            <div key={index}>
              <img
                className="h-full aspect-[13/8] w-full cursor-pointer object-cover rounded-md"
                key={index}
                src={image.image}
                onClick={() => openModal(index)}
              />
            </div>
          ))
        ) : (
          <p>No images</p>
        )}
      </section>
      <Pagination
        state={images}
        fetchData={fetchImages}
        dataToSend={{}}
        max={max}
      />

      <GalleryModal
        id={galleryModalIdName}
        images={images?.results}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};

export default Gallery_pics;
