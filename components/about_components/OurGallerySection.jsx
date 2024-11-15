"use client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import GalleryModal from "@components/GalleryModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const Gallery_pics = () => {
  const [images, setImages] = useState(null);
  const galleryModalIdName = "gallery-modal";
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModal = (index) => {
    setCurrentIndex(index);
    document.getElementById(galleryModalIdName).showModal();
  };

  const fetchImages = async () => {
    setImages(null);
    setCurrentIndex(null);
    let page = 1;
    let max = 8;

    try {
      const res = await axios.post("/api/images/list", {
        page,
        max,
      });

      setImages(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Error connecting to server");
      setImages([]);
    }
  };

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      let handler = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handler);

      return () => {
        window.removeEventListener("resize", handler);
      };
    }
  });

  useEffect(() => {
    fetchImages();
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <section className="px-16 tab-s:px-[5vw] py-[5vw]">
      <div className="relative">
        <Swiper
          slidesPerView={screenWidth < 828 ? "1.5" : "2.5"}
          spaceBetween={15}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {!images ? (
            <div className="w-full flex gap-2 overflow-hidden">
              <div className="w-[40%] aspect-[10/8]">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div className="w-[40%] aspect-[10/8]">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div className="w-[20%] aspect-[10/8]">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
            </div>
          ) : images.length ? (
            images.map((image, index) => (
              <div>
                <SwiperSlide key={index}>
                  <Image
                    className="hover:cursor-grab"
                    key={index}
                    src={image.image}
                    onClick={() => openModal(index)}
                    width={0}
                    height={0}
                    sizes="100vw"
                    loading="lazy"
                  />
                </SwiperSlide>
              </div>
            ))
          ) : null}

          <GalleryModal
            id={galleryModalIdName}
            images={images}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </Swiper>
        <div className="">
          <div className="swiper-button-prev text-white"></div>
          <div className="swiper-button-next text-white"></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery_pics;
