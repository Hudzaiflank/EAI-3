import React from "react";

function Navigation({ page, setPage, maxPage }) {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
      >
        ⬅️ Prev
      </button>
      <button
        onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
        disabled={page === maxPage}
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
      >
        Next ➡️
      </button>
    </div>
  );
}

export default Navigation;
