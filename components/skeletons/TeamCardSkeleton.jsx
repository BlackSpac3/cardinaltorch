import Skeleton from "react-loading-skeleton";

const TeamCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div className=" border rounded-md w-full h-full bg-white overflow-hidden">
        <div className="aspect-[5/4] w-[100%] rounded-t-md h-auto bg-gray-100 ">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
        <div className="flex flex-col gap-2 p-3 ">
          <div className="flex flex-col">
            <h1 className="font-medium text-gray-500 w-[70%] capitalize">
              <Skeleton width={"100%"} height={"100%"} />
            </h1>
            <p className="text-primary text-sm line-clamp-1 w-[60%] capitalize">
              <Skeleton width={"100%"} height={"100%"} />
            </p>
          </div>
          <p className="text-gray-500 text-sm text-jusify w-full font-light line-clamp-6">
            <Skeleton width={"100%"} height={"100%"} count={6} />
          </p>
        </div>
      </div>
    ));
};
export default TeamCardSkeleton;
