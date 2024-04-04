import { Link, useNavigate } from "react-router-dom";
import { headTableEstudiantes, headTableRefLecturas } from "../data/data";
import { HeadTable } from "./HeadTable";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

export const EstudiantesTable = ({
  data,
  handleShowMore,
  handleShowMoreInit,
  itemsToShow,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="overflow-auto relative shadow-md sm:rounded-lg"
        style={{ height: "85vh" }}
      >
        <table className=" text-sm text-left w-full text-gray-500 dark:text-gray-400">
          <HeadTable data={headTableEstudiantes} />
          <tbody>
            {data
              .slice(0, itemsToShow)
              .map(({ refUsuario: user, refLecturas: lects }, i) => {
                return (
                  <tr key={user._id}>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {i + 1}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center hover:text-sky-600">
                        <Link to={`/perfil/${user._id}`}>
                          {user.nombreCompleto}
                        </Link>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.fechaNacimientoFormat}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.aula}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {user.numeroTelefonicoPersonal}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center justify-center">
                        {lects.length > 0 && (
                          <table>
                            <HeadTable data={headTableRefLecturas} />
                            <tbody>
                              {lects.map((lect) => (
                                <tr
                                  key={lect._id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <td className="px-2 py-4 ">
                                    <div className="flex items-center justify-center gap-x-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          navigate(
                                            `/qualify/estado/${user._id}/${lect._id}`
                                          )
                                        }
                                      >
                                        <BiEdit
                                          size={18}
                                          className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                                        />
                                      </button>
                                      {/* <button
                                        type="button"
                                        onClick={() => {
                                          console.log(lect.idS);
                                        }}
                                      >
                                        <RiDeleteBin2Line
                                          size={18}
                                          className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                                        />
                                      </button> */}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4">
                                    <div className="flex items-center justify-center whitespace-pre-line">
                                      {lect.titulo}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4">
                                    <div className="flex items-center justify-center whitespace-pre-line">
                                      {lect.estado}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-2 h-5 ">
        {itemsToShow < data.length && (
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
