import Management from "@components/team_page_components/Management";
import Board from "@components/team_page_components/Board";
import Header from "@components/team_page_components/Header";
import Image from "next/image";
import { assets } from "@assets/assets";

export const metadata = {
  title: "Team",
  description:
    "David is an astute business professional with over twenty years of successful business experience in various sectors including commodity trading",
};

const page = () => {
  return (
    <div className="mt-[50px] flex flex-col gap-[5vw] p-[5vw]">
      <Header />

      <div className="relative flex items-center w-full gap-5">
        <p className="min-w-fit text-lg">Board of Directors</p>
        <hr className="w-full" />
        <Image
          src={assets.sesame_bg_illustration}
          className=" absolute w-64 h-44 -right-48 -top-20 opacity-40 phone:w-36 phone:h-28"
          alt=""
          srcset=""
          priority={true}
        />
      </div>
      <Board />
      <div className="flex items-center w-full gap-5">
        <p className="min-w-fit text-lg">Management Team</p>
        <hr className="w-full" />
      </div>
      <Management />
    </div>
  );
};
export default page;
