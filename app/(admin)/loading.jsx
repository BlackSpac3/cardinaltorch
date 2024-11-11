import Spinner from "@components/admin_components/Spinner";

const loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="w-10 h-10 mx-auto my-auto">
        <Spinner />
      </div>
    </div>
  );
};
export default loading;
