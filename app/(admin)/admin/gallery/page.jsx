"use client";
import UploadImagePage from "@components/admin_components/gallery_page_components/UploadImagePage";
import ViewGallery from "@components/admin_components/gallery_page_components/ViewGallery";
import { useState } from "react";

const page = () => {
  const [galleryState, setGalleryState] = useState("view");
  return galleryState == "view" ? (
    <ViewGallery setState={setGalleryState} />
  ) : (
    <UploadImagePage setState={setGalleryState} />
  );
};
export default page;
