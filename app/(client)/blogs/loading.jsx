import Skeleton from "react-loading-skeleton";
import FeaturedSectionSkeleton from "@components/skeletons/FeaturedSectionSkeleton";
import BlogCardSkeleton from "@components/skeletons/BlogCardSkeleton";

const loading = () => {
  return (
    <section className="flex flex-col gap-[5vw] px-[7vw] py-[70px]">
      <div className=" flex h-[40vw]  w-full rounded-xl overflow-hidden ">
        <div className="w-full h-full">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
      </div>
      <div>
        <h2 className="section-big-text w-[50%]">
          <Skeleton />
        </h2>
        <FeaturedSectionSkeleton />
      </div>
      <div className="flex flex-col">
        <h2 className="section-big-text w-[50%]">
          <Skeleton />
        </h2>
        <div className="grid grid-cols-auto-fill-280 gap-5 gap-y-14  phone:mt-6 w-full mt-14">
          <BlogCardSkeleton cards={9} />
        </div>
      </div>
    </section>
  );
};
export default loading;
