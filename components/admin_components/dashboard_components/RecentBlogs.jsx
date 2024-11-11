import axios from "axios";
import MiniBlogCard from "./MiniBlogCard";
import NoDataMessage from "../NoDataMessage";
import { useSession } from "next-auth/react";

const fetchRecentBlogs = async (user_id) => {
  try {
    const response = await axios.post("/api/blogs", {
      page: 1,
      max: 5,
      author_id: user_id,
    });

    return response.data.data;
  } catch (error) {
    return [];
  }
};

const RecentBlogs = async () => {
  const { data: session } = useSession();
  const blogs = await fetchRecentBlogs(session?.user?.user_id);

  return !blogs.length ? (
    <NoDataMessage message={"No Blogs Yet"} />
  ) : (
    blogs.map((blog, index) => {
      const date = new Date(blog.publishedAt);
      return (
        <MiniBlogCard
          index={index}
          blog_id={blog.blog_id}
          banner={blog.banner}
          title={blog.title}
          desc={blog.desc}
          date={date.toDateString().slice(3)}
        />
      );
    })
  );
};
export default RecentBlogs;
