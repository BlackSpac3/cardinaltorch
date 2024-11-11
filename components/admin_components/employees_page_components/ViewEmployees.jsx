import BoardofDirectors from "./BoardofDirectors";
import ManagementTeam from "./ManagementTeam";

const ViewEmployees = ({ setEmployeesPage }) => {
  return (
    <section className="w-full h-full overflow-hidden py-5 px-[3vw]">
      <div className="w-full h-full grid grid-rows-2 gap-5 overflow-hidden">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <header className="w-full flex justify-between">
            <h2 className="font-medium">Board of Directors</h2>
            <button
              onClick={() => setEmployeesPage(["add"])}
              className="bttn-primary text-xs"
            >
              Add Employee
            </button>
          </header>
          <BoardofDirectors setEmployeesPage={setEmployeesPage} />
        </div>
        <div className="flex flex-col w-full h-full overflow-hidden">
          <h2 className="font-medium">Management</h2>

          <ManagementTeam setEmployeesPage={setEmployeesPage} />
        </div>
      </div>
    </section>
  );
};
export default ViewEmployees;
