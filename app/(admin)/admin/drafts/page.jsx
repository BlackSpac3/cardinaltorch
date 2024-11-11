"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import filterPaginationData from "@lib/helpers/filterPaginationData";
import NoDataMessage from "@components/admin_components/NoDataMessage";
import Pagination from "@components/admin_components/Pagination";
import BlogCardSkelenton from "@components/admin_components/Skelentons/BlogCardSkelenton";
import SearchBox from "@components/admin_components/SearchBox";
import BlogCard from "@components/admin_components/blog_page_components/BlogCard";

const page = () => {
  const max = 9;
  const { data: session } = useSession();

  const [blogs, setBlogs] = useState(null);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.keyCode == 13 && query.length) {
      fetchBlogs({ query: e.target.value });
    }
  };

  const clearSearch = (e) => {
    setQuery(e.target.value);
    e.target.value == "" && fetchBlogs({ query: e.target.value });
  };

  const fetchBlogs = async ({ query, page = 1, max = 9 }) => {
    setBlogs(null);
    let formatedData;
    const author_id = session?.user?.user_id;

    await axios
      .post("/api/blogs", {
        query,
        page,
        max,
        author_id,
        draft: true,
      })
      .then(async ({ data }) => {
        formatedData = await filterPaginationData({
          state: blogs,
          data: data.data,
          page,
          max,
          countRoute: "/api/blogs/count",
          data_to_send: { query, author_id, draft: true },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setBlogs(formatedData);
  };

  useEffect(() => {
    fetchBlogs({ query });
  }, []);
  return (
    <div className="flex flex-col py-10 px-[3vw] tab-m:px-[5vw] w-full h-full gap-10 overflow-y-scroll">
      <div className="flex justify-between w-full gap-10 items-center">
        <div className="flex w-[50%] tab-s:w-full">
          <SearchBox
            onKeyDown={handleSearch}
            onChange={clearSearch}
            search={() => query.length && fetchBlogs({ query })}
            placeholder="Find drafts"
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col gap-10 items-center w-full ">
          <div className="grid grid-cols-auto-fill-280 gap-y-10 gap-5 duration-100 w-full">
            {!blogs ? (
              <BlogCardSkelenton cards={9} />
            ) : blogs.results.length ? (
              blogs.results.map((blog, index) => (
                <BlogCard
                  key={index}
                  blog_id={blog.blog_id}
                  banner={blog.banner}
                  title={blog.title}
                  desc={blog.desc}
                  tags={blog.tags}
                  status="Published"
                  date={blog.publishedAt}
                  author={blog.author}
                />
              ))
            ) : (
              <div className="col-span-3">
                <NoDataMessage message="No Drafts" />
              </div>
            )}
          </div>
          <Pagination
            state={blogs}
            fetchData={fetchBlogs}
            dataToSend={{
              query,
              author_id: session?.user?.user_id,
              draft: true,
            }}
            max={max}
          />
        </div>
      </div>
    </div>
  );
};
export default page;
