import { useNavigate, useParams } from "react-router-dom";
import {
  createPreguntasRequest,
  deletePregunaRequest,
  getMyPreguntasRequest,
  getPreguntasRequest,
} from "../api/preguntas";
import { useEffect, useRef, useState } from "react";
import { HeaderPageTableQuestion } from "../components/HeaderPageTableQuestion";
import { QuestionsTable } from "../components/QuestionsTable";
import { Modal } from "../components/Modal";
import { useForm } from "react-hook-form";
import Label from "../components/utils/Label";
import Buttton from "../components/utils/Buttton";
import { toast } from "sonner";

import { AiFillSave, AiOutlineRollback } from "react-icons/ai";
import { createPreguntaRequest } from "../api/preguntas";

import { QuestionForm } from "../components/QuestionForm";
import { AlternativeForm } from "../components/AlternativeForm";
import { deleteAlternativaRequest } from "../api/alternativas";
import { useUserStore } from "../store/UserStore";

export const QuestionsPage = () => {
  const user = useUserStore((state) => state.user);
  console.log("user");
  console.log(user);

  const dataQuestion = useRef(null);
  const dataAlternative = useRef(null);
  const idPregunta = useRef(null);
  const navigate = useNavigate();
  const [showFormManyQuestions, setShowFormManyQuestions] = useState(false);
  const [showFormQuestion, setShowFormQuestion] = useState(false);
  const [showFormAlternative, setShowFormAlternative] = useState(false);

  const [results, setResults] = useState([]);
  const params = useParams();
  const onShowEditReading = () => {
    navigate(`/myreadings/${params.id}/edit`);
  };
  const onShowFormManyQuestions = (value) => {
    setShowFormManyQuestions(value);
  };
  const onShowFormAlternative = (value, data, id) => {
    // console.log(idPregunta);
    dataAlternative.current = data;
    idPregunta.current = id;
    // console.log(idPregunta.current);
    setShowFormAlternative(value);
  };
  const onShowFormQuestion = (value, data) => {
    dataQuestion.current = data;
    setShowFormQuestion(value);
  };
  const getMyQuestions = async () => {
    let dataF;
    if (user.rol !== "Usuario") {
      const { data } = await getPreguntasRequest(params.id);
      dataF = data;
    } else {
      const { data } = await getMyPreguntasRequest(params.id);
      dataF = data;
    }

    setResults(dataF);
  };
  useEffect(() => {
    getMyQuestions();
  }, []);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = handleSubmit((values) => {
    toast.promise(createPreguntasRequest(values, params.id), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        getMyQuestions();
        // getParrafos();
        reset();
        return <div>Preguntas y Alternativas Creadas Correctamente</div>;
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
  const handleDeleteQuestion = (_id) => {
    toast(`¿Está seguro que deseas eliminar la pregunta?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deletePregunaRequest(_id), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              getMyQuestions();
              return <div>Eliminado Correctamente</div>;
            },
            error: (error) => {
              const arregloError = error.response.data;
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

  const handleDeleteAlternative = (_id, idP) => {
    toast(`¿Está seguro que deseas eliminar la alternativa?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deleteAlternativaRequest(_id, idP), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              getMyQuestions();
              return <div>Eliminado Correctamente</div>;
            },
            error: (error) => {
              const arregloError = error.response.data;
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
  // console.log(results);
  // console.log(showFormManyQuestions);

  return (
    <>
      <div className="p-4 w-full">
        {/* <div className="text-white mb-.5"> Rol :{user.rol}</div> */}
        <HeaderPageTableQuestion
          onShowEditReading={onShowEditReading}
          onShowFormManyQuestions={onShowFormManyQuestions}
          onShowFormQuestion={onShowFormQuestion}
        />
        <QuestionsTable
          questions={results}
          onShowFormQuestion={onShowFormQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
          handleDeleteAlternative={handleDeleteAlternative}
          onShowFormAlternative={onShowFormAlternative}
        />
        <div
          className={`h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 fixed ${
            showFormManyQuestions ? "grid" : "hidden"
          } place-items-center p-2 `}
        >
          <Modal
            onShowForm={onShowFormManyQuestions}
            titleModal={"Crear Preguntas"}
            className={" max-w-2xl "}
          >
            <form onSubmit={onSubmit}>
              <Label htmlFor="contenido" className="dark:text-white mb-2">
                Contenido
              </Label>
              <textarea
                {...register("contenido")}
                id="contenido"
                rows="19"
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
          </Modal>
        </div>
        <div
          className={`h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 fixed ${
            showFormQuestion ? "grid" : "hidden"
          } place-items-center p-2 `}
        >
          <Modal
            onShowForm={onShowFormQuestion}
            titleModal={
              dataQuestion.current ? "Editar Pregunta" : "Crear Pregunta"
            }
            className={" max-w-lg"}
          >
            <QuestionForm
              onShowFormAlternative={onShowFormAlternative}
              getMyQuestions={getMyQuestions}
              dataQuestion={dataQuestion.current}
            />
          </Modal>
        </div>
        <div
          className={`h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 fixed ${
            showFormAlternative ? "grid" : "hidden"
          } place-items-center p-2 `}
        >
          <Modal
            onShowForm={onShowFormAlternative}
            titleModal={
              "Crear Alternativa"
              // dataQuestion.current ? "Editar Pregunta" : "Crear Pregunta"
            }
            className={"max-w-lg"}
          >
            <AlternativeForm
              getMyQuestions={getMyQuestions}
              dataAlternative={dataAlternative.current}
              idPregunta={idPregunta.current}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};
