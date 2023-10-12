import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { API_URL } from "../config";

import { useNavigate } from "react-router-dom";
import { HeadTable } from "./HeadTable";
import { headTableReadings } from "../data/data";

export const ReadingsTable = ({
  readings,
  itemsToShow,
  handleShowMore,
  handleShowMoreInit,
  handleDeleteReading,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="  shadow-md sm:rounded-lg ">
        <div
          className="overflow-auto relative shadow-md sm:rounded-lg"
          style={{ height: "85vh" }}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <HeadTable data={headTableReadings} />
            {readings.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No hay Lecturas
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {readings.slice(0, itemsToShow).map((reading) => {
                  return (
                    <tr
                      key={reading._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-4 py-4 ">
                        <div className="flex items-center justify-center gap-x-2">
                          <button
                            onClick={() =>
                              navigate(`/myreadings/${reading._id}/edit`)
                            }
                          >
                            <BiEdit
                              size={18}
                              className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteReading(reading)}
                          >
                            <RiDeleteBin2Line
                              size={18}
                              className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                            />
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          {reading.titulo}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          {reading.grado}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          {reading.fuente}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          {reading.genero}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          {reading.nivelDifString}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 h-5 ">
        {itemsToShow < readings.length && (
          <button
            className="pt-1 hover:text-blue-400 border-b-2 border-white hover:border-b-2 hover:border-blue-400 px-2 font-medium text-white whitespace-nowrap dark:text-white"
            onClick={handleShowMore}
          >
            Cargar más Resultados
          </button>
        )}
        {itemsToShow > 35 && (
          <button
            className="pt-1 hover:text-blue-400 border-b-2 border-white hover:border-b-2 hover:border-blue-400 px-2 font-medium text-white whitespace-nowrap dark:text-white"
            onClick={handleShowMoreInit}
          >
            Reiniciar
          </button>
        )}
      </div>
    </>
  );
};
