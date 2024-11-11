import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { fadeIn } from "../../utils/motion";
import { assets, icons } from "../../assets/assets";
import { styles } from "../../utils/styles";
import MoreButton from "../MoreButton";
import BlogCard from "../BlogCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { url } from "../../assets/assets";
import { capitalize } from "../../utils";
import BlogCardSkelenton from "../skeletons/BlogCardSkeleton";
import NoDataMessage from "../NoDataMessage";

const OurBlogSection = () => {
  const [blogs, setBlogs] = useState(null);
  const fetchBlogs = async ({ page = 1, max }) => {
    const response = await axios.post(`${url}/api/blog/list`, {
      page,
      max,
      draft: false,
    });
    if (response.data.success) {
      setBlogs(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchBlogs({ page: 1, max: 3 });
  }, []);

  return (
    <div className="m-body">
      <div className="flex flex-col">
        <div
          id="service-section-header"
          className="flex justify-between w-[100%] items-center tab-s:block"
        >
          <h2 className={`${styles.homePageSectionTitle} `}>
            Articles & Blogs
          </h2>
          <Link to="/blogs" className="mr-[3vw] tab-s:hidden">
            <MoreButton>View all</MoreButton>
          </Link>
        </div>

        <div
          id="services-section-content"
          className="grid grid-cols-3  tab-s:grid-cols-1 gap-[20px] mt-14 tab-s:mt-6 w-full"
        >
          {!blogs ? (
            <BlogCardSkelenton cards={3} />
          ) : blogs.length ? (
            blogs.map((blog, index) => {
              return (
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
                </div>
              );
            })
          ) : (
            <div className="col-span-3">
              <NoDataMessage reverse={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default OurBlogSection;
