import { useParams } from "react-router-dom";
import { QualyNavLayout } from "../layouts/QualyNavLayout";
import { getYouPreguntasRequest } from "../api/status";
import { useEffect, useState, useRef } from "react";
import { YPTable } from "../components/YPTable";
import { Modal } from "../components/Modal";
import { QuestionFormEditAdmin } from "../components/QuestionFormEditAdmin";
import { deletePregunaRequest } from "../api/preguntas";
import { toast } from "sonner";
import { AlternativeForm } from "../components/AlternativeForm";
import { deleteAlternativaRequest } from "../api/alternativas";
export const QualifyPersonallyYP = () => {
  const { idl, idu } = useParams();
  const [data, setData] = useState([]);
  const dataAlternative = useRef(null);
  const idPregunta = useRef(null);

  const [showformQuestion, setShowformQuestion] = useState(false);
  const dataQuestion = useRef(null);

  const [showFormAlternative, setShowFormAlternative] = useState(false);
  const onShowFormQuestion = (value, data) => {
    dataQuestion.current = data;
    setShowformQuestion(value);
  };

  const onShowFormAlternative = (value, data, id) => {
    // console.log(idPregunta);
    dataAlternative.current = data;
    idPregunta.current = id;
    // console.log(idPregunta.current);
    setShowFormAlternative(value);
  };

  const getYouPreguntas = async () => {
    const { data: dataYP } = await getYouPreguntasRequest(idl, idu);
    setData(dataYP);
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
              getYouPreguntas();
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
  const handleDeleteQuestion = (_id) => {
    toast(`¿Está seguro que deseas eliminar la pregunta del estudiante?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deletePregunaRequest(_id), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              getYouPreguntas();
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
  useEffect(() => {
    getYouPreguntas();
  }, []);

  return (
    <div>
      <QualyNavLayout idl={idl} idu={idu} />
      <YPTable
        data={data}
        onShowFormQuestion={onShowFormQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
        onShowFormAlternative={onShowFormAlternative}
        handleDeleteAlternative={handleDeleteAlternative}
      />
      <div
        className={`h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 fixed ${
          showformQuestion ? "grid" : "hidden"
        } place-items-center p-2 `}
      >
        <Modal
          onShowForm={onShowFormQuestion}
          titleModal={"Editar Pregunta"}
          className={" max-w-lg overflow-auto"}
        >
          <QuestionFormEditAdmin
            dataQuestion={dataQuestion.current}
            getMyQuestions={getYouPreguntas}
            onShowFormAlternative={onShowFormAlternative}
          />
          {/* <QuestionForm
              onShowFormAlternative={onShowFormAlternative}
              getMyQuestions={getMyQuestions}
              dataQuestion={dataQuestion.current}
            /> */}
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
          className={" max-w-lg"}
        >
          <AlternativeForm
            getMyQuestions={getYouPreguntas}
            dataAlternative={dataAlternative.current}
            idPregunta={idPregunta.current}
          />
        </Modal>
      </div>
    </div>
  );
};
