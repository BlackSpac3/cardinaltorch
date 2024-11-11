import Skeleton from "react-loading-skeleton";

const FeaturedSectionSkeleton = () => {
  return (
    <div className="grid grid-cols-2 phone:grid-cols-1 grid-rows-2 gap-5 mt-14 phone:mt-6">
      <div className="flex w-full col-span-1 row-span-2">
        <div className="w-full phone:aspect-video h-full">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="aspect-square w-full h-full col-span-4">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
          <div className="col-span-8 w-full">
            <p className="text-sm">
              <Skeleton />
            </p>
            <h2 className="text-lg">
              <Skeleton count={2} />
            </h2>
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="aspect-square w-full h-full col-span-4">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
          <div className="col-span-8 w-full">
            <p className="text-sm">
              <Skeleton />
            </p>
            <h2 className="text-lg">
              <Skeleton count={2} />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedSectionSkeleton;
