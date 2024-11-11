"use client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NoImagePreview from "@components/NoImagePreview";

const BlogCard = ({ blog_id, banner, title, desc, tags, date, author }) => {
  const { data: session } = useSession();
  const route = useRouter();

  let imgRC = 0;

  const formattedDate = new Date(date);

  date = formattedDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const reloadImg = (e) => {
    imgRC++;
    if (imgRC < 10) {
      e.target.src = banner;
    }
  };

  const { first_name, last_name, profile_img } = author?.personal_info;

  const navigate = () => {
    if (session?.user?.user_type == "admin") {
      return route.push(`/admin/editor/${blog_id}`);
    }
    if (author._id == session?.user?.user_id) {
      return route.push(`/admin/editor/${blog_id}`);
    }

    toast.error("Cannot Edit Blog", { id: "cannot-edit-blog-error" });
  };
  return (
    <div onClick={navigate} className="w-full h-full cursor-pointer">
      <div className="relative bg-gray-50 aspect-[13/8] rounded-md overflow-hidden">
        {tags.length ? (
          <p className="absolute left-2 top-2 bg-gray-700 bg-opacity-20 backdrop-blur-sm z-[1] rounded-full px-2 py-1 text-xs text-white capitalize ">
            {tags[0]}
          </p>
        ) : (
          <></>
        )}
        {!banner ? (
          <NoImagePreview />
        ) : (
          <img
            onError={reloadImg}
            loading="lazy"
            decoding="async"
            fetchpriority="high"
            src={banner}
            alt=""
            className="w-full aspect-[13/8] object-cover rounded-md bg-gray-50 hover:scale-[1.15] overflow-hidden duration-200"
          />
        )}
      </div>

      <h2 className="text-base mt-3 font-medium line-clamp-1 leading-tight capitalize">
        {title}
      </h2>
      <p className="text-sm leading-tight line-clamp-3 text-gray-500 mt-1">
        {desc}
      </p>
      <div className="flex gap-2 items-center mt-3">
        <img
          src={profile_img}
          alt=""
          className="w-6 h-6 object-cover rounded-full"
        />
        <p className="text-sm text-gray-500 capitalize  line-clamp-1">{`${first_name} ${last_name} • ${date}`}</p>
      </div>
    </div>
  );
};
export default BlogCard;
