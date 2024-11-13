import { assets } from "@assets/assets";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex flex-col w-full h-full bg-white">
      <nav className="w-full justify-between items-center py-4 px-[3vw] tab-s:px-[5vw] border-b duration-100">
        <Link href="/">
          <Image
            src={assets.logo_black}
            className="h-[26px] w-auto cursor-pointer"
          />
        </Link>
      </nav>
      <div className="m-body tab-s:flex-col flex gap-20 tab-s:gap-10 items-center justify-center  mx-auto">
        <Image
          src={assets.page404_image}
          alt=""
          className="w-[400px] select-none"
        />
        <div className="flex flex-col items-center text-center">
          <h1 className="section-big-text">Oops!</h1>
          <p className="text-gray-500 mt-5">
            The page you're looking for does not exist <br /> Please go back to
            home page.
          </p>
          <Link
            href="/"
            className="px-5 py-3 flex items-center rounded-full gap-2 bg-primary hover:bg-secondary text-white  mt-10 duration-75"
          >
            <p className="leading-none">Back to home</p>
            <i className="fi fi-rr-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
