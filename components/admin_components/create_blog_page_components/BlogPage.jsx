"use client";

import BlogEditor from "@components/admin_components/create_blog_page_components/BlogEditor";
import PublishForm from "@components/admin_components/create_blog_page_components/PublishForm";
import { CreateBlogContext } from "@context/CreateBlogContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../Spinner";
import axios from "axios";

const BlogPage = ({ blog_id }) => {
  const [loading, setLoading] = useState(true);
  const { editorState, setBlog } = useContext(CreateBlogContext);

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }
    axios
      .post("/api/blogs/get-blog", { blog_id, mode: "edit" })
      .then((response) => {
        setBlog(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // setBlog(null);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10">
        <Spinner />
      </div>
    </div>
  ) : editorState == "edit" ? (
    <BlogEditor blog_id={blog_id} />
  ) : (
    <PublishForm blog_id={blog_id} />
  );
};
export default BlogPage;
