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
  const [author_id, setAuthor_id] = useState("");
  const [query, setQuery] = useState("");

  const filterSearch = (e) => {
    e.target.value == "all"
      ? setAuthor_id("")
      : setAuthor_id(session?.user?.user_id);

    if (e.target.value == "all") {
      fetchBlogs({ query, author_id: "" });
    } else {
      fetchBlogs({ query, author_id: session?.user?.user_id });
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.keyCode == 13 && query.length) {
      fetchBlogs({ query: e.target.value, author_id });
    }
  };

  const clearSearch = (e) => {
    setQuery(e.target.value);
    e.target.value == "" && fetchBlogs({ query: e.target.value, author_id });
  };

  const fetchBlogs = async ({ query, author_id, page = 1, max = 9 }) => {
    setBlogs(null);
    let formatedData;

    await axios
      .post("/api/blogs", {
        query,
        author_id,
        page,
        max,
        draft: false,
      })
      .then(async ({ data }) => {
        formatedData = await filterPaginationData({
          state: blogs,
          data: data.data,
          page,
          max,
          countRoute: "/api/blogs/count",
          data_to_send: { query, author_id, draft: false },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setBlogs(formatedData);
    console.log(formatedData);
  };

  useEffect(() => {
    fetchBlogs({ query, author_id });
  }, []);
  return (
    <div className="flex flex-col py-10 px-[3vw] tab-m:px-[5vw] w-full h-full gap-10 overflow-y-scroll">
      <div className="flex justify-between w-full gap-10 items-center">
        <div className="flex w-[50%] tab-s:w-full">
          <SearchBox
            filter={filterSearch}
            options={[
              { name: "All", value: "all" },
              { name: "By me", value: "by me" },
            ]}
            onKeyDown={handleSearch}
            onChange={clearSearch}
            search={() => query.length && fetchBlogs({ query, author_id })}
            placeholder="Find blogs"
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col gap-10 items-center w-full ">
          <div className="grid grid-cols-auto-fill-280 gap-5 gap-y-10 duration-100 w-full">
            {blogs == null ? (
              <BlogCardSkelenton cards={max} />
            ) : blogs.results.length ? (
              blogs.results.map((blog, index) => {
                return (
                  <div key={index}>
                    <BlogCard
                      blog_id={blog.blog_id}
                      banner={blog.banner}
                      title={blog.title}
                      desc={blog.desc}
                      tags={blog.tags}
                      date={blog.publishedAt}
                      author={blog.author}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col-span-3">
                <NoDataMessage message="No Blogs" />
              </div>
            )}
          </div>
          <Pagination
            state={blogs}
            fetchData={fetchBlogs}
            dataToSend={{ query, author_id }}
            max={max}
          />
        </div>
      </div>
    </div>
  );
};
export default page;
