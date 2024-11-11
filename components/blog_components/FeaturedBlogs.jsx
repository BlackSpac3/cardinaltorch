import axios from "axios";
import FullImgBlogCard from "./FullImgBlogCard";
import MiniBlogCard from "./MiniBlogCard";
import Image from "next/image";
import { assets } from "@assets/assets";

const fetchBlogs = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/blogs/trending`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const FeaturedBlogs = async () => {
  const blogs = await fetchBlogs();

  if (blogs.length < 3) {
    return null;
  }

  return (
    <div className="">
      <header>
        <p className="section-big-text">Featured Posts</p>
      </header>

      <div className="relative grid grid-cols-2 phone:grid-cols-1 grid-rows-2 gap-5 mt-14 phone:mt-6">
        <Image
          src={assets.bean_bg_illustration}
          className=" absolute w-64 h-44 -right-44 -bottom-36  opacity-40 phone:w-36 phone:h-28 select-none"
          alt=""
          priority={true}
        />
        <div className="flex w-full col-span-1 row-span-2 rounded-xl overflow-hidden">
          <FullImgBlogCard
            blog_id={blogs[0].blog_id}
            banner={blogs[0].banner}
            title={blogs[0].title}
            tags={blogs[0].tags}
            h2="2xl"
            p="sm"
            w="90%"
          />
        </div>
        <div className="col-span-1 row-span-1">
          <MiniBlogCard
            blog_id={blogs[1].blog_id}
            banner={blogs[1].banner}
            title={blogs[1].title}
            tags={blogs[1].tags}
          />
        </div>
        <div className="col-span-1 row-span-1">
          <MiniBlogCard
            blog_id={blogs[2].blog_id || null}
            banner={blogs[2].banner}
            title={blogs[2].title}
            tags={blogs[2].tags}
          />
        </div>
      </div>
    </div>
  );
};
export default FeaturedBlogs;
