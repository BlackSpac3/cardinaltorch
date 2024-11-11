"use client";
import Navbar from "@components/admin_components/Navbar";
import SetNewPassDialog from "@components/admin_components/SetNewPassDialog";
import Sidebar from "@components/admin_components/Sidebar";
import Spinner from "@components/admin_components/Spinner";
import { useSession } from "next-auth/react";

const layout = ({ children }) => {
  const { data: session } = useSession();

  return !session ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-10 h-10 mx-auto my-auto">
        <Spinner />
      </div>
    </div>
  ) : session?.user.default_pass ? (
    <SetNewPassDialog />
  ) : (
    <div className="flex w-full h-full bg-white">
      <Sidebar />
      <div className="flex flex-col w-screen h-screen">
        <Navbar />
        <div className="w-full h-full overflow-hidden tab-m:overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
export default layout;
