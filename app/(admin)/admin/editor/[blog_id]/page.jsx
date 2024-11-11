import BlogPage from "@components/admin_components/create_blog_page_components/BlogPage";

const page = ({ params }) => {
  return <BlogPage blog_id={params.blog_id} />;
};
export default page;
