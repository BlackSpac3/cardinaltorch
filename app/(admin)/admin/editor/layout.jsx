import CreateBlogContextProvider from "@context/CreateBlogContext";

const layout = ({ children }) => {
  return <CreateBlogContextProvider>{children}</CreateBlogContextProvider>;
};
export default layout;
