"use client";
import axios from "axios";
import BlogCard from "./BlogCard";
import { useState, useRef, useEffect } from "react";
import filterPaginationData from "@lib/helpers/filterPaginationData";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import Pagination from "@components/admin_components/Pagination";
import { assets } from "@assets/assets";
import Image from "next/image";

const BlogsGrid = () => {
  const max = 9;

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);

    if (e.keyCode == 13 && query.length) {
      fetchBlogs({ query, page: 1 });
    }
  };

  const clearSearch = (e) => {
    setQuery(e.target.value);
    e.target.value == "" && fetchBlogs({ page: 1 });
  };

  const [blogs, setBlogs] = useState(null);

  const fetchBlogs = async ({ query, tags, page = 1, max }) => {
    setBlogs(null);
    let formatedData;
    await axios
      .post("/api/blogs", {
        query,
        tags,
        page,
        max,
        draft: false,
      })
      .then(async ({ data }) => {
        formatedData = await filterPaginationData({
          state: blogs,
          data: data.data,
          page: page,
          countRoute: "/api/blogs/count",
          data_to_send: { query, draft: false },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setBlogs(formatedData);
  };
  useEffect(() => {
    fetchBlogs({ query, page: 1, max: max });
  }, []);
  return (
    <div className="flex flex-col">
      <h2>
        <p className="section-big-text">All Posts</p>
      </h2>
      <div className="flex flex-col gap-10 items-center mt-14 phone:mt-0">
        <div
          id="services-section-content"
          className="grid grid-cols-auto-fill-280 gap-5 gap-y-14  phone:mt-6 w-full"
        >
          {!blogs ? (
            <BlogCardSkeleton cards={max} />
          ) : (
            blogs.results.map((blog, index) => (
              <div key={index}>
                <BlogCard
                  blog_id={blog.blog_id}
                  banner={blog.banner}
                  title={blog.title}
                  desc={blog.desc}
                  date={blog.publishedAt}
                  tags={blog.tags}
                  author={blog.author}
                />

                <Image
                  src={assets.sesame_bg_illustration}
                  className=" absolute w-64 h-44 -left-36 bottom-0 -z-50 opacity-10 phone:w-36 phone:h-28 select-none"
                  alt=""
                  priority={true}
                />
              </div>
            ))
          )}
        </div>
        <Pagination
          state={blogs}
          fetchData={fetchBlogs}
          dataToSend={{ query }}
          max={max}
        />
      </div>
    </div>
  );
};
export default BlogsGrid;
