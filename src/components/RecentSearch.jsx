import React from "react";

const RecentSearch = ({recentHistory, setRecentHistory, setSelectedHistory}) => {


  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  return (
    <>
      <div className="col-span-1 dark:bg-zinc-800 bg-gray-200 pt-3">
        <h1 className="text-xl dark:text-white text-shadow-zinc-800 flex text-center justify-center">
          <span>Recent Search</span>
          <button className="cursor-pointer pl-2.5 pt-1 text" onClick={clearHistory}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="m675-144-51-51 69-69-69-69 51-51 69 69 69-69 51 51-69 69 69 69-51 51-69-69-69 69Zm-195 0q-140 0-238-98t-98-238h72q0 109 77.5 186.5T480-216q19 0 37-2.5t35-7.5v74q-17 4-35 6t-37 2ZM144-576v-240h72v130q46-60 114.5-95T480-816q140 0 238 98t98 238h-72q0-109-77.5-186.5T480-744q-62 0-114.5 25.5T277-648h107v72H144Zm409 205L444-480v-192h72v162l74 75-37 64Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left overflow-auto custom-scrollbar text-sm mt-2">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <li
                onClick={() => setSelectedHistory(item)}
                key={index+Math.random()}
                className="p-1 pl-5 px-5 truncate dark:text-zinc-400 text-zinc-900 cursor-pointer dark:hover:bg-zinc-700 hover:bg-indigo-200 dark:hover:text-zinc-200 hover:text-zinc-800"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecentSearch;
