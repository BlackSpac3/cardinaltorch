"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import FullImgBlogCard from "./FullImgBlogCard";
import LatestBlogSkeleton from "@components/skeletons/LatestBlogSkeleton";

const LatestBlog = () => {
  const [blogs, setBlogs] = useState(null);
  const fetchBlogs = async () => {
    setBlogs(null);
    await axios
      .post(`/api/blogs`, {
        page: 1,
        max: 1,
        draft: false,
      })
      .then(async ({ data }) => {
        setBlogs(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="relative flex h-[40vw] tab-s:h-[70vh] phone-s:h-[100vh] mb-[30px]  overflow-hidden">
      <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#00000050] to-transparent z-10"></div>
      {!blogs ? (
        <LatestBlogSkeleton />
      ) : (
        blogs.length && (
          <FullImgBlogCard
            blog_id={blogs[0].blog_id}
            banner={blogs[0].banner}
            title={blogs[0].title}
            desc={blogs[0].desc}
            tags={blogs[0].tags}
          />
        )
      )}
    </div>
  );
};
export default LatestBlog;
