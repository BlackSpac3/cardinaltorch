import Link from "next/link";
import Image from "next/image";

const MiniBlogCard = ({ blog_id, banner, title, desc, tags }) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <Image
        loading="lazy"
        src={banner}
        alt={title}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full col-span-4 object-cover aspect-square rounded-xl"
      />

      <div className="col-span-8 w-full">
        <span className="uppercase text-primary font-semibold text-sm">
          {tags[0]}
        </span>
        <Link href={`/blogs/${blog_id}`} className="inline-block my-1">
          <h2 className="text-lg capitalize font-semibold leading-tight line-clamp-3">
            <span className="bg-gradient-to-r from-primary to-primary bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};
export default MiniBlogCard;
