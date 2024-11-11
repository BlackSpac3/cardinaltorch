import Skeleton from "react-loading-skeleton";

const ImgSkelentonCard = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div key={index} className="w-full aspect-video">
        <Skeleton height={"100%"} />
      </div>
    ));
};
export default ImgSkelentonCard;
