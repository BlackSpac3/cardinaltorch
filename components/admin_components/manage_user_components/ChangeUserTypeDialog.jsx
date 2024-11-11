import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Proccessing from "../Proccessing";

const ChangeUserTypeDialog = ({
  id,
  editedUser,
  fetchfunc,
  query,
  acct_type,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const changeUserType = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    e.target.disabled = true;

    const user_type =
      editedUser.account_info.type == "admin" ? "user" : "admin";

    try {
      const res = await axios.post("/api/users/change-type", {
        id: editedUser._id,
        user_type,
      });
      setIsLoading(false);
      e.target.disabled = false;
      toast.success(res.data.message);
      fetchfunc({ query, acct_type });
      document.getElementById(id).close();
    } catch (error) {
      setIsLoading(false);
      e.target.disabled = false;
      toast.success("Something went wrong somewhere");
      fetchfunc({ query, acct_type });
    }
  };
  return (
    <dialog
      id={id}
      className="rounded-md my-auto mx-auto w-[360px] phone:w-[90%] text-sm"
    >
      <div className="flex flex-col items-start gap-3 p-6">
        <h2 className="text-lg leading-none font-medium">Are you sure?</h2>
        <p className=" text-gray-500 text-xs">
          You are about to
          {Object.keys(editedUser).length && (
            <span className="">
              {editedUser.account_info.type == "admin"
                ? ` revoke ${editedUser.personal_info.first_name}'s `
                : ` give ${editedUser.personal_info.first_name} `}
            </span>
          )}
          admin access.
        </p>
        {isLoading && (
          <Proccessing color="primary" message="Updating user..." />
        )}

        <div className="flex gap-3 mt-2 place-self-end max-w-full">
          <button
            onClick={() => document.getElementById(id).close()}
            className="bttn-outline w-fullduration-200"
          >
            Cancel
          </button>
          <button
            onClick={changeUserType}
            className="bttn-primary  whitespace-nowrap"
          >
            Yes, I'm Sure
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default ChangeUserTypeDialog;
