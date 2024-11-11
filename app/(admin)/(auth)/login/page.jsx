import { authOptions } from "@app/api/auth/[...nextauth]/route";
import LoginPage from "@components/admin_components/login_page_components/LoginPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  console.log("sesss", session, "____________________");

  if (session) {
    redirect("/admin");
  }

  return <LoginPage />;
};
export default page;
