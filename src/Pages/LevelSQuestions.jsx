import { useNavigate, useParams } from "react-router-dom";
import { getPreguntasRequest } from "../api/preguntas";
import { useRef, useEffect, useState } from "react";
import { PiNotebookBold } from "react-icons/pi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";

import { ButtonTouch } from "../components/utils/ButtonTouch";
import {
  createSepNivPreguntaRequest,
  getSepNivPreguntasRequest,
} from "../api/sepNivPreguntas";
import { toast } from "sonner";
import { getRespuestasRequest } from "../api/respuesta";
import { FaStar } from "react-icons/fa";
import Buttton from "../components/utils/Buttton";
export const LevelSQuestions = () => {
  const navigate = useNavigate();
  const [dataPr, setDataPr] = useState([]);
  const [noNivel, setNoNivel] = useState(false);
  const params = useParams();
  const dataRes = useRef([]);
  const initialLevelLabels = useRef(1);

  const drag = useRef(true);

  // const getRespuestas = async () => {
  //   const { data } = await getRespuestasRequest(params.id);
  //   if (data.length > 0) {
  //     setValue("contenido", data[currentQuestion]?.contenido);
  //   }
  //   setDataRes(data);
  // };

  // const getRespuestas = async () => {
  //   const { data } = await getRespuestaRequest(params.id);
  //   if (data.length > 0) {
  //     setValue("contenido", data[currentQuestion]?.contenido);
  //   }
  //   dataRes.current = data;
  // };
  const getPreguntas = async () => {
    const { data } = await getPreguntasRequest(params.id);
    const { data: dataR } = await getRespuestasRequest(params.id);
    const { data: dataSn } = await getSepNivPreguntasRequest(params.id);
    console.log("dataSn");

    console.log(dataSn);

    data.map((eP) => {
      const respuestaCorrespondiente = dataR.find(
        (eR) => eP._id === eR.refPregunta._id
      );
      const nivelCorrespondiente = dataSn.find(
        (eSn) => eP._id === eSn.refPregunta._id
      );

      if (respuestaCorrespondiente) {
        eP["contenidoRes"] = respuestaCorrespondiente.contenido;
        eP["estadoRes"] = respuestaCorrespondiente.estado;
        eP["puntosRes"] = respuestaCorrespondiente.puntos;
      }
      if (nivelCorrespondiente) {
        eP["nivelSep"] = nivelCorrespondiente.nivelSep;
        eP["estadoSep"] = nivelCorrespondiente.estadoSep;
        drag.current = false;
      } else {
        eP["nivelSep"] = null;
      }

      return eP;
    });

    const dataEn = data.map((d) => ({
      ...d,
      // nivelSep: null,
    }));
    setDataPr(dataEn);
  };
  console.log("dataPr");

  console.log(dataPr);

  useEffect(() => {
    getPreguntas();
  }, []);

  const getList = (nivelSep) => {
    return dataPr.filter((v) => v.nivelSep === nivelSep);
  };

  const startDrag = (e, item) => {
    e.dataTransfer.setData("itemId", item._id);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, nivelSep) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const item = dataPr.find((v) => v._id === itemId);
    item.nivelSep = nivelSep;
    const newState = dataPr.map((v) => {
      if (v._id === itemId) {
        return item;
      }
      return v;
    });
    setDataPr(newState);
  };

  const onTouchStart = (selectedItem) => {
    initialLevelLabels.current++;
    if (initialLevelLabels.current > 5) {
      initialLevelLabels.current = 1;
    }
    const itemId = selectedItem._id;
    const item = dataPr.find((v) => v._id === itemId);

    item.nivelSep = levelLabels[initialLevelLabels.current];

    const newState = dataPr.map((v) => {
      if (v._id === itemId) {
        return item;
      }
      return v;
    });

    setDataPr(newState);
  };
  const levelLabels = {
    1: null,
    2: "Creativo",
    3: "Crítico",
    4: "Literal",
    5: "Inferencial",
  };
  // const onTouchStart = () => {
  //   // Lógica para determinar el nuevo nivelSep al tocar
  //   const newNivelSep = determineNewNivelSep(item);

  //   // Actualiza el nivelSep en dataPr para el elemento tocado
  //   const newDataPr = dataPr.map((v) => {
  //     if (v._id === item._id) {
  //       return { ...v, nivelSep: newNivelSep };
  //     }
  //     return v;
  //   });

  //   // Actualiza el estado con el nuevo dataPr
  //   setDataPr(newDataPr);
  // };

  const levelLabelsColor = {
    1: "#1d4ed8",
    2: "bg-i",
    3: "bg-i2",
    4: "bg-i3",
    5: "bg-i4",
  };

  // const validationData = () => {
  //   const tieneNivelNulo = dataPr.some((v) => v.nivelSep == null);
  //   if (tieneNivelNulo) {
  //     setNoNivel(true);
  //   } else {
  //     setNoNivel(false);
  //   }
  //   if (!tieneNivelNulo) {
  //     const dataSumbmit = dataPr.map((v) => {
  //       const estadoSep = v.nivelSep === v.nivel ? "Correcto" : "Incorrecto";
  //       return { estadoSep, nivelSep: v.nivelSep, refPregunta: v._id };
  //     });
  //     console.log(dataSumbmit);
  //   }
  // };

  const validationData = () => {
    const tieneNivelNulo = dataPr.some((v) => v.nivelSep == null);
    setNoNivel(tieneNivelNulo);
    if (!tieneNivelNulo) {
      const dataSumbmit = dataPr.map((v) => ({
        estadoSep: v.nivelSep === v.nivel ? "Correcto" : "Incorrecto",
        puntosSep: v.nivelSep === v.nivel ? 10 : 0,
        nivelSep: v.nivelSep,
        refPregunta: v._id,
      }));

      toast.promise(createSepNivPreguntaRequest(dataSumbmit), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getPreguntas();
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
      });
    }
  };
  // console.log(drag.current);

  return (
    <>
      {/* <div id="estrella"></div> */}
      <div className=" fixed top-0 left-0 p-5">
        <ButtonTouch
          onClick={() => navigate(`/reading/${params.id}`)}
          initialTouchColor={"initialTouchColorBack"}
          className={`w-full h-10 text-white text-lg rounded-lg bg-[#ff4b4b] `}
        >
          <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
            <PiNotebookBold />
            <p className="hidden lg:block">Lectura</p>
          </div>
        </ButtonTouch>
      </div>
      <div className=" fixed top-0 right-0 p-5">
        <ButtonTouch
          onClick={() => navigate(`/create_question_u/${params.id}`)}
          initialTouchColor={"initialTouchColorIntermediate"}
          className={`w-full h-10 text-white text-lg rounded-lg bg-[#1cb0f6] `}
        >
          <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
            <AiFillQuestionCircle />
            <p className="hidden lg:block">Creación de Preguntas</p>
          </div>
        </ButtonTouch>
      </div>
      <div className="  w-full min-h-screen h-full dark:bg-slate-800 dark:text-white font-Poppins overflow-auto">
        <div className=" hidden md:flex  h-[84vh] mt-16 ">
          {getList(null).length > 0 && (
            <>
              <div
                className="w-1/3 flex flex-col p-4 overflow-auto space-y-3 bg-transparent border dark:border-white border-slate-400 m-4 rounded-lg"
                onDragOver={dragOver}
                onDrop={(e) => onDrop(e, null)}
              >
                <div>Sin Nivel</div>
                {getList(null).map((v) => (
                  <div
                    className="text-sm cursor-move z-[999999] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 p-1 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    key={v._id}
                    draggable
                    onDragStart={(e) => startDrag(e, v)}
                  >
                    <span>Pregunta:</span>

                    <textarea
                      value={v.contenido}
                      disabled
                      rows="3"
                      className="my-1 block cursor-move p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <span
                      className={`${
                        v.estadoRes == "Correcto"
                          ? "text-green-400"
                          : v.estadoRes == "Incorrecto"
                          ? "text-red-400"
                          : v.estadoRes == "No definido"
                          ? "text-sky-400"
                          : "text-orange-400"
                      }`}
                    >
                      {v.contenidoRes
                        ? `Respuesta: ${v.contenidoRes}`
                        : "Respuesta no proporcionada"}
                    </span>
                  </div>
                ))}
              </div>
              {noNivel && (
                <span className="text-red-500 font-bold flex justify-center items-center">
                  Todas las preguntas deben de tener un nivel
                </span>
              )}
            </>
          )}

          <div className="w-full md:grid grid-cols-2 gap-4 p-4 ">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                // id="estrella"
                className={` border dark:border-white border-slate-400 rounded-lg p-2 overflow-auto space-y-1 ${
                  levelLabelsColor[index + 2]
                }`}
                onDragOver={dragOver}
                onDrop={(e) => onDrop(e, levelLabels[index + 2])}
              >
                <div className="flex items-center justify-between text-slate-700">
                  <div>{`Nivel ${levelLabels[index + 2]}`}</div>
                  <FaStar />
                </div>
                {getList(levelLabels[index + 2]).map((v) => (
                  <div
                    className="text-sm cursor-move text-gray-900 bg-gray-50 rounded-lg border border-gray-300 p-1 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    key={v._id}
                    draggable={drag.current}
                    onDragStart={(e) => startDrag(e, v)}
                  >
                    <span>Pregunta:</span>
                    <textarea
                      value={v.contenido}
                      disabled
                      rows="3"
                      className="my-1 block cursor-move p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                    <span
                      className={`${
                        v.estadoRes == "Correcto"
                          ? "text-green-400"
                          : v.estadoRes == "Incorrecto"
                          ? "text-red-400"
                          : v.estadoRes == "No definido"
                          ? "text-sky-400"
                          : "text-orange-400"
                      }`}
                    >
                      {v.contenidoRes
                        ? `Respuesta: ${v.contenidoRes}`
                        : "Respuesta no proporcionada"}
                    </span>
                    {v.estadoSep && (
                      <div
                        className={`${
                          v.estadoSep == "Correcto"
                            ? "text-green-400"
                            : v.estadoSep == "Incorrecto"
                            ? "text-red-400"
                            : v.estadoSep == "No definido"
                            ? "text-sky-400"
                            : "text-orange-400"
                        }`}
                      >
                        Nivel: {v.estadoSep} ({v.nivel})
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden block text-white mt-20 px-4 space-y-3">
          {dataPr.map((v) => (
            <div
              // onTouchStart={(e) => {
              //   onTouchStart(e, v);
              // }}
              className={`text-sm cursor-move z-[999999] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 p-1 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
              key={v._id}
            >
              <span>Pregunta:</span>

              <textarea
                value={v.contenido}
                disabled
                rows="3"
                className="my-1 block cursor-move p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <span
                className={`${
                  v.estadoRes == "Correcto"
                    ? "text-green-400"
                    : v.estadoRes == "Incorrecto"
                    ? "text-red-400"
                    : v.estadoRes == "No definido"
                    ? "text-sky-400"
                    : "text-orange-400"
                }`}
              >
                {v.contenidoRes
                  ? `Respuesta: ${v.contenidoRes}`
                  : "Respuesta no proporcionada"}
              </span>

              {/* <div className="p-2">
              {v.nivelSep == null ? "Sin nivel" : v.nivelSep}
            </div> */}
              <Buttton
                className={`px-5 py-1.5 flex text-slate-700 ${
                  v.nivelSep == null
                    ? "bg-gray-300"
                    : v.nivelSep == "Creativo"
                    ? "bg-i"
                    : v.nivelSep == "Crítico"
                    ? "bg-i2"
                    : v.nivelSep == "Literal"
                    ? "bg-i3"
                    : "bg-i4"
                } my-4 w-full text-center justify-center items-center space-x-3 `}
                onClick={() => onTouchStart(v)}
                disabled={drag.current == false}
              >
                <p className="text-slate-700 font-bold">
                  {v.nivelSep == null ? "Sin nivel" : v.nivelSep}
                </p>
                <FaStar size={12} className="text-slate-700" />
              </Buttton>
            </div>
          ))}
        </div>
        {noNivel && (
          <span className="text-red-500 flex mt-2 font-bold md:hidden justify-center items-center">
            Todas las preguntas deben de tener un nivel
          </span>
        )}
        {drag.current == true && (
          <div className="flex justify-center my-4">
            <ButtonTouch
              onClick={validationData}
              initialTouchColor={"initialTouchColorBasic"}
              className={`w-[950%] h-10 text-lg rounded-lg bottom-0 mx-8 bg-[#58cc02]`}
            >
              <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                <p>Generar Estrella</p>
              </div>
            </ButtonTouch>
          </div>
        )}
      </div>
    </>
  );
};
