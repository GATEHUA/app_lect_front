import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import { BUCKET } from "../config";

export const PPtablePart = ({ v, i, handleUpdate, handleDelete }) => {
  const [showEditPuntos, setShowEditPuntos] = useState(true);

  return (
    <tr key={v._id}>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">{i + 1}</div>
      </td>
      <td className="px-4 py-4 ">
        <div className="flex items-center justify-center gap-x-2">
          {showEditPuntos ? (
            <button type="button" onClick={() => setShowEditPuntos(false)}>
              <BiEdit
                size={18}
                className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
              />
            </button>
          ) : (
            <>
              <button
                type="button"
                // onClick={() => setShowEditPuntos(true)}

                onClick={() =>
                  handleUpdate(v._id, `inputPP_${v._id}`, setShowEditPuntos)
                }
              >
                <RxUpdate
                  size={18}
                  className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                />
              </button>
              <button
                type="button"
                onClick={() => setShowEditPuntos(true)}
                // onClick={() => {
                //   handleDeleteAlternative(value._id, question._id);
                // }}
              >
                <MdOutlineCancel
                  size={18}
                  className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                />
              </button>
            </>
          )}
          <button
            type="button"
            // onClick={() => {
            //   handleDeleteAlternative(value._id, question._id);
            // }}
            onClick={() => handleDelete(v._id)}
          >
            <RiDeleteBin2Line
              size={18}
              className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
            />
          </button>
        </div>
      </td>
      <td className="px-2 py-4">
        {showEditPuntos ? (
          <div className="flex items-center justify-center">{v.puntos}</div>
        ) : (
          <input
            defaultValue={v.puntos}
            id={`inputPP_${v._id}`}
            type="number"
            className={`  bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 `}
          />
        )}
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">
          {v.refParrafo.contenido}
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">
          <audio
            src={`${BUCKET}/public/lectura/leeOral/${v.leeOral}`}
            controls
            // className="w-24 h-12"
            style={{ width: "145px", height: "40px" }}
          />
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">
          <audio
            src={`${BUCKET}/public/lectura/explicaOral/${v.explicaOral}`}
            controls
            style={{ width: "145px", height: "40px" }}
          />
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">
          <audio
            src={`${BUCKET}/public/lectura/resumenOral/${v.resumenOral}`}
            controls
            style={{ width: "145px", height: "40px" }}
          />
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">
          <audio
            src={`${BUCKET}/public/lectura/fraseOral/${v.fraseOral}`}
            controls
            style={{ width: "145px", height: "40px" }}
          />
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">
          {v.resumenEscrito}
        </div>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-center">{v.frase}</div>
      </td>
    </tr>
  );
};
