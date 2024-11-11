import axios from "axios";
import BlogCard from "./BlogCard";

const fetchData = async (tags, blog_id) => {
  try {
    const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/blogs`, {
      tags: tags,
      page: 1,
      max: 3,
      eliminate_blog: blog_id,
    });

    return response.data.data;
  } catch (error) {
    console.log("error");
  }
};

const SimilarBlogs = async ({ tags, blog_id }) => {
  const blogs = await fetchData(tags, blog_id);

  if (!blogs?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 my-10 w-[80%] mx-auto">
      <h2 className="section-big-text">Similar Posts</h2>
      <div className="grid grid-cols-3 gap-5 phone:grid-cols-1 gap-y-10">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            blog_id={blog.blog_id}
            title={blog.title}
            banner={blog.banner}
            desc={blog.desc}
            tags={blog.tags}
            date={blog.publishedAt}
            author={blog.author}
          />
        ))}
      </div>
    </div>
  );
};
export default SimilarBlogs;
