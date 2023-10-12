import { useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../components/utils/Label";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiFillSave, AiOutlineRollback } from "react-icons/ai";
import Buttton from "../components/utils/Buttton";
import { toast } from "sonner";
import { createPreguntasRequest } from "../api/preguntas";

export const QuestionsPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = handleSubmit((values) => {
    toast.promise(createPreguntasRequest(values, params.id), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        // getParrafos();
        // reset();
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
  });
  return (
    <div className="px-4 pb-4 pt-7">
      <div className="flex justify-between items-center mb-4 gap-x-5">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Crear Pregunta{" "}
        </h3>
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
          rows="12"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Inserta aquí las preguntas y alternativas en casos sean de Eleccion Multiple:
          
          1. Pregunta
            a)Alternativa
            b)Alternativa          
            c)Alternativa          
            d)Alternativa          
            e)Alternativa          

          2. Pregunta
            a)Alternativa
            b)Alternativa          
            c)Alternativa          
            d)Alternativa          
            e)Alternativa  

          3. Pregunta ... 
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
    </div>
  );
};
