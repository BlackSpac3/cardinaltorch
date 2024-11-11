import { assets } from "../../assets/assets";

const ExpiredLinkMessage = () => {
  return (
    <div className="relative flex justify-center w-full h-full bg-gray-50">
      <img
        src={assets.bad_link_img}
        alt=""
        className="absolute bottom-0 w-full object-cover z-0"
      />
      <div className=" bg-white shadow-md h-fit my-14 rounded-md p-10 w-[460px] phone:w-[90%] items-center text-center z-10">
        <h2 className="text-2xl font-medium font-['poppins]">
          Whoops, that's an expired link
        </h2>
        <p className="text-sm text-gray-500 mt-4">
          For security reasons password reset links expire after a little while.
          If you still need to reset your password you can click on the{" "}
          <span className="text-primary">forgot password</span> link on the
          login page
        </p>

        <button className="bttn-primary mt-10">Back to login</button>
      </div>
    </div>
  );
};
export default ExpiredLinkMessage;
