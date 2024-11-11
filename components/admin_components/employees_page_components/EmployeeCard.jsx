const EmployeeCard = ({ img, name, role }) => {
  return (
    <div className="relative w-full h-full flex-col border rounded-md overflow-hidden">
      <img
        src={img}
        alt=""
        className="w-full h-full rounded-md object-cover object-top"
      />
      <div className="absolute flex flex-col items-center p-4 bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white w-full">
        <h2 className="leading-none text-center capitalize font-medium">
          {name}
        </h2>
        <p className="text-center text-sm capitalize">{role}</p>
      </div>
    </div>
  );
};
export default EmployeeCard;
