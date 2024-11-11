import EmployeeCardSkeleton from "@components/admin_components/Skelentons/EmployeeCardSkeleton";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <section className="w-full h-full overflow-hidden py-5 px-[3vw]">
      <div className="w-full h-full grid grid-rows-2 gap-5 overflow-hidden">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <header className="w-full flex justify-between">
            <h2 className="font-medium">Board of Directors</h2>
            <Skeleton />
          </header>
          <div className="flex relative pt-3 pb-2 gap-2 w-full h-full overflow-y-hidden overflow-x-scroll">
            <EmployeeCardSkeleton cards={10} />
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-hidden">
          <h2 className="font-medium">Management</h2>
          <div className="flex relative pt-3 pb-2 gap-2 w-full h-full overflow-y-hidden overflow-x-scroll">
            <EmployeeCardSkeleton cards={10} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default loading;
