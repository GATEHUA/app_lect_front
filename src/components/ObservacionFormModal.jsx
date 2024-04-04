import Label from "./utils/Label";
import Buttton from "./utils/Buttton";
import { AiFillSave } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  createObservacionRequest,
  updateObservacionRequest,
} from "../api/observaciones";
import { toast } from "sonner";
import { useEffect } from "react";
import { useUserStore } from "../store/UserStore";

export const ObservacionFormModal = ({
  refStatus,
  dataObservacion,
  getStatus,
}) => {
  //     contenidoD
  // seccion
  // estado
  // comentarioAl
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (dataObservacion) {
      setValue("contenidoD", dataObservacion.contenidoD);
      setValue("seccion", dataObservacion.seccion);
      setValue("estado", dataObservacion.estado);
      setValue("comentarioAl", dataObservacion.comentarioAl);
    } else {
      setValue("contenidoD", "");
      setValue("seccion", "Parrafos");
      setValue("estado", "Pendiente");
      setValue("comentarioAl", "");
    }
  }, [dataObservacion]);

  const onSubmit = handleSubmit((values) => {
    if (dataObservacion) {
      toast.promise(updateObservacionRequest(dataObservacion._id, values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getStatus();

          return <div>Observacion Actualizada Correctamente</div>;
        },
        error: (error) => {
          let arregloError = [];
          if (error.response.data.message) {
            arregloError.push(error.response.data.message);
          } else {
            arregloError = error.response.data;
          }
          return arregloError.map((e) => (
            <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
          ));
        },
      });
    } else {
      toast.promise(createObservacionRequest(refStatus, values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getStatus();
          // getMyQuestions();
          setValue("contenidoD", "");
          setValue("seccion", "Parrafos");
          setValue("estado", "Pendiente");
          setValue("comentarioAl", "");

          return <div>Observacion Creada Correctamente</div>;
        },
        error: (error) => {
          let arregloError = [];
          if (error.response.data.message) {
            arregloError.push(error.response.data.message);
          } else {
            arregloError = error.response.data;
          }
          return arregloError.map((e) => (
            <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
          ));
        },
      });
    }
  });
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-2">
        <div>
          <Label htmlFor="contenidoD" className="dark:text-white mb-2">
            Contenido
          </Label>
          <textarea
            disabled={user.rol == "Usuario"}
            {...register("contenidoD")}
            id="contenidoD"
            rows="2"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Inserta aquí el contenidoD de la pregunta"
          />
          {errors.contenidoD && (
            <span className="text-red-500">{errors.contenidoD.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="seccion" className="dark:text-white mb-2">
            Sección
          </Label>
          <select
            disabled={user.rol == "Usuario"}
            id="seccion"
            className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
            {...register("seccion")}
          >
            <option value="Parrafos">Parrafos</option>
            <option value="Respuestas">Respuestas</option>
            <option value="Clasificación por niveles">
              Clasificación por niveles
            </option>
            <option value="Preguntas creadas">Preguntas creadas</option>
            <option value="Producto final">Producto final</option>
          </select>
          {errors.seccion && (
            <span className="text-red-500">{errors.seccion.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="estado" className="dark:text-white mb-2">
            Estado
          </Label>
          <select
            id="estado"
            className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
            {...register("estado")}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            {user.rol != "Usuario" && (
              <option value="Subsanado">Subsanado</option>
            )}
          </select>
          {errors.estado && (
            <span className="text-red-500">{errors.estado.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="comentarioAl" className="dark:text-white mb-2">
            Comentario del Alumno
          </Label>
          <textarea
            {...register("comentarioAl")}
            id="comentarioAl"
            rows="2"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Inserta aquí el comentarioAl de la pregunta"
          />
          {errors.comentarioAl && (
            <span className="text-red-500">{errors.comentarioAl.message}</span>
          )}
        </div>
        <div className="flex justify-center">
          <Buttton
            type="submit"
            className="text-lg px-5 py-1.5 font-medium bg-blue-600 my-4 hover:bg-blue-700 focus:ring-blue-400 flex items-center  justify-center gap-x-2"
          >
            <AiFillSave />
            Guardar
          </Buttton>
        </div>
      </form>
    </div>
  );
};
