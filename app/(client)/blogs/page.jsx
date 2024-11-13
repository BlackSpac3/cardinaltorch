import BlogsGrid from "@components/blog_components/BlogsGrid";
import FeaturedBlogs from "@components/blog_components/FeaturedBlogs";
import FullImgBlogCard from "@components/blog_components/FullImgBlogCard";
import axios from "axios";
import { notFound } from "next/navigation";

export const revalidate = 30;

export const metadata = {
  title: "Blogs",
};

const max = 9;
const fetchBlogs = async () => {
  try {
    const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/blogs`, {
      page: 1,
      max: max,
      draft: false,
    });

    return response.data.data;
  } catch (error) {
    console.log("error");
  }
};

const page = async () => {
  const blogs = await fetchBlogs();

  return !blogs?.length ? (
    notFound()
  ) : (
    <section className="flex flex-col gap-[5vw] px-[7vw] py-[70px]">
      <div className=" flex h-[40vw] tab:h-[50vw] phone:h-[40vh] rounded-xl  overflow-hidden ">
        <FullImgBlogCard
          blog_id={blogs[0].blog_id}
          banner={blogs[0].banner}
          title={blogs[0].title}
          desc={blogs[0].desc}
          tags={blogs[0].tags}
        />
      </div>
      {blogs.length >= 3 && <FeaturedBlogs />}

      <BlogsGrid />
    </section>
  );
};
export default page;
