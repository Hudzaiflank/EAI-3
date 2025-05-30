import React from "react";

function PageHeader({ page, subtitle }) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-2 text-center text-fuchsia-400">
        Halaman {page}
      </h1>
      <p className="text-gray-400 text-center mb-6">{subtitle}</p>
    </>
  );
}

export default PageHeader;
