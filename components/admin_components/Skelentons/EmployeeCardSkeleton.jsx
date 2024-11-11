import Skeleton from "react-loading-skeleton";

const EmployeeCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div key={index} className="h-full aspect-square">
        <Skeleton height={"100%"} width={"100%"} />
      </div>
    ));
};
export default EmployeeCardSkeleton;
