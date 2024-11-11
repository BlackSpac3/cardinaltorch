"use client";
import { useContext } from "react";
import Link from "next/link";
import { AdminAppContext } from "@context/AdminAppContext";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const url = "http://localhost:3000/uploads";
  const { pageTitle, setSidebarIsOpen } = useContext(AdminAppContext);
  const img = session?.user.profile_img;
  const reloadImg = (e) => {
    // e.target.src = img;
  };
  return (
    <div className="flex justify-between  items-center py-3 px-[3vw] border-b duration-100">
      <div className="flex gap-5 items-center">
        <div
          onClick={() => setSidebarIsOpen(true)}
          className="items-center justify-center h-full aspect-square hidden tab-m:flex  hover:bg-gray-50 p-2 rounded-md cursor-pointer"
        >
          <i className="fi fi-rr-menu-burger active:scale-75  duration-100 "></i>
        </div>
        <h2 className="text-xl leading-none">{pageTitle}</h2>
      </div>

      <Link
        href="/admin/edit-profile"
        id="profile-card"
        className="flex items-center gap-2 cursor-pointer relative rounded-full"
      >
        <img
          src={img}
          className="w-[30px] h-[30px] object-cover rounded-full"
          onError={reloadImg}
        />

        <div className="flex items-start gap-2 tab-m:hidden">
          <p className="text-sm capitalize leading-none line-clamp-1">
            {session?.user.name}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default Navbar;
