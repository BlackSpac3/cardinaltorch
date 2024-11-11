const MoreButton = ({ children }) => {
  return (
    <div className="hover:scale-[1.05] active:scale-[0.95] duration-75 inline-block">
      <div className="flex items-center gap-[10px] cursor-pointer text-black">
        <p className="font-medium leading-none">{children}</p>
        <i className="fi fi-rs-arrow-right text-xl"></i>
      </div>
      <div className="w-[100%] h-[2px] bg-primary mt-[2px] rounded-full"></div>
    </div>
  );
};
export default MoreButton;
