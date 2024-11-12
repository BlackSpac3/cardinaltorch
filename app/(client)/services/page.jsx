import Cooperative from "@components/service_components/Cooperative";
import Header from "@components/service_components/Header";
import Product from "@components/service_components/Product";

export const metadata = {
  title: "Services",
};

const page = () => {
  return (
    <section className="relative w-full h-full overflow-hidden">
      <div className="bg-white px-[10vw] py-[20px] flex flex-col gap-[5vw] phone:px-[7vw] w-full">
        <Header />
        <hr />
        <Product />
      </div>
      <Cooperative />
    </section>
  );
};
export default page;
