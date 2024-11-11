import GlobalNav from "@components/GlobalNav";

const layout = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <GlobalNav />
      {children}
    </div>
  );
};
export default layout;
