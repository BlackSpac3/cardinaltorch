"use client";

import { createContext, useState } from "react";

export const AdminAppContext = createContext(null);

const AdminAppContextProvider = (props) => {
  const [pageTitle, setPageTitle] = useState("");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    access_token: null,
  });
  const contextvalue = {
    userData,
    setUserData,
    sidebarIsOpen,
    setSidebarIsOpen,
    pageTitle,
    setPageTitle,
  };
  return (
    <AdminAppContext.Provider value={contextvalue}>
      {props.children}
    </AdminAppContext.Provider>
  );
};
export default AdminAppContextProvider;
