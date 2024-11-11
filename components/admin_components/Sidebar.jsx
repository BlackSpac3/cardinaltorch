"use client";
import Link from "next/link";
import { assets } from "@assets/assets";
import { useContext } from "react";
import { AdminAppContext } from "@context/AdminAppContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { sidebarIsOpen, setSidebarIsOpen, setPageTitle } =
    useContext(AdminAppContext);
  const sidebarOptions = [
    {
      icon: "home",
      title: "Home",
      path: "/admin",
    },
    {
      icon: "edit",
      title: "Write",
      path: "/admin/editor",
    },
    {
      icon: "document",
      title: "Blogs",
      path: "/admin/blogs",
    },
    {
      icon: "file-edit",
      title: "Drafts",
      path: "/admin/drafts",
    },
    {
      icon: "picture",
      title: "Gallery",
      path: "/admin/gallery",
    },
    {
      icon: "users",
      title: "Employees",
      path: "/admin/employees",
    },
    // {
    //   icon: "newsletter-subscribe",
    //   title: "Subsrcibers",
    //   path: "/subsrcibers",
    // },
  ];

  const settingsOptions = [
    {
      icon: "user-pen",
      title: "Edit Profile",
      path: "/admin/edit-profile",
    },
    {
      icon: "lock",
      title: "Change Password",
      path: "/admin/change-password",
    },
    {
      icon: "users",
      title: "Manage Users",
      path: "/admin/manage-users",
    },
  ];

  const isActive = (path) => {
    if (path == "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/auth/logout");
      router.push("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        sidebarIsOpen
          ? "tab-m:left-0 shadow-[0px_0px_10px_-5px_rgba(0,0,0,10)]"
          : "tab-m:-left-full"
      } tab-m:absolute top-0 bg-white flex flex-col h-screen z-[100] border-r w-[15rem] max-w-[15xrem] text-xs tab-m:text-base overflow-y-auto duration-200`}
    >
      <div
        id="logo-div"
        className="flex justify-center  tab-m:justify-between items-center px-5 py-5"
      >
        <Link href="/" onClick={() => setSidebarIsOpen(false)}>
          <Image
            src={assets.logo_black}
            alt=""
            className="w-[100px] cursor-pointer"
          />
        </Link>
        <div
          onClick={() => setSidebarIsOpen(false)}
          className="hidden tab-m:flex h-full aspect-square  justify-center items-center rounded-full bg-gray-50 p-2 cursor-pointer"
        >
          <i className="fi fi-rr-angle-left text-base active:scale-75 duration-100"></i>
        </div>
      </div>

      <div
        id="sidebar-menu"
        className="flex flex-col gap-5
         h-full my-5"
      >
        <div
          id="sidebar-options"
          className="flex flex-col gap-5 place-self-start w-full"
        >
          <div id="dashboard-options-section" className="flex flex-col gap-1">
            <div className="flex flex-col gap-2 pl-3">
              <h2>Dashboard</h2>
              <hr />
            </div>
            <div className="flex flex-col">
              {sidebarOptions.map((option, index) => {
                isActive(option.path) && setPageTitle(option.title);
                if (
                  (option.path == "/admin/employees" ||
                    option.path == "/admin/subsrcibers") &&
                  session?.user.user_type != "admin"
                ) {
                  return null;
                } else {
                  return (
                    <Link
                      key={index}
                      href={option.path}
                      id="dashboard-options"
                      className="cursor-pointer"
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      <div
                        key={index}
                        className={`${
                          isActive(option.path)
                            ? "bg-primary bg-opacity-5 text-primary border-r-primary tab-m:py-5 py-3"
                            : "py-2 tab-m:py-3 opacity-70 hover:opacity-100 border-r-transparent"
                        } flex gap-2 items-center px-5 cursor-pointer duration-75 border-r-[2px]`}
                      >
                        <i className={`fi fi-rr-${option.icon}`}></i>
                        <p className="leading-none ">{option.title}</p>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>

          <div id="settings-options-section" className="flex flex-col gap-1">
            <div className="flex flex-col gap-2 pl-3">
              <h2>Settings</h2>
              <hr />
            </div>
            <div id="settings-options" className="flex flex-col">
              {settingsOptions.map((option, index) => {
                isActive(option.path) && setPageTitle(option.title);
                if (
                  session?.user.user_type !== "admin" &&
                  option.path === "/admin/manage-users"
                ) {
                  return null;
                }
                return (
                  <Link
                    key={index}
                    href={option.path}
                    id="sidebar-option"
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <div
                      key={index}
                      className={`${
                        isActive(option.path)
                          ? "bg-primary bg-opacity-5 text-primary border-r-primary tab-m:py-5 py-3"
                          : "py-2 tab-m:py-3 opacity-70 hover:opacity-100  border-r-transparent"
                      } flex gap-2 items-center px-5 cursor-pointer duration-100 border-r-[2px]`}
                    >
                      <i className={`fi fi-rr-${option.icon}`}></i>
                      <p className="leading-none">{option.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div
          id="logout-bttn"
          className="flex flex-col h-full items-center justify-end my-5"
        >
          <button className="flex items-center gap-1" onClick={() => signOut()}>
            <i className="fi fi-rr-exit -rotate-180"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
