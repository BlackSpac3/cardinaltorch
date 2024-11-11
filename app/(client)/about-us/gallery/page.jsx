import Header from "@components/gallery_page_components/Header";
import Gallery_pics from "@components/gallery_page_components/Gallery_pics";

export const metadata = {
  title: "Gallery",
};

const page = () => {
  return (
    <div className="mt-[50px] flex flex-col gap-[5vw] p-[5vw]">
      <Header />
      <hr />
      <Gallery_pics />
    </div>
  );
};
export default page;
