import Image from "next/image";
import Link from "next/link";

const MiniBlogCard = ({ index, blog_id, banner, title, desc, date }) => {
  return (
    <Link
      href={`/blogs/${blog_id}`}
      target="blank"
      key={index}
      className="flex gap-2 items-center cursor-pointer w-full"
    >
      <div className="py-1 w-full">
        <h2 className="text-sm line-clamp-1 font-medium capitalize">{title}</h2>
        <p className=" line-clamp-3 text-xs text-gray-500 mt-1">{desc}</p>
        <p className="text-gray-500 text-xs mt-1">{!date ? "Draft" : date}</p>
      </div>
      <Image
        className="w-[35%] tab-m:aspect-video phone:aspect-square aspect-square rounded-md object-cover object-center overflow-hidden bg-gray-50"
        src={banner}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
      />
    </Link>
  );
};

export default MiniBlogCard;
