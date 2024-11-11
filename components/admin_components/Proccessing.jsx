import Spinner from "./Spinner";
const Proccessing = ({ color, message, deleting }) => {
  return (
    <div
      className={`flex items-center w-full gap-2 rounded-md bg-opacity-5 p-3 bg-${color} text-${color}`}
    >
      <div className="w-6 h-6">
        <Spinner deleting={deleting} />
      </div>
      <p className="leading-none text-sm">{message}</p>
    </div>
  );
};
export default Proccessing;
