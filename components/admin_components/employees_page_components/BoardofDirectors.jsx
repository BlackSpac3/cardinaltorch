import axios from "axios";
import toast from "react-hot-toast";
import NoDataMessage from "../NoDataMessage";
import EmployeeCard from "./EmployeeCard";

const fetchData = async () => {
  try {
    const response = await axios.post("/api/employees/list", { dept: "board" });

    return response.data.data;
  } catch (error) {
    toast.error("Error connecting to server", {
      id: "error-connecting-to-server",
    });
  }
};

const BoardofDirectors = async ({ setEmployeesPage }) => {
  const boardMembers = await fetchData();
  return (
    <div className="flex relative pt-3 pb-2 gap-2 w-full h-full overflow-y-hidden overflow-x-scroll">
      {!boardMembers.length ? (
        <NoDataMessage message={"No Board of Directors yet"} />
      ) : (
        boardMembers.map((member, index) => (
          <div
            onClick={() =>
              setEmployeesPage([
                "edit",
                {
                  _id: member._id,
                  name: member.name,
                  img: member.img,
                  role: member.role,
                  desc: member.desc,
                  dept: member.dept,
                },
              ])
            }
            key={index}
            className="flex h-full flex-col aspect-square cursor-pointer"
          >
            <EmployeeCard
              img={member.img}
              name={member.name}
              role={member.role}
            />
          </div>
        ))
      )}
    </div>
  );
};
export default BoardofDirectors;
