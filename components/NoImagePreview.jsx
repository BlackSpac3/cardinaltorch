const NoImagePreview = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-50">
      <div className="text-[#9ea5b0]">
        <i className="fi fi-ts-image-slash text-4xl"></i>
        <p className="mt-1">No Image Available</p>
      </div>
    </div>
  );
};
export default NoImagePreview;
