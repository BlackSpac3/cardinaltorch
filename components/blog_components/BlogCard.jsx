import Link from "next/link";
import Image from "next/image";

const BlogCard = ({
  blog_id,
  banner,
  title,
  desc,
  tags = [],
  date,
  author,
}) => {
  const formattedDate = new Date(date);

  date = formattedDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { first_name, last_name, profile_img } = author.personal_info;
  return (
    <Link href={`/blogs/${blog_id}`} className="w-full h-full cursor-pointer">
      <div className="relative bg-gray-500 aspect-[13/8] rounded-md overflow-hidden ">
        <p className="absolute left-2 top-2 bg-gray-700 bg-opacity-20 backdrop-blur-sm px-2 py-1 z-[1]  rounded-full text-xs text-white capitalize">
          {tags[0]}
        </p>

        <Image
          loading="lazy"
          src={banner}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className=" w-full h-full aspect-[13/8] object-cover hover:scale-[1.15] duration-200 bg-gray-50 overflow-hidden rounded-md"
        />
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
    </Link>
  );
};
export default BlogCard;
