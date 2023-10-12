import { useNavigate, useParams } from "react-router-dom";
import Label from "../components/utils/Label";
import { useForm } from "react-hook-form";
import Buttton from "../components/utils/Buttton";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiFillSave, AiOutlineRollback } from "react-icons/ai";

import {
  createParrafosRequest,
  deleteParrafoRequest,
  getParrafosRequest,
  updateParrafoRequest,
} from "../api/parrafos";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ToogleContenidoParrafo } from "../components/minicomponentes/ToogleContenidoParrafo";

export const ParrafosPage = () => {
  const navigate = useNavigate();
  const [parrafos, setParrafos] = useState([]);
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    toast.promise(createParrafosRequest(values, params.id), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        getParrafos();
        reset();
        return <div>Lectura Creada Correctamente</div>;
      },
      error: (error) => {
        const arregloError = error.response.data;
        return arregloError.map((e) => (
          <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
        ));
      },
    });
  });

  const handleUpdateParrafo = (_id, values) => {
    toast.promise(updateParrafoRequest(_id, values), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        getParrafos();
        return <div>Actualizado Correctamente</div>;
      },
      error: (error) => {
        const arregloError = error.response.data;
        return arregloError.map((e) => (
          <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
        ));
      },
    });
  };
  const getParrafos = async () => {
    const { data } = await getParrafosRequest(params.id);
    setParrafos(data);
  };
  useEffect(() => {
    getParrafos();
  }, []);

  const handleDeleteParrafo = (_id) => {
    toast(`¿Está seguro que deseas eliminar el Parrafo?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deleteParrafoRequest(_id), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              getParrafos(params.id);
              return <div>Eliminado Correctamente</div>;
            },
            error: (error) => {
              let arregloError = [];
              if (error.response.data.message) {
                // arregloError = [error.response.data.message];
                arregloError.push(error.response.data.message);
                // return arregloError.map((e) => (
                //   <div key={e}>{`${
                //     arregloError.length > 1 ? "•" : ""
                //   }${e}`}</div>
                // ));
              } else {
                arregloError = error.response.data;
              }

              return arregloError.map((e) => (
                <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
              ));
            },
          });
        },
      },
      duration: Infinity,
    });
  };

  return (
    <div className="px-4 pb-4 pt-7">
      <div className="flex justify-between items-center mb-4 gap-x-5">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Crear Parrrafo{" "}
        </h3>
        {params.id && (
          <Buttton
            onClick={() => navigate(`/myreadings/${params.id}/question/new`)}
            className={`text-lg px-3 py-1.5 font-medium flex justify-center items-center gap-x-1 bg-green-600  
        hover:bg-green-700 focus:ring-green-400
        `}
          >
            <IoIosAddCircle size={18} />
            <p>Preguntas</p>
            <AiFillQuestionCircle size={18} />
          </Buttton>
        )}

        <Buttton
          onClick={() => navigate(`/myreadings/${params.id}/edit`)}
          className={`text-lg px-5 sm:py-1.5 py-2.5 font-medium flex justify-center items-center gap-x-2 bg-sky-600  
        hover:bg-sky-700 focus:ring-sky-400
        `}
        >
          <p className="hidden sm:block ">Editar Lectura</p>
          <AiOutlineRollback size={18} />
        </Buttton>
      </div>
      <form onSubmit={onSubmit}>
        <Label htmlFor="contenido" className="dark:text-white mb-2">
          Contenido
        </Label>
        <textarea
          {...register("contenido")}
          id="contenido"
          rows="8"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Inserta aquí el contenido:
          
          Parrafo
          
          Parrafo

          Parrafo...
          `}
        />
        <Buttton
          type="submit"
          className={`text-lg px-5 py-1.5 font-medium bg-blue-600 my-4 
        hover:bg-blue-700 focus:ring-blue-400 flex items-center  justify-center gap-x-2
        `}
        >
          <AiFillSave />
          Guardar
        </Buttton>
      </form>
      <div>
        <div className="dark:text-white  my-2">Parrafos:</div>
        <div className="border dark:border-gray-700 rounded-sm">
          {parrafos.length === 0 && (
            <div className="flex justify-center items-center h-80">
              No hay Parrafos
            </div>
          )}
          {parrafos.map((value, index) => (
            <ToogleContenidoParrafo
              key={value._id}
              value={value}
              index={index}
              handleUpdateParrafo={handleUpdateParrafo}
              handleDeleteParrafo={handleDeleteParrafo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
