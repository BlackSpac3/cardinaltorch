import Link from "next/link";
import Image from "next/image";
import { assets } from "@assets/assets";

const GlobalNav = () => {
  return (
    <nav className="w-full justify-between items-center py-4 px-[3vw] tab-s:px-[5vw] border-b duration-100">
      <Link href="/">
        <Image
          src={assets.logo_black}
          className="h-[26px] w-auto cursor-pointer select-none"
        />
      </Link>
    </nav>
  );
};
export default GlobalNav;
