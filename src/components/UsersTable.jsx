import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BUCKET } from "../config";

import { useUserStore } from "../store/UserStore";
import { useNavigate } from "react-router-dom";
import { HeadTable } from "./HeadTable";
import { headTableUsers } from "../data/data";

export const UsersTable = ({
  handleShowMore,
  handleShowMoreInit,
  users,
  itemsToShow,
  handleDeleteUser,
}) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { _id } = user;
  return (
    <>
      <div className=" shadow-md sm:rounded-lg  ">
        <div
          className="overflow-auto relative shadow-md sm:rounded-lg"
          style={{ height: "85vh" }}
        >
          <table className=" text-sm text-left w-full text-gray-500 dark:text-gray-400">
            <HeadTable data={headTableUsers} />
            <tbody>
              {users.slice(0, itemsToShow).map((user) => {
                return (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-2 py-4 ">
                      <div className="flex items-center justify-center gap-x-2">
                        <button
                          disabled={_id === user._id}
                          onClick={() => navigate(`/users/${user._id}/edit`)}
                        >
                          <BiEdit
                            size={18}
                            className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                          />
                        </button>
                        <button
                          disabled={_id === user._id}
                          type="button"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <RiDeleteBin2Line
                            size={18}
                            className={`dark:text-white  ${
                              _id !== user._id
                                ? "cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                                : "cursor-not-allowed"
                            }`}
                          />
                        </button>
                      </div>
                    </td>

                    <td
                      scope="row"
                      className="flex justify-start items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.fotoPerfil ? (
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`${BUCKET}/public/usuario/foto/${user.fotoPerfil}`}
                        />
                      ) : (
                        <BiSolidUserCircle className="w-10 h-10 rounded-full dark:bg-slate-500 text-gray-300" />
                      )}
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {user.nombreCompleto}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.correo}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.fechaNacimientoFormat}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.edad}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.dni}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.rol}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.generoSexo}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center ">
                        {user.numeroTelefonicoPersonal}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center ">
                        {user.verificado}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 h-5 ">
        {itemsToShow < users.length && (
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
