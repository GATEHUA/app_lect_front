import { HeadTable } from "./HeadTable";
import { headTableObs } from "../data/data";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useUserStore } from "../store/UserStore";

export const ObsTable = ({
  data,
  handleDeleteObservacion,
  refStatus,
  onShowFormObservacion,
}) => {
  const user = useUserStore((state) => state.user);

  return (
    <div
      className="overflow-auto relative shadow-md sm:rounded-lg px-4"
      style={{ height: "85vh" }}
    >
      <table className=" text-sm text-left w-full text-gray-500 dark:text-gray-400">
        <HeadTable data={headTableObs} />
        <tbody>
          {data.map((v, i) => (
            <tr key={v._id}>
              <td className="px-4 py-4 ">
                <div className="flex items-center justify-center gap-x-2">
                  <button
                    type="button"
                    onClick={() => onShowFormObservacion(true, v)}
                  >
                    <BiEdit
                      size={18}
                      className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                    />
                  </button>
                  {user.rol != "Usuario" && (
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteObservacion(v._id, refStatus);
                      }}
                    >
                      <RiDeleteBin2Line
                        size={18}
                        className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                      />
                    </button>
                  )}
                </div>
              </td>
              <td className="px-2 py-4">
                <div className="flex items-center justify-center">
                  {v.contenidoD}
                </div>
              </td>
              <td className="px-2 py-4">
                <div className="flex items-center justify-center">
                  {v.seccion}
                </div>
              </td>
              <td className="px-2 py-4">
                <div className="flex items-center justify-center">
                  {v.estado}
                </div>
              </td>
              <td className="px-2 py-4">
                <div className="flex items-center justify-center">
                  {v.comentarioAl}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
