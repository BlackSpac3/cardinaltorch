import { useEffect, useRef } from "react";

const ContentPages = ({ state, fetchData, author_id, query, max }) => {
  const bttnStyle = "";
  const pages = [];

  console.log(pages);

  if (state != null && state.totalDocs > state.results.length) {
    console.log(state.page);

    useEffect(() => {
      try {
        if (state.page == 1) {
          console.log("prev button should be disabled");
          document.getElementById("pagination-prev-button").disabled = true;
        }

        if (state.page == pages.slice(-1)[0]) {
          console.log("next button should be disabled");
          document.getElementById("pagination-next-button").disabled = true;
        }
      } catch (error) {
        console.log(error);
      }
    }, []);

    for (let i = 0; i < state.totalDocs / max; i++) {
      pages.push(i + 1);
    }
    return (
      <div className="flex text-sm gap-3">
        <button
          id="pagination-prev-button"
          onClick={() => fetchData({ query, page: state.page - 1, max })}
          className="flex items-center justify-center gap-2 py-1 px-2 rounded-[4px] border border-transparent text-gray-500 hover:enabled:border-gray-50 hover:enabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <i className="fi fi-rr-angle-left text-[10px]"></i>
          <p>Previous</p>
        </button>
        {pages.map((page, index) => {
          if (page == 1) {
            return (
              <button
                key={index}
                onClick={() => fetchData({ query, author_id, page, max })}
                className={`border h-full aspect-square rounded-[4px] text-gray-500 hover:bg-gray-50 ${
                  state.page == page
                    ? " border-gray-500  "
                    : " hover:border-gray-50  border-transparent"
                }`}
              >
                {page}
              </button>
            );
          }

          if (state.page == page) {
            return (
              <button
                key={index}
                onClick={() => fetchData({ query, author_id, page, max })}
                className={`border h-full aspect-square rounded-[4px] text-gray-500 hover:bg-gray-50 ${
                  state.page == page
                    ? " border-gray-500  "
                    : " hover:border-gray-50  border-transparent"
                }`}
              >
                {page}
              </button>
            );
          }

          if (page == pages.length) {
            return (
              <button
                key={index}
                onClick={() => fetchData({ query, author_id, page, max })}
                className={`border h-full aspect-square rounded-[4px] text-gray-500 hover:bg-gray-50 ${
                  state.page == page
                    ? " border-gray-500"
                    : " hover:border-gray-50  border-transparent"
                }`}
              >
                {page}
              </button>
            );
          }
        })}

        <button
          id="pagination-next-button"
          onClick={() => fetchData({ query, page: state.page + 1, max })}
          className="flex items-center justify-center gap-2 py-1 px-2 rounded-[4px] border border-transparent text-gray-500 hover:enabled:border-gray-50 hover:enabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          <p>Next</p>
          <i className="fi fi-rr-angle-right text-[10px]"></i>
        </button>
      </div>
    );
  }
};
export default ContentPages;
