import { useNavigate, useParams } from "react-router-dom";

import {
  getPreguntasRequest,
  getMyPreguntasChallengueUserRequest,
} from "../api/preguntas";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { MdNavigateNext } from "react-icons/md";
import { ButtonTouch } from "../components/utils/ButtonTouch";
import { PiNotebookBold } from "react-icons/pi";
import { IoIosCreate } from "react-icons/io";

import { Loading } from "../components/utils/Loading";
import { Alternativa } from "../components/minicomponentes/Alternativa";
import { useForm } from "react-hook-form";
import {
  createRespuestaRequest,
  getRespuestasRequest,
  getRespuestasChallengueRequest,
} from "../api/respuesta";
import { toast } from "sonner";
import { playCorrectSound, playIncorrectSound } from "../helpers/soundP";

const getBackgroundColor = (response, alternative) => {
  if (response == null) {
    return "transparent";
  }
  if (alternative.estado === "Correcto" && response.contenidoRes) {
    return "#54c202";
  }

  if (alternative.contenido === response.contenidoRes) {
    return "#f24747";
  }
};

export const QuestionxAnswer = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const dataPr = useRef([]);
  const [dataRes, setDataRes] = useState([]);

  const params = useParams();
  const getPreguntas = async () => {
    let dataR;
    if (params.uid) {
      const { data } = await getMyPreguntasChallengueUserRequest(
        params.id,
        params.uid
      );
      dataR = data;
    } else {
      const { data } = await getPreguntasRequest(params.id);
      dataR = data;
    }
    dataPr.current = dataR;
    console.log(dataR);
    setLoading(false);
  };
  const getRespuestas = async () => {
    let dataR;
    if (params.uid) {
      const { data } = await getRespuestasChallengueRequest(
        params.id,
        params.uid
      );
      if (data.length > 0) {
        setValue("contenido", data[currentQuestion]?.contenido);
      }
      dataR = data;
    } else {
      const { data } = await getRespuestasRequest(params.id);
      if (data.length > 0) {
        setValue("contenido", data[currentQuestion]?.contenido);
      }
      dataR = data;
    }
    console.log("respuestas");

    console.log(dataR);
    setDataRes(dataR);
  };

  useEffect(() => {
    getRespuestas();
    getPreguntas();
  }, []);

  const goNextPregunta = () => {
    if (currentQuestion < dataPr.current.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setValue("contenido", preguntasCRes[currentQuestion + 1]?.contenidoRes);
    } else {
      if (params.uid) {
        navigate(`/challengueRe/${params.id}`);
      } else {
        navigate(`/separation_question/${params.id}`);
      }
    }
  };
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    const found = dataPr.current[currentQuestion].refAlternativas.find(
      (e) => e.contenido === values.contenido
    );
    const content = {
      contenido: values.contenido,
      puntos:
        found?.estado !== "Incorrecto"
          ? dataPr.current[currentQuestion].puntobaserespuesta
          : 0,
      estado: found?.estado || "No definido",
    };

    toast.promise(
      createRespuestaRequest(dataPr.current[currentQuestion]._id, content),
      {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getRespuestas();
          const found = dataPr.current[currentQuestion].refAlternativas.find(
            (e) => e.contenido == watch("contenido")
          );
          if (!found || found.estado === "Correcto") {
            playCorrectSound();
            confetti();
          } else {
            playIncorrectSound();
          }
          return <div>Datos almacenados correctamente</div>;
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
      }
    );
  });

  let preguntasCRes = dataPr.current.map((eP) => {
    const respuestaCorrespondiente = dataRes.find(
      (eR) => eP._id === eR.refPregunta._id
    );

    if (respuestaCorrespondiente) {
      eP["contenidoRes"] = respuestaCorrespondiente.contenido;
      eP["estadoRes"] = respuestaCorrespondiente.estado;
      eP["puntosRes"] = respuestaCorrespondiente.puntos;
    }

    return eP;
  });

  return (
    <div className="dark:bg-slate-800 dark:text-white w-full h-full min-h-screen font-Poppins">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className=" fixed top-0 left-0 p-5">
            <ButtonTouch
              onClick={() => navigate(`/reading/${params.id}`)}
              initialTouchColor={"initialTouchColorBack"}
              className={`w-full h-10 text-lg rounded-lg bg-[#ff4b4b] `}
            >
              <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                <PiNotebookBold />
                <p className="hidden lg:block">Lectura</p>
              </div>
            </ButtonTouch>
          </div>
          {!params.uid && (
            <div className=" fixed top-0 right-0 p-5">
              <ButtonTouch
                onClick={() => navigate(`/separation_question/${params.id}`)}
                initialTouchColor={"initialTouchColorIntermediate"}
                className={`w-full h-10 text-lg rounded-lg bg-[#1cb0f6] `}
              >
                <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                  <IoIosCreate />
                  <p className="hidden lg:block">Estrella Preguntona</p>
                </div>
              </ButtonTouch>
            </div>
          )}
          {dataPr.current.length === 0 ? (
            <div className="w-full pt-32 flex justify-center items-center">
              No hay Preguntas para mostrar
            </div>
          ) : (
            <div className="flex flex-col items-center text-justify  p-2 lg:pt-20  pb-12 md:p-0 pt-20 overflow-auto">
              <div className="w-[67%] mx-32 h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700 relative ">
                <div
                  className="h-4 pt-0.5 pb-1 px-2 bg-[#58cc02] rounded-full "
                  style={{
                    width: `${
                      ((currentQuestion + 1) / dataPr.current.length) * 100
                    }%`,
                  }}
                >
                  <div className=" w-full bg-[#79d635] h-1.5" />
                </div>
              </div>
              <div className="flex p-3 justify-center space-x-4 items-center relative">
                <ButtonTouch
                  type="button"
                  disabled={currentQuestion === 0}
                  initialTouchColor={"initialTouchColorIntermediate"}
                  className={`p-1 rounded-lg bg-[#1cb0f6]  ${
                    currentQuestion === 0
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1);
                    setValue(
                      "contenido",
                      preguntasCRes[currentQuestion - 1]?.contenidoRes
                    );
                  }}
                >
                  <MdNavigateNext
                    size={30}
                    style={{ transform: "scaleX(-1)" }}
                  />
                </ButtonTouch>

                <div>
                  {currentQuestion + 1} / {dataPr.current.length}
                </div>

                <ButtonTouch
                  onClick={goNextPregunta}
                  disabled={currentQuestion >= dataPr.current.length - 1}
                  initialTouchColor={"initialTouchColorIntermediate"}
                  className={`p-1 rounded-lg bg-[#1cb0f6]  ${
                    currentQuestion >= dataPr.current.length - 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <MdNavigateNext size={30} />
                </ButtonTouch>
              </div>
              <div className="md:w-[60%] w-full p-2 md:p-0 mt-2 text-justify whitespace-pre-line text-lg font-medium">
                {dataPr.current[currentQuestion].contenido}
              </div>
              <div className="md:w-[60%] w-full p-2 md:p-0 mt-5">
                <form onSubmit={onSubmit}>
                  {dataPr.current[currentQuestion].refAlternativas.length !==
                  0 ? (
                    <ul className="space-y-4">
                      {dataPr.current[currentQuestion].refAlternativas.map(
                        (val) => (
                          <Alternativa
                            key={val._id}
                            val={val}
                            disabled={
                              preguntasCRes[currentQuestion].contenidoRes !=
                              null
                            }
                            {...register("contenido")}
                            stylo={{
                              background: getBackgroundColor(
                                preguntasCRes[currentQuestion],
                                val
                              ),
                            }}
                          />
                        )
                      )}
                    </ul>
                  ) : (
                    <textarea
                      value={watch("contenido")}
                      onChange={(e) => setValue("contenido", e.target.value)}
                      disabled={
                        preguntasCRes[currentQuestion].contenidoRes != null
                      }
                      rows="13"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Ingresa aquí el resumen del párrafo"
                    />
                  )}

                  {preguntasCRes[currentQuestion].contenidoRes == null ? (
                    <ButtonTouch
                      disabled={!watch("contenido")}
                      initialTouchColor={
                        watch("contenido") && "initialTouchColorBasic"
                      }
                      className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7 mt-8 ${
                        !watch("contenido")
                          ? "cursor-not-allowed bg-[#37464f] text-[#52656d]"
                          : "bg-[#58cc02]"
                      }`}
                    >
                      <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                        <p>Comprobar</p>
                      </div>
                    </ButtonTouch>
                  ) : (
                    <ButtonTouch
                      type="button"
                      onClick={goNextPregunta}
                      initialTouchColor={"initialTouchColorBasic"}
                      className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7 mt-8 bg-[#58cc02]`}
                    >
                      <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                        <p>Continuar</p>
                      </div>
                    </ButtonTouch>
                  )}
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// <div className="md:w-[60%] w-full p-2 md:p-0 mt-5">
// {dataPr.current[currentQuestion].refAlternativas.length != 0 ? (
//   <form onSubmit={onSubmit}>
//     <ul className="space-y-4">
//       {dataPr.current[currentQuestion].refAlternativas.map(
//         (val) => {
//           return (
//             <Alternativa
//               key={val._id}
//               val={val}
//               {...register("contenido")}
//             />
//           );
//         }
//       )}
//     </ul>
//     {/* <button>zxcad</button> */}
//     <ButtonTouch
//       disabled={!watch("contenido")}
//       initialTouchColor={
//         watch("contenido") && "initialTouchColorBasic"
//       }
//       className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7 mt-8 ${
//         !watch("contenido")
//           ? "cursor-not-allowed bg-[#37464f] text-[#52656d]"
//           : "bg-[#58cc02]"
//       }`}
//     >
//       <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
//         <p>Guardar y Siguiente</p>
//       </div>
//     </ButtonTouch>
//   </form>
// ) : (
//   <form onSubmit={onSubmit}>
//     <textarea
//       {...register("contenido")}
//       // disabled={dataPP.current}
//       // id="resumenEscrito"
//       rows="13"
//       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       placeholder="Ingresa aquí el resumen del parrafo"
//     />
//     <ButtonTouch
//       disabled={!watch("contenido")}
//       initialTouchColor={
//         watch("contenido") && "initialTouchColorBasic"
//       }
//       className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7 mt-8 ${
//         !watch("contenido")
//           ? "cursor-not-allowed bg-[#37464f] text-[#52656d]"
//           : "bg-[#58cc02]"
//       }`}
//     >
//       <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
//         <p>Guardar y Siguiente</p>
//       </div>
//     </ButtonTouch>
//   </form>
// )}
// </div>
