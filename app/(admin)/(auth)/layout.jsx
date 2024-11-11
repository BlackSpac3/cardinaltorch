import { assets } from "@assets/assets";
import Image from "next/image";
const layout = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-white">
      <section className="z-20 w-full h-full  grid grid-cols-[0.6fr_1fr]  tab-m:grid-cols-1 animate-[fadeIn,1.5s]">
        <div className="flex flex-col p-5 gap-5 w-[80%] tab-m:w-[60%] tab-s:w-[80%] phone:w-[95%] tab-s:mt-5 mx-auto mt-16   rounded-[8px] text-sm">
          <Image
            src={assets.logo_black}
            alt="Cardinal Torch"
            width={120}
            className="select-none"
          />
          {children}
        </div>
        <div className="w-full h-full tab-m:hidden">
          <Image
            src={assets.login_banner}
            alt="Cardinal Energies"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};
export default layout;
