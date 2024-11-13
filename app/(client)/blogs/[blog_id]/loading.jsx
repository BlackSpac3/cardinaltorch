"use client";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  const baseColor = "#e2e8f0";

  return (
    <section className="pb-5">
      <div className="bg-slate-100 h-full px-8 flex flex-col gap-7 items-center pt-[120px] phone:pt-[100px]">
        <h1 className="section-big-text w-[60%] phone:w-full text-center capitalize">
          <Skeleton baseColor={baseColor} count={3} />
        </h1>
        <div className="flex flex-wrap gap-5 items-center phone:gap-4 text-gray-500">
          <div className="flex gap-3 items-center">
            <Skeleton circle baseColor={baseColor} width={30} height={30} />
            <p className="w-20 whitespace-nowrap leading-none">
              <Skeleton baseColor={baseColor} />
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <i className="fi fi-sr-calendar-day"></i>
            <p className="w-20 whitespace-nowrap">
              <Skeleton baseColor={baseColor} />
            </p>
          </div>
          <div className="flex gap-3 items-center phone:hidden">
            <i className="fi fi-sr-folder-open"></i>
            <p className="w-20">
              <Skeleton baseColor={baseColor} />
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full py-7 phone:pb-3">
        <div className="absolute top-0 bg-slate-100 w-full h-1/2 -z-10"></div>
        <div className="w-[60%] aspect-[13/8] min-h-[320px] object-cover phone:w-[95%] tab-m:w-[70%] m-auto border-4 border-white duration-100 bg-gray-50">
          <Skeleton baseColor={baseColor} width={"100%"} height={"100%"} />
        </div>
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
    </section>
  );
};
export default loading;
