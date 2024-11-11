import { icons } from "../../assets/assets";
import Image from "next/image";

const MisionVision = () => {
  const cardStyles =
    "flex flex-col items-center w-full p-[10%] rounded-3xl shadow-md";
  const cardTitleStyles = "text-2xl font-medium mt-3";
  const cardDescStyles = "text-xs mt-1";
  return (
    <section className="grid grid-cols-[0.9fr_1.1fr] m-body gap-5 phone:flex phone:flex-col">
      <div>
        <h2 className="section-header">At Cardinal Energies</h2>
        <p className="mt-5">
          We don’t just generate power, we ignite possibilities. Our journey is
          one of resilience, innovation, and unwavering commitment. From the oil
          fields to the wind farms, we’ve scaled peaks and harnessed the
          elements. As the sun rises on each project, we rise too—driven by a
          vision that transcends horizons.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center phone:flex phone:flex-col">
        <div className={`${cardStyles} bg-[#efefef]`}>
          <Image src={icons.vision_icon} className="w-[40px]" />
          <h2 className={`${cardTitleStyles}`}>Vision</h2>
          <p className={cardDescStyles}>
            Our vision is to lead the global transition toward a sustainable and
            energy-efficient future by empowering communities and businesses
            with innovative, reliable, and clean energy solutions while
            preserving our planet for future generations.
          </p>
        </div>

        <div className={`${cardStyles} bg-primary text-white`}>
          <Image src={icons.mission_icon} className="w-[40px]" />
          <h2 className={`${cardTitleStyles}`}>Mission</h2>
          <p className={cardDescStyles}>
            At the core of our mission is the steadfast commitment to delivering
            high-quality energy solutions that adapt to the evolving needs of
            our customers, all while embodying a deep dedication to
            sustainability and innovation.
          </p>
        </div>
      </div>
    </section>
  );
};
export default MisionVision;
