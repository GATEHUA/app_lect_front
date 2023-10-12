import { useForm } from "react-hook-form";
import Buttton from "./utils/Buttton";
import InputText from "./utils/InputText";
import Label from "./utils/Label";
import { AiFillSave } from "react-icons/ai";
import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAlternativaRequest,
  updateAlternativaRequest,
} from "../api/alternativas";
import { toast } from "sonner";
import { createAlternativeSchema } from "../schemas/alternative";

export const AlternativeForm = ({
  getMyQuestions,
  dataAlternative,
  idPregunta,
}) => {
  const defSchema = useRef({
    resolver: zodResolver(createAlternativeSchema),
  });
  useEffect(() => {
    if (dataAlternative) {
      setValue("contenido", dataAlternative.contenido);
      setValue("estado", dataAlternative.estado);
      setValue("feedback", dataAlternative.feedback);
    } else {
      setValue("contenido", "");
      setValue("estado", "Incorrecto");
      setValue("feedback", "");
    }
  }, [dataAlternative]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm(defSchema.current);

  const onSubmit = handleSubmit((values) => {
    if (dataAlternative) {
      toast.promise(updateAlternativaRequest(dataAlternative._id, values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getMyQuestions();
          reset();
          return <div>Pregunta Creada Correctamente</div>;
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
      toast.promise(createAlternativaRequest(idPregunta, values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getMyQuestions();
          reset();
          return <div>Pregunta Creada Correctamente</div>;
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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-2">
          <div>
            <Label htmlFor="contenido" className="dark:text-white mb-2">
              Alternativa
            </Label>
            <InputText
              {...register("contenido")}
              message={errors.contenido?.message}
              id="contenido"
              placeholder="Alternativa"
              className="p-1"
            />
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
              <option value="Incorrecto">Incorrecto</option>
              <option value="Correcto">Correcto</option>
            </select>
            {errors.estado && (
              <span className="text-red-500">{errors.tipo.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="feedback" className="dark:text-white mb-2">
              Puntos por Respuesta Correcta
            </Label>
            <InputText
              {...register("feedback")}
              message={errors.feedback?.message}
              id="feedback"
              placeholder="Mensaje"
              className="p-1"
            />
          </div>
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
