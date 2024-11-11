"use client";
import { useRouter } from "next/navigation";

const InvalidToken = () => {
  const route = useRouter();
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-50">
      <div className=" bg-white shadow-md h-fit rounded-md p-10 w-[460px] phone:w-[90%] items-center text-center z-10">
        <h2 className="text-2xl font-bold">Whoops! That's an expired link</h2>
        <p className="text-sm text-gray-500 mt-2">
          For security reasons password reset links expire after a little while.
          If you still need to reset your password you can click on the{" "}
          <span className="text-primary">forgot password</span> link on the
          login page.
        </p>

        <button
          onClick={() => route.replace("/login")}
          className="bttn-primary mt-10"
        >
          Back to login
        </button>
      </div>
    </div>
  );
};
export default InvalidToken;
