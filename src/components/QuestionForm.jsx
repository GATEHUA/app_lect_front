import { useForm } from "react-hook-form";
import Buttton from "./utils/Buttton";
import InputText from "./utils/InputText";
import Label from "./utils/Label";
import { AiFillSave } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";

import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuestionSchema } from "../schemas/question";
import { createPreguntaRequest, updatePregunaRequest } from "../api/preguntas";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/UserStore";

export const QuestionForm = ({
  getMyQuestions,
  dataQuestion,
  onShowFormAlternative,
}) => {
  const user = useUserStore((state) => state.user);
  const params = useParams();
  const defSchema = useRef({
    resolver: zodResolver(createQuestionSchema),
  });
  useEffect(() => {
    if (dataQuestion) {
      setValue("contenido", dataQuestion.contenido);
      setValue("esquema", dataQuestion.esquema);
      setValue("criterio", dataQuestion.criterio);
      setValue("tipo", dataQuestion.tipo);
      setValue("nivel", dataQuestion.nivel);

      setValue("puntobaserespuesta", dataQuestion.puntobaserespuesta);
    } else {
      setValue("contenido", "");
      setValue("esquema", "");
      setValue("criterio", "");
      setValue("tipo", "Abierta");
      setValue("nivel", "Literal");
      if (user.rol == "Usuario") {
        setValue("puntobaserespuesta", 5);
      } else {
        setValue("puntobaserespuesta", null);
      }
    }
  }, [dataQuestion]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm(defSchema.current);

  const onSubmit = handleSubmit((values) => {
    if (dataQuestion) {
      toast.promise(updatePregunaRequest(dataQuestion._id, values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getMyQuestions();
          return <div>Pregunta Actualizada Correctamente</div>;
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
      toast.promise(createPreguntaRequest(values, params.id), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getMyQuestions();
          setValue("contenido", "");
          setValue("esquema", "");
          setValue("criterio", "");
          setValue("tipo", "Abierta");
          setValue("nivel", "Literal");
          if (user.rol == "Usuario") {
            setValue("puntobaserespuesta", 5);
          } else {
            setValue("puntobaserespuesta", null);
          }
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
            <Label htmlFor="esquema" className="dark:text-white mb-2">
              Esquema
            </Label>
            <textarea
              {...register("esquema")}
              id="esquema"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Inserta aquí el esquema de la pregunta"
            />
            {errors.esquema && (
              <span className="text-red-500">{errors.esquema.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="criterio" className="dark:text-white mb-2">
              Criterio
            </Label>
            <textarea
              {...register("criterio")}
              id="criterio"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Inserta aquí el criterio de la pregunta"
            />
            {errors.criterio && (
              <span className="text-red-500">{errors.criterio.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="contenido" className="dark:text-white mb-2">
              Pregunta
            </Label>
            <textarea
              {...register("contenido")}
              id="contenido"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Inserta aquí la pregunta"
            />
            {errors.contenido && (
              <span className="text-red-500">{errors.contenido.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="tipo" className="dark:text-white mb-2">
              Tipo
            </Label>
            <select
              id="tipo"
              className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
              {...register("tipo")}
            >
              <option value="Abierta">Abierta</option>
              <option value="Eleccion Multiple">Eleccion Multiple</option>
            </select>
            {errors.tipo && (
              <span className="text-red-500">{errors.tipo.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="nivel" className="dark:text-white mb-2">
              Nivel
            </Label>
            <select
              id="nivel"
              className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
              {...register("nivel")}
            >
              <option value="Literal">Literal</option>
              <option value="Crítico">Crítico</option>
              <option value="Inferencial">Inferencial</option>
              <option value="Creativo">Creativo</option>
            </select>
            {errors.nivel && (
              <span className="text-red-500">{errors.nivel.message}</span>
            )}
          </div>
          <div>
            <Label
              htmlFor="puntobaserespuesta"
              className="dark:text-white mb-2"
            >
              Puntos por Respuesta Correcta
            </Label>
            <InputText
              {...register("puntobaserespuesta", { valueAsNumber: true })}
              disabled={user.rol == "Usuario"}
              type="number"
              message={errors.puntobaserespuesta?.message}
              id="puntobaserespuesta"
              placeholder="Pnts."
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
      {dataQuestion && (
        <div className="flex justify-center">
          <Buttton
            onClick={() => onShowFormAlternative(true, null, dataQuestion._id)}
            type="button"
            className="text-lg px-5 py-1.5 font-medium bg-green-600 my-4 hover:bg-green-700 focus:ring-green-400 flex items-center  justify-center gap-x-2"
          >
            <IoIosAddCircle size={18} />
            Alternativa
          </Buttton>
        </div>
      )}
    </div>
  );
};
