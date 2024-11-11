const NoDataMessage = ({ message }) => {
  return (
    <div className=" w-full max-h-fit bg-gray-50 border rounded-md text-gray-500 p-4 text-center">
      <p>{message}</p>
    </div>
  );
};
export default NoDataMessage;
