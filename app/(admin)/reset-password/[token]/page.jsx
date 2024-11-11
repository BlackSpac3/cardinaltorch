import { verifyResetPassToken } from "@app/actions";
import InvalidToken from "@components/admin_components/InvalidToken";
import ResetPassForm from "@components/admin_components/reset_pass_page_components/ResetPassForm";

const page = async ({ params }) => {
  const response = await verifyResetPassToken();

  if (!response.success) {
    return <InvalidToken />;
  }

  return (
    <div>
      <ResetPassForm token={params.token} />;
    </div>
  );
};
export default page;
