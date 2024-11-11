const Pagination = ({ state, fetchData, dataToSend, max }) => {
  const pages = [];

  if (state != null && state.totalDocs > state.results.length) {
    for (let i = 0; i < state.totalDocs / max; i++) {
      pages.push(i + 1);
    }
    return (
      <div className="grid grid-cols-3 text-sm w-full items-center">
        {state.page > 2 ? (
          <button
            onClick={() => fetchData({ ...dataToSend, page: 1, max })}
            className="flex items-center max-w-fit gap-2 px-5 py-2 rounded-md text-primary  hover:bg-primary hover:bg-opacity-5"
          >
            <i className="fi fi-rr-angle-double-left text-[10px]"></i>
            <p>Go back to page 1</p>
          </button>
        ) : (
          <div></div>
        )}

        <div className="flex gap-2 justify-center">
          {state.page != 1 && (
            <button
              id="pagination-prev-button"
              onClick={() =>
                fetchData({ ...dataToSend, page: state.page - 1, max })
              }
              className={`flex items-center gap-2 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:bg-opacity-5 duration-100 ${
                state.page == pages.length ? "px-5" : "px-4"
              }`}
            >
              <i className="fi fi-rr-angle-left text-[10px]"></i>
              {state.page == pages.length && <p>Previous Page</p>}
            </button>
          )}
          {state.page != pages.length && (
            <button
              id="pagination-next-button"
              onClick={() =>
                fetchData({ ...dataToSend, page: state.page + 1, max })
              }
              className="flex items-center gap-2 bg-primary border border-primary text-white py-2 px-5 rounded-md hover:bg-[#2da55b]"
            >
              <p className="">Next Page</p>
              <i className="fi fi-rr-angle-right text-[10px]"></i>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 justify-end text-gray-500">
          <p>{`Page ${state.page} of ${pages.length}`}</p>
        </div>
      </div>
    );
  }
};
export default Pagination;
