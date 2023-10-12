import React, { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import Buttton from "../utils/Buttton";
import { AiFillSave } from "react-icons/ai";

export const ToogleContenidoParrafo = ({
  value,
  index,
  handleDeleteParrafo,
  handleUpdateParrafo,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { contenido: value.contenido },
  });
  const [showEditPa, setShowEditPa] = useState(false);
  const onSubmit = handleSubmit(async (values) => {
    await handleUpdateParrafo(value._id, values);
    // setShowEditPa(!showEditPa);
  });

  return (
    <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex w-full">
      <div className=" px-4 w-[3%]  py-4 flex justify-start border-r dark:border-gray-700 items-center">
        {index + 1}
      </div>

      {showEditPa ? (
        <form onSubmit={onSubmit} className="w-[92%]">
          <textarea
            rows={3}
            {...register("contenido")}
            id="contenido"
            className="flex  justify-start items-center p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <div className="flex gap-x-2">
            <Buttton
              type="submit"
              className="text-sm px-3 py-1.5 font-medium bg-green-600 my-1
        hover:bg-green-700 focus:ring-green-400 flex items-center  justify-center gap-x-1"
            >
              <AiFillSave />
              Actualizar
            </Buttton>
            <Buttton
              type="button"
              onClick={() => setShowEditPa(!showEditPa)}
              className="text-sm px-3 py-1.5 font-medium bg-red-600 my-1
        hover:bg-red-700 focus:ring-red-400 flex items-center  justify-center gap-x-1"
            >
              Ocultar
            </Buttton>
          </div>
        </form>
      ) : (
        <div className="flex w-[92%] justify-start items-center px-4 py-4 text-gray-900 dark:text-white">
          {value.contenido}
        </div>
      )}

      <div className=" px-4 w-[5%] py-4 flex flex-col justify-center gap-3 border-l dark:border-gray-700 items-center">
        <button onClick={() => setShowEditPa(!showEditPa)}>
          {showEditPa ? (
            <AiOutlineClose
              size={18}
              className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
            />
          ) : (
            <BiEdit
              size={18}
              className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
            />
          )}
        </button>
        <button type="button" onClick={() => handleDeleteParrafo(value._id)}>
          <RiDeleteBin2Line
            size={18}
            className={`dark:text-white  
     "cursor-pointer dark:hover:text-red-500 hover:text-red-500"
        
        `}
          />
        </button>
      </div>
    </div>
  );
};
