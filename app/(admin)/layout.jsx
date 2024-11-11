import { AuthProvider } from "@app/Providers";
import AdminAppContextProvider from "@context/AdminAppContext";

export const metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

const layout = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <AdminAppContextProvider>{children}</AdminAppContextProvider>
      </AuthProvider>
    </div>
  );
};
export default layout;
