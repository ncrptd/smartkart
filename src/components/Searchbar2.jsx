export default function Searchbar2({ handleSearchInput, value }) {
  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium  sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm rounded-xl outline-1
           focus:outline-slate-400"
          autoFocus
          placeholder="Men's Leather Jacket"
          value={value}
          onChange={(e) => handleSearchInput(e)}
        />
      </div>
    </div>
  );
}
