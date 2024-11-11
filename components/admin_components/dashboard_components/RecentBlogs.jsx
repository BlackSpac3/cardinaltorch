import { authOptions } from "@app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import MiniBlogCard from "./MiniBlogCard";
import NoDataMessage from "../NoDataMessage";

const fetchRecentBlogs = async (user_id) => {
  try {
    const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/blogs`, {
      page: 1,
      max: 5,
      author_id: user_id,
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const RecentBlogs = async () => {
  const session = await getServerSession(authOptions);
  const blogs = await fetchRecentBlogs(session?.user?.user_id);

  return !blogs.length ? (
    <NoDataMessage message={"No Blogs Yet"} />
  ) : (
    blogs.map((blog, index) => {
      const date = new Date(blog.publishedAt);
      return (
        <MiniBlogCard
          index={index}
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
