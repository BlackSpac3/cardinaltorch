const AddImgDropZone = () => {
  return (
    <div className="w-full h-full border-2 bg-[#9ea5b0] bg-opacity-0 hover:bg-opacity-5 border-dashed flex items-center justify-center duration-75">
      <div>
        <i className="fi fi-sr-cloud-upload-alt text-[80px] text-[#9ea5b0]"></i>
        <p className="mt-2">Choose a file or drag and drop</p>
        <p className="text-sm">
          Image should not be more than{" "}
          <span className="text-red-500">6MB</span>{" "}
        </p>
      </div>
    </div>
  );
};
export default AddImgDropZone;
