import Skeleton from "react-loading-skeleton";

const UserSkeleton = ({ cards, gridCols }) => {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div key={index} className="w-full">
        <div
          className={`${gridCols} py-2 text-sm phone:text-base items-center`}
        >
          <div className="flex items-center gap-2">
            <Skeleton height={"24px"} width={"24px"} circle />

            <p className="w-full">
              <Skeleton />
            </p>
          </div>
          <p className="w-full phone:hidden">
            <Skeleton />
          </p>
          <p className="w-full phone:hidden">
            <Skeleton />
          </p>
          <p className="w-full phone:hidden">
            <Skeleton />
          </p>
          <p className="w-full">
            <Skeleton />
          </p>
        </div>
        <hr />
      </div>
    ));
};
export default UserSkeleton;
