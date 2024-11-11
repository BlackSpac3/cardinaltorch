"use client";
import ActivitySkeleton from "@components/admin_components/Skelentons/ActivitySkeleton";
import MiniBlogCardSkelenton from "@components/admin_components/Skelentons/MiniBlogCardSkelenton";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  const { data: session } = useSession();
  return (
    <section className="flex flex-col w-full h-full overflow-hidden tab-m:overflow-scroll tab-m:h-fit ">
      <section className="grid grid-cols-[1fr,0.6fr] tab-m:flex tab-m:flex-col overflow-hidden tab-m:overflow-scroll px-[3vw] tab-m:gap-5 h-full ">
        <div className="flex flex-col gap-5 tab-m:gap-10 h-full tab-m:h-fit  overflow-hidden tab-m:pr-0 pr-5 pt-5">
          <div>
            <div className="">
              <h1 className="text-xl capitalize">
                {`Welcome, ${session?.user?.first_name}`}
              </h1>
              <p className="text-xs w-[60%] tab-s:w-full text-gray-500">
                Let's create awesome contents for your viewers
              </p>
            </div>

            <div className="grid grid-cols-4 phone:grid-cols-2 gap-2 mt-4">
              <div className="rounded-md p-3 bg-[#2fae6015] text-primary">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-lg w-[24px] h-[24px]">
                    <i className={`fi fi-sr-document text-xs`}></i>
                  </div>
                  <p className="text-xs w-full">Posts</p>
                </div>
                <p className="text-2xl font-medium mt-3 px-1">
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    highlightColor="#ffffff50"
                    baseColor="#2fae6050"
                  />
                </p>
              </div>

              <div className="rounded-md p-3 bg-[#2563eb15] text-blue-600">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-lg w-[24px] h-[24px]">
                    <i className="fi fi-sr-check-double text-xs"></i>
                  </div>
                  <p className="text-xs w-full">Reads</p>
                </div>
                <p className="text-2xl font-medium mt-3 px-1">
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    highlightColor="#ffffff50"
                    baseColor="#2563eb50"
                  />
                </p>
              </div>

              <div className="rounded-md p-3 bg-[#ea580615] text-orange-600">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-lg w-[24px] h-[24px]">
                    <i className="fi fi-sr-file-edit text-xs"></i>
                  </div>
                  <p className="text-xs w-full">Drafts</p>
                </div>
                <p className="text-2xl font-medium mt-3 px-1">
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    highlightColor="#ffffff50"
                    baseColor="#ea580650"
                  />
                </p>
              </div>

              <div className="rounded-md p-3 bg-[#9333ea15] text-purple-600">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-lg w-[24px] h-[24px]">
                    <i className="fi fi-sr-picture text-xs"></i>
                  </div>
                  <p className="text-xs w-full">Images</p>
                </div>
                <p className="text-2xl font-medium mt-3 px-1">
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    highlightColor="#ffffff50"
                    baseColor="#9333ea50"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col  bg-white tab-s:overflow-auto tab-m:h-[40vh] h-full overflow-hidden">
            <div className="flex items-center justify-between">
              <h1 className="text-lg">Recent Activities</h1>
            </div>
            <hr className="mt-4" />
            <div className="flex flex-col max-h-full tab-s:max-h-fit tab-s:overflow-auto overflow-hidden">
              <div className="max-h-full overflow-y-scroll tab-s:overflow-auto tab-s:max-h-fit text-neutral-700">
                <div className="grid grid-cols-[0.3fr_0.4fr_0.2fr_0.3fr] tab-s:grid-cols-[0.5fr_0.3fr_0.3fr] gap-2  py-2 text-xs">
                  <p>Activity</p>
                  <p className="tab-s:hidden">Title</p>
                  <p>Date</p>
                  <p>By</p>
                </div>
                <hr className="" />
                <div className="pb-5">
                  <ActivitySkeleton cards={10} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-l tab-m:border-l-0 bg-white max-h-full w-full pl-5 tab-m:pl-0 pt-5 overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg">Your recent blogs</h1>
          </div>
          <hr className="mt-3" />
          <div className="h-full w-full flex flex-col gap-2 overflow-y-scroll pt-3 pb-5 pr-2">
            <MiniBlogCardSkelenton cards={5} />
          </div>
        </div>
      </section>
    </section>
  );
};
export default loading;
