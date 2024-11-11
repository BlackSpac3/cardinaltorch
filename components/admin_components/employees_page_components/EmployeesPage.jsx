"use client";

import AddEmployee from "@components/admin_components/employees_page_components/AddEmployee";
import ViewEmployees from "@components/admin_components/employees_page_components/ViewEmployees";
import { useState } from "react";

const EmployeesPage = () => {
  const [employeesPage, setEmployeesPage] = useState(["view"]);
  return employeesPage[0] == "view" ? (
    <ViewEmployees setEmployeesPage={setEmployeesPage} />
  ) : (
    <AddEmployee
      employeesPage={employeesPage}
      setEmployeesPage={setEmployeesPage}
    />
  );
};
export default EmployeesPage;
