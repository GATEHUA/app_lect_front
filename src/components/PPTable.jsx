import React from "react";
import { headTablePPQualy } from "../data/data";
import { HeadTable } from "./HeadTable";

import { PPtablePart } from "./PPtablePart";

export const PPTable = ({ data, handleUpdate, handleDelete }) => {
  console.log("data");

  console.log(data);
  return (
    <div
      className="overflow-auto relative shadow-md sm:rounded-lg px-4"
      style={{ height: "85vh" }}
    >
      <table className=" text-sm text-left w-full text-gray-500 dark:text-gray-400">
        <HeadTable data={headTablePPQualy} />
        <tbody>
          {data.map((v, i) => (
            <PPtablePart
              key={v._id}
              v={v}
              i={i}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
