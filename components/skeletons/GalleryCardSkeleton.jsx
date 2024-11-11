import Skeleton from "react-loading-skeleton";

const GalleryCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div className="w-full h-full aspect-[13/8]">
        <Skeleton height={"100%"} width={"100%"} />
      </div>
    ));
};
export default GalleryCardSkeleton;
