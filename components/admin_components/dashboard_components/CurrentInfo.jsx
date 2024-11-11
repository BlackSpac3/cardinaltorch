import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getLatestUserData } from "@app/actions";

const CurrentInfo = async () => {
  const session = await getServerSession(authOptions);
  const resposnse = await getLatestUserData(session?.user?.email);
  const info_tags = [
    {
      icon: "document",
      title: "Posts",
      amount: resposnse?.data?.total_posts,
    },
    {
      icon: "check-double",
      title: "Reads",
      amount: resposnse?.data?.total_reads,
    },
    {
      icon: "file-edit",
      title: "Drafts",
      amount: resposnse?.data?.total_drafts,
    },
    {
      icon: "picture",
      title: "Images",
      amount: resposnse?.data?.total_images,
    },
  ];
  // const getUserLatestData = async () => {
  //   const res = await axios.post(`${url}/api/user/get-user`, { email });

  //   if (res.data.success) {
  //     const data = res.data.data;
  //     let newUserData = { ...userData, ...data };
  //     storeInSession("user", JSON.stringify(newUserData));
  //     setUserData(newUserData);
  //     console;
  //   } else {
  //     toast.error("Error getting user");
  //   }
  // };

  return (
    <div>
      <div className="">
        <h1 className="text-xl capitalize">{`Welcome, ${session?.user.first_name}`}</h1>
        <p className="text-xs w-[60%] text-gray-500">
          Let's create awesome contents for your viewers
        </p>
      </div>

      <div className="grid grid-cols-4 phone:grid-cols-2 gap-2 mt-4">
        {info_tags.map((tag, index) => (
          <div
            key={index}
            className={`rounded-md py-3 px-3 ${
              (index === 0 && "bg-[#2fae6010] text-primary") ||
              (index === 1 && "bg-[#2563eb10] text-blue-600") ||
              (index === 2 && "bg-[#ea580610] text-orange-600") ||
              (index === 3 && "bg-[#9333ea10] text-purple-600")
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center rounded-lg w-[24px] h-[24px] ${
                  (index === 0 && "bg-[#2fae6015] text-primary") ||
                  (index === 1 && "bg-[#2563eb15] text-blue-600") ||
                  (index === 2 && "bg-[#ea580615] text-orange-600") ||
                  (index === 3 && "bg-[#9333ea15] text-purple-600")
                }`}
              >
                <i className={`fi fi-sr-${tag.icon} text-xs`}></i>
              </div>
              <p className="text-xs">{tag.title}</p>
            </div>
            <p className="text-2xl font-medium mt-3 px-1">{tag.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CurrentInfo;
