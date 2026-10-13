import { useState, useEffect } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

function SearchInput({ value, onChange, placeholder = "Search projects by name, keyword, or tech..." }) {
  const [localValue, setLocalValue] = useState(value || "");
  const [prevPropValue, setPrevPropValue] = useState(value);

  if (value !== prevPropValue) {
    setPrevPropValue(value);
    setLocalValue(value || "");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [localValue, value, onChange]);

  return (
    <div className="relative flex-1 min-w-[260px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        <FaMagnifyingGlass className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition"
      />
      {localValue && (
        <button
          type="button"
          onClick={() => {
            setLocalValue("");
            onChange("");
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition"
          aria-label="Clear search input"
        >
          <FaXmark className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
