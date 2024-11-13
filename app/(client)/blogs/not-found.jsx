import { assets } from "@assets/assets";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <div className="w-[75%] tab:w-[90%] flex gap-20 tab-s:flex-col tab-s:gap-10 items-center justify-center">
        <Image
          src={assets.blog_not_found_illustration}
          className="w-[420px] h-auto select-none"
        />
        <div className="flex flex-col items-center text-center">
          <p className="section-big-text">No Blogs Yet 😔</p>
          <p className="text-gray-500 mt-5">
            Thank you for your patience! Our blog is coming soon. Our team is
            currently working hard to curate the best and most relevant content
            for you, ensuring that what we share meets your expectations. Stay
            tuned for exciting updates!
          </p>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
