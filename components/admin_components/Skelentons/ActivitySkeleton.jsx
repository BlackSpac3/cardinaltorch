import Skeleton from "react-loading-skeleton";

const ActivitySkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div key={index} className="w-full">
        <div className="grid grid-cols-[0.3fr_0.4fr_0.2fr_0.3fr] tab-s:grid-cols-[0.5fr_0.3fr_0.3fr] gap-2 py-5  text-xs items-center">
          <div className="flex items-center gap-2">
            <Skeleton height={"32px"} width={"32px"} circle />

            <p className="w-full">
              <Skeleton />
            </p>
          </div>
          <p className="w-full tab-s:hidden">
            <Skeleton />
          </p>
          <p className="w-full">
            <Skeleton />
          </p>
          <div className="flex items-center gap-2">
            <div className="tab-s:hidden">
              <Skeleton height={"28px"} width={"28px"} circle />
            </div>

            <p className="w-[50%]">
              <Skeleton />
            </p>
          </div>
        </div>
        <hr />
      </div>
    ));
};
export default ActivitySkeleton;
