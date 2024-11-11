"use client";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  const baseColor = "#e2e8f0";

  return (
    <section>
      <div className="bg-slate-100 h-full px-8 pb-32 flex flex-col gap-7 items-center pt-[120px]">
        <h1 className="section-big-text w-[60%] text-center capitalize">
          <Skeleton baseColor={baseColor} count={3} />
        </h1>
        <div className="flex gap-5 items-center text-gray-500">
          <div className="flex gap-3 items-center">
            <Skeleton circle baseColor={baseColor} width={30} height={30} />
            <p className="w-20 leading-none">
              <Skeleton baseColor={baseColor} />
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <i className="fi fi-sr-calendar-day"></i>
            <p className="w-20">
              <Skeleton baseColor={baseColor} />
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <i className="fi fi-sr-folder-open"></i>
            <p className="w-20">
              <Skeleton baseColor={baseColor} />
            </p>
          </div>
        </div>
      </div>

      <div className="mb-14">
        <div className="w-[50%] h-[400px] object-cover phone:w-[80%] m-auto relative -top-20 border-4 border-white">
          <Skeleton baseColor={baseColor} width={"100%"} height={"100%"} />
        </div>

        <div className="w-[65%] m-auto phone:w-[90%]">
          <h2 className="w-[50%] mt-4">
            <Skeleton />
          </h2>
          <p className="w-full mt-4">
            <Skeleton count={5} />
          </p>
          <h2 className="w-[50%] mt-4">
            <Skeleton />
          </h2>
          <p className="w-full mt-4">
            <Skeleton count={10} />
          </p>
        </div>
      </div>
    </section>
  );
};
export default loading;
