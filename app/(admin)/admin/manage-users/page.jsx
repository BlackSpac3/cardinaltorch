"use client";
import { useState, useEffect } from "react";
import SearchBox from "@components/admin_components/SearchBox";
import axios from "axios";
import toast from "react-hot-toast";

import ConfirmDelDialog from "@components/admin_components/ConfirmDelDialog";
import UserSkeleton from "@components/admin_components/Skelentons/UserSkeleton";
import AddUserDialog from "@components/admin_components/manage_user_components/AddUserDialog";
import ChangeUserTypeDialog from "@components/admin_components/manage_user_components/ChangeUserTypeDialog";
import NoDataMessage from "@components/admin_components/NoDataMessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ManageUsers = () => {
  const route = useRouter();
  const addUserDialogId = "add-user-dialog";
  const changeUserTypeDialogId = "change-usertype-dialog";
  const confirmDelModalIdName = "del-user-confirm-del-modal";
  const gridCols =
    "grid grid-cols-[2fr_2fr_0.5fr_0.5fr_0.7fr_0.3fr] phone:grid-cols-[1fr_0.5fr_0.3fr] gap-5";

  const [editedUser, setEditedUser] = useState([-1, {}]);
  const [users, setUsers] = useState(null);

  const [acct_type, setAcct_type] = useState("");
  const [query, setQuery] = useState("");

  const { data: session } = useSession();

  const fetchUsers = async ({ query, acct_type }) => {
    setUsers(null);
    await axios
      .post("/api/users/list", { acct_type, query })
      .then(async (res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.res.data.message);
      });
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.keyCode == 13 && query.length) {
      fetchUsers({ query: e.target.value, acct_type });
    }
  };

  const clearSearch = (e) => {
    setQuery(e.target.value);
    e.target.value == "" && fetchUsers({ query: e.target.value, acct_type });
  };

  const filterSearch = (e) => {
    console.log(e.target.value);
    setAcct_type(e.target.value);
    fetchUsers({ query, acct_type: e.target.value });
  };

  const [deleting, setDeleting] = useState(false);

  const delUser = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setDeleting(true);
    try {
      const res = await axios.post("/api/users/remove", {
        id: editedUser[1]._id,
      });
      e.target.disabled = false;
      setDeleting(false);
      toast.success(res.data.message);
      fetchUsers({ query, acct_type });
      document.getElementById(confirmDelModalIdName).close();
    } catch (error) {
      e.target.disabled = false;
      setDeleting(false);
      toast.success("Something went wrong somewhere");
      fetchUsers({ query, acct_type });
    }
  };

  const openConfirmDelModal = (e) => {
    e.preventDefault();
    const curDialog = document.getElementById(
      `${editedUser[0]}-user-option-dialog`
    );
    curDialog.close();
    document.getElementById(confirmDelModalIdName).showModal();
  };

  const openUserOptionDialog = (index, user) => {
    document.getElementById(`${index}-user-option-dialog`).show();
    setEditedUser([index, user]);
  };

  const openConfirmChangeUserTypeModal = (e) => {
    e.preventDefault();
    const curDialog = document.getElementById(
      `${editedUser[0]}-user-option-dialog`
    );
    document.getElementById(changeUserTypeDialogId).showModal();
    curDialog.close();
  };

  useEffect(() => {
    session?.user.user_type !== "admin"
      ? route.push("/admin")
      : fetchUsers({ query, acct_type });
  }, []);

  useEffect(() => {
    let handler = (e) => {
      try {
        const curDialog = document.getElementById(
          `${editedUser[0]}-user-option-dialog`
        );
        if (!curDialog.contains(e.target)) {
          curDialog.close();
        }
      } catch (error) {
        console.log(error);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      try {
        document.removeEventListener("mousedown", handler);
      } catch (error) {
        console.log(error);
      }
    };
  });

  return (
    <section className="flex flex-col h-full w-full">
      <div className="hidden tab-s:block fixed bottom-0 p-2 w-full z-50">
        <button
          onClick={() => document.getElementById(addUserDialogId).showModal()}
          className="bttn-wide w-full"
        >
          Add user
        </button>
      </div>
      <div className="flex justify-between w-full gap-2 px-10 pt-10">
        <div className="flex w-[50%] tab-s:w-full">
          <SearchBox
            onKeyDown={handleSearch}
            onChange={clearSearch}
            filter={filterSearch}
            options={[
              { name: "All", value: "" },
              { name: "Admins", value: "admin" },
              { name: "Users", value: "user" },
            ]}
            placeholder="Find User"
          />
        </div>

        <button
          onClick={() => document.getElementById(addUserDialogId).showModal()}
          className="bttn-primary tab-s:hidden text-xs"
        >
          Add User
        </button>
      </div>

      <div className="px-10 mr-[5px] pt-5">
        <div className={`${gridCols}  py-3 text-sm phone:text-base  `}>
          <p className="line-clamp-1">User</p>
          <p className="line-clamp-1 phone:hidden">Email</p>
          <p className="line-clamp-1 phone:hidden">Reads</p>
          <p className="line-clamp-1 phone:hidden">Posts</p>
          <p className="line-clamp-1">Type</p>
        </div>
        <hr />
      </div>

      <div className="w-full h-full overflow-y-scroll">
        <div className="px-10 pb-10">
          {!users ? (
            <UserSkeleton cards={10} gridCols={gridCols} />
          ) : users.length ? (
            users.map((user, index) => {
              const {
                _id,
                personal_info: { first_name, last_name, email, profile_img },
                account_info: { total_reads, total_posts, type },
              } = user;
              return (
                <div key={index} className="border-b">
                  <div
                    className={`${gridCols} py-2 text-sm phone:text-base items-center`}
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src={profile_img}
                        alt=""
                        className="phone:hidden w-6 h-6 rounded-full bg-gray-50 object-cover"
                      />
                      <p className="line-clamp-1 capitalize">{`${first_name} ${last_name}`}</p>
                    </div>
                    <p className="line-clamp-1 phone:hidden">{email}</p>
                    <p className="line-clamp-1 phone:hidden">{total_reads}</p>
                    <p className="line-clamp-1 phone:hidden">{total_posts}</p>

                    <p className="line-clamp-1 capitalize">{type}</p>

                    <div className="relative w-fit">
                      <button
                        className="p-2 rounded-md hover:bg-gray-50"
                        onClick={() => openUserOptionDialog(index, user)}
                      >
                        <i className="fi fi-rr-menu-dots cursor-pointer"></i>
                      </button>

                      <dialog
                        id={`${index}-user-option-dialog`}
                        className="bg-white -left-10  p-1 rounded-md border z-50 cursor-pointer shadow-sm text-xs"
                      >
                        <p
                          onClick={openConfirmDelModal}
                          className="w-full p-2 rounded-[4.5px] hover:bg-gray-50"
                        >
                          Delete
                        </p>

                        <p
                          onClick={openConfirmChangeUserTypeModal}
                          className="p-2 rounded-[4.5px] hover:bg-gray-50 whitespace-nowrap"
                        >
                          {type == "admin" ? "Make User" : "Make Admin"}
                        </p>
                      </dialog>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <NoDataMessage
                message={
                  query
                    ? `No users found under search ${query}`
                    : "No Other Users Yet"
                }
              />
            </div>
          )}
        </div>
      </div>

      <AddUserDialog
        id={addUserDialogId}
        fetchfunc={fetchUsers}
        query={query}
        acct_type={acct_type}
      />

      <ConfirmDelDialog
        id_name={confirmDelModalIdName}
        delfunc={delUser}
        loadingState={deleting}
        warningText="This action cannot be undone. This will permanently delete this users account and remove all it's data from our servers."
      />

      <ChangeUserTypeDialog
        id={changeUserTypeDialogId}
        editedUser={editedUser[1]}
        fetchfunc={fetchUsers}
        query={query}
        acct_type={acct_type}
      />
    </section>
  );
};
export default ManageUsers;
