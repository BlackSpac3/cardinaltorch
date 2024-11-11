import Skelenton from "react-loading-skeleton";

const MiniBlogCardSkelenton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="flex gap-2 items-center w-full">
        <div className="py-1 w-full">
          <h2 className="text-sm">
            <Skelenton />
          </h2>
          <p className="mt-1 text-xs">
            <Skelenton count={3} />
          </p>
          <p className="text-xs mt-1">
            <Skelenton />
          </p>
        </div>
        <div className="w-[35%] tab-m:aspect-video phone:aspect-square aspect-square rounded-md">
          <Skelenton width={"100%"} height={"100%"} />
        </div>
      </div>
    ));
};
export default MiniBlogCardSkelenton;
