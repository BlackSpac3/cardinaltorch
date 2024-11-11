import { assets } from "@assets/assets";
import Image from "next/image";
const Subsidiary = () => {
  return (
    <section className="flex flex-col gap-5 items-center">
      <h2 className="small-section-title text-primary">Our Subsidiaries</h2>
      <div className="flex items-center gap-10">
        <Image
          className="w-[200px] phone:w-[100px]"
          src={assets.cardinal_energies_logo}
          alt="Cardinal Energies"
        />
        <Image
          className="w-[200px] phone:w-[100px]"
          src={assets.logo_black}
          alt="Cardinal Torch Company Limited UK"
        />
      </div>
    </section>
  );
};

export default Subsidiary;
