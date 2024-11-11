import { authOptions } from "@app/api/auth/[...nextauth]/route";
import CurrentInfo from "@components/admin_components/dashboard_components/CurrentInfo";
import RecentActivities from "@components/admin_components/dashboard_components/RecentActivities";
import RecentBlogs from "@components/admin_components/dashboard_components/RecentBlogs";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Dashboard = async () => {
  return (
    <section className="flex flex-col w-full h-full overflow-hidden tab-m:overflow-scroll tab-m:h-fit ">
      <section className="grid grid-cols-[1fr,0.6fr] tab-m:flex tab-m:flex-col overflow-hidden tab-m:overflow-scroll px-[3vw] tab-m:gap-5 h-full ">
        <div className="flex flex-col gap-5 tab-m:gap-10 h-full tab-m:h-fit  overflow-hidden tab-m:pr-0 pr-5 pt-5">
          <CurrentInfo />

          <RecentActivities />
        </div>
        <div className="flex flex-col border-l tab-m:border-l-0 bg-white max-h-full w-full pl-5 tab-m:pl-0 pt-5 overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg ">Your recent blogs</h1>
            <Link href="/blogs">
              <button className="text-xs border rounded-md px-3 py-1">
                View all
              </button>
            </Link>
          </div>
          <hr className="mt-3" />
          <div className="h-full w-full flex flex-col gap-2 overflow-y-scroll pt-3 pb-5 pr-2">
            <RecentBlogs />
          </div>
        </div>
      </section>
    </section>
  );
};
export default Dashboard;
