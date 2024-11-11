import Skeleton from "react-loading-skeleton";

const SingleBlogPageSkeleton = () => {
  return (
    <div className="mt-[-90px]">
      <div className="h-full p-8 pb-32 flex flex-col gap-7 items-center pt-[120px]">
        <h1 className="w-[60%] text-center">
          <Skeleton />
        </h1>
        <div className="flex gap-5 items-center text-gray-500">
          <div className="flex gap-3 items-center">
            <Skeleton circle width={30} height={30} />
            <p className="w-14">
              <Skeleton width={"100"} />
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <i className="fi fi-sr-calendar-day"></i>
            <p className="">
              <Skeleton />
            </p>
          </div>

          <div className="flex gap-3 items-center ">
            <i className="fi fi-sr-folder-open"></i>
            <p className="capitalize">
              <Skeleton />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleBlogPageSkeleton;
