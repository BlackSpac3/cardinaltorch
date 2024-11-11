import { authOptions } from "@app/api/auth/[...nextauth]/route";
import EmployeesPage from "@components/admin_components/employees_page_components/EmployeesPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.user_type !== "admin") {
    redirect("/admin");
  }

  return <EmployeesPage />;
};
export default page;
