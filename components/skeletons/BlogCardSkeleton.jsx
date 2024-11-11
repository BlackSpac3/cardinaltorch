import Skeleton from "react-loading-skeleton";

const BlogCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div key={index} className="w-full">
        <div className=" aspect-video">
          <Skeleton height={"100%"} />
        </div>
        <h2>
          <Skeleton />
        </h2>
        <p className="text-xs">
          <Skeleton count={3} />
        </p>
        <div className="flex gap-2 items-center mt-3 w-full">
          <div>
            <Skeleton circle width={24} height={24} />
          </div>
          <p className="text-xs w-full">
            <Skeleton />
          </p>
        </div>
      </div>
    ));
};
export default BlogCardSkeleton;
