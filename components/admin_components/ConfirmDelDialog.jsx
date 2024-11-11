import Proccessing from "./Proccessing";

const ConfirmDelDialog = ({ id_name, delfunc, warningText, loadingState }) => {
  return (
    <dialog
      id={id_name}
      className="mx-auto my-auto w-[400px] phone:w-[90%] rounded-md text-sm"
    >
      <div className="flex flex-col items-start gap-3 p-6">
        <h2 className="text-lg leading-none font-medium">
          Are you absolutely sure?
        </h2>
        <p className=" text-gray-500 text-xs">{warningText}</p>
        {loadingState && (
          <Proccessing color="red-500" deleting={true} message="Deleting..." />
        )}
        <div className="flex gap-3 mt-2 place-self-end max-w-full">
          <button
            onClick={() => document.getElementById(id_name).close()}
            className="bttn-outline"
          >
            Cancel
          </button>
          <button onClick={delfunc} className="bttn-red">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default ConfirmDelDialog;
