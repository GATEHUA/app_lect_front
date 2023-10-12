import React from "react";

export const HeadTable = ({ data }) => {
  return (
    <thead className="">
      <tr className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {data.map((val) => (
          <th key={val} scope="col" className="px-4 py-3">
            <div className="flex justify-center items-center">{val}</div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
