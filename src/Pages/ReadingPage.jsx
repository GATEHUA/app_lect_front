import { useNavigate, useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { MdMenu } from "react-icons/md";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { getLecturaMainRequest } from "../api/lecturas";
import { RiSwordLine } from "react-icons/ri";

import { useEffect, useRef, useState } from "react";
import { BiArrowBack, BiSolidUserCircle } from "react-icons/bi";
import { TbPlayerTrackNext } from "react-icons/tb";
import { AiOutlineZoomOut, AiOutlineZoomIn } from "react-icons/ai";

import {
  BsFillFileEarmarkPdfFill,
  BsFillFileRichtextFill,
  BsFileTextFill,
} from "react-icons/bs";

import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { AiFillProfile } from "react-icons/ai";

import { Document, Page } from "react-pdf";

import { BUCKET } from "../config";
import { Loading } from "../components/utils/Loading";
import { ButtonTouch } from "../components/utils/ButtonTouch";

export const ReadingPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  // const [pageA, setPageA] = useState(1);
  const [scale, setScale] = useState(1);

  const [option, setOption] = useState(1);

  const lectura = useRef({});

  const [cantPage, setCantPage] = useState(1);

  const getReading = async () => {
    const { data } = await getLecturaMainRequest(params.id);
    lectura.current = data;
    setLoading(false);
  };
  const onDocumentSucces = ({ numPages }) => {
    setCantPage(numPages);
  };
  console.log(lectura.current);
  useEffect(() => {
    getReading();
  }, []);
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const sidebarClass = isOpen ? "sidebar-openLect" : "sidebar-closedLect";

  return (
    <div className="dark:bg-slate-800 h-full min-h-[100vh] w-full font-Poppins dark:text-white">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex">
          <div className="sm:w-[75%] w-full max-h-screen overflow-auto">
            <div
              className={`py-10 sm:px-32 px-8 ${
                option === 4 ? "block" : "hidden"
              }`}
            >
              {lectura.current.lectura?.texto ? (
                <div>{HTMLReactParser(lectura.current.lectura.texto)}</div>
              ) : (
                <div className="flex justify-center pt-72">
                  No existe formato enriquecido
                </div>
              )}
            </div>
            <div
              className={`py-10 sm:px-32 px-8 ${
                option === 1 ? "block" : "hidden"
              } `}
            >
              <h1 className="flex justify-center mb-7 text-xl underline font-bold">
                {lectura.current.lectura.titulo}
              </h1>
              <div className="space-y-5">
                {lectura.current?.parrafos.length === 0 ? (
                  <div className="flex justify-center pt-[14.5rem]">
                    No existen parrafos para mostrar
                  </div>
                ) : (
                  lectura.current?.parrafos.map((v) => (
                    <div key={v._id} className="text-justify">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {v.contenido}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div
              className={`${option === 2 ? "block" : "hidden"} w-full h-full`}
            >
              {lectura.current.lectura.contenido ? (
                <iframe
                  className={`w-full h-full `}
                  src={`${BUCKET}/public/lectura/contenido/${lectura.current.lectura.contenido}`}
                />
              ) : (
                <div className="flex justify-center pt-[20.5rem]">
                  Hubo un errro al cargar el pdf
                </div>
              )}
            </div>
            <div
              className={`flex justify-center h-full max:h-[100vh] relative overflow-auto ${
                option === 3 ? "block" : "hidden"
              }`}
            >
              <Document
                onLoadSuccess={onDocumentSucces}
                error={
                  <div className="flex justify-center pt-[20.5rem]">
                    Hubo un errro al cargar el pdf
                  </div>
                }
                loading={"Cargando..."}
                className={`min-w-[37rem]`}
                file={`${BUCKET}/public/lectura/contenido/${lectura.current.lectura.contenido}`}
              >
                <div className="fixed top-0 left-0 z-10 space-x-1 mt-3 ml-3">
                  <button
                    className={`bg-[#1cb0f6] p-0.5 rounded-md ${
                      scale >= 4 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={scale >= 4}
                    onClick={() => {
                      if (scale >= 4) {
                        return;
                      }
                      setScale(scale + 0.5);
                    }}
                  >
                    <AiOutlineZoomIn size={25} />
                  </button>
                  <button
                    className={`bg-[#1cb0f6] p-0.5 rounded-md ${
                      scale <= 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={scale <= 1}
                    onClick={() => {
                      if (scale <= 1) {
                        return;
                      }
                      setScale(scale - 0.5);
                    }}
                  >
                    <AiOutlineZoomOut size={25} />
                  </button>
                </div>
                {Array(cantPage)
                  .fill()
                  .map((_, i) => (
                    <Page
                      key={i + 1}
                      pageNumber={i + 1}
                      // className={`mb-2 max-w-[37.7rem]`}
                      className={`mb-2`}
                      scale={scale}

                      // width={500}
                      // onClick={}
                    />
                  ))}
              </Document>
            </div>
          </div>

          <div
            className={`sm:w-[25%] z-[999999] dark:bg-slate-800 bg-slate-200 fixed sm:sticky overflow-hidden top-0 right-0 pt-4 pb-[1.375rem] px-3 sm:flex flex-col justify-between h-full min-h-[100vh] ${sidebarClass} `}
          >
            <ButtonTouch
              onClick={() => navigate("/")}
              initialTouchColor={"initialTouchColorBack"}
              className={`w-full h-10 text-lg rounded-lg bg-[#ff4b4b] `}
            >
              <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                <TbPlayerTrackNextFilled style={{ transform: "scaleX(-1)" }} />
                <p>Regresar</p>
              </div>
            </ButtonTouch>
            <div className="space-y-20 sm:mt-0 mt-4">
              <div className="space-y-7">
                <div className="text-lg font-semibold">Opciones</div>

                <div className="space-y-8">
                  <div className="w-full sm:flex space-x-2 hidden">
                    <ButtonTouch
                      onClick={() => setOption(2)}
                      initialTouchColor={"initialTouchColorBack"}
                      className={`w-1/2 h-10 text-base rounded-lg bg-[#ff4b4b] `}
                    >
                      <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                        <BsFillFileEarmarkPdfFill />
                        <p>PDF Clasico</p>
                      </div>
                    </ButtonTouch>
                    <ButtonTouch
                      onClick={() => setOption(3)}
                      initialTouchColor={"initialTouchColorBack"}
                      className={`w-1/2 h-10 text-base rounded-lg bg-[#ff4b4b] `}
                    >
                      <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                        <BsFillFileEarmarkPdfFill />
                        <p>PDF Minimalista</p>
                      </div>
                    </ButtonTouch>
                  </div>
                  <div className="w-full flex space-x-2">
                    <ButtonTouch
                      onClick={() => setOption(4)}
                      initialTouchColor={"initialTouchColorSky"}
                      className={`w-1/2 h-10 text-base rounded-lg bg-[#00cd9c] `}
                    >
                      <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                        <BsFillFileRichtextFill />
                        <p>Completo</p>
                      </div>
                    </ButtonTouch>
                    <ButtonTouch
                      onClick={() => setOption(1)}
                      initialTouchColor={"initialTouchColorSky"}
                      className={`w-1/2 h-10 text-base rounded-lg bg-[#00cd9c] `}
                    >
                      <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                        <BsFileTextFill />
                        <p>Por Parrafos</p>
                      </div>
                    </ButtonTouch>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="text-lg font-semibold ">Detalles</div>
                {lectura.current.lectura.refUsuario && (
                  <div className="flex">
                    <p className="w-1/4 font-medium">Autor </p>{" "}
                    <div className="w-3/4">
                      <p>
                        {lectura.current.lectura.refUsuario?.apellidoPaterno}
                        &nbsp;
                        {lectura.current.lectura.refUsuario?.apellidoMaterno}
                        ,&nbsp;
                        {lectura.current.lectura.refUsuario?.nombres}
                      </p>
                      {/* {lectura.current.lectura.refUsuario.fotoPerfil ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      draggable={false}
                      src={`${BUCKET}/public/usuario/foto/${lectura.current.lectura.refUsuario.fotoPerfil}`}
                    />
                  ) : (
                    <BiSolidUserCircle className="w-10 h-10 rounded-full dark:bg-slate-500 text-gray-300" />
                  )} */}
                    </div>
                  </div>
                )}
                <div className="flex">
                  <p className="w-1/4 font-medium">Titulo</p>{" "}
                  <p className="w-3/4">{lectura.current.lectura.titulo}</p>
                </div>
                <div className="flex">
                  <p className="w-1/4 font-medium">Grado </p>{" "}
                  <p className="w-3/4">{lectura.current.lectura.grado}</p>
                </div>
                {lectura.current.lectura.genero && (
                  <div className="flex">
                    <p className="w-1/4 font-medium">Genero</p>{" "}
                    <p className="w-3/4">{lectura.current.lectura.genero}</p>
                  </div>
                )}

                {lectura.current.lectura.fuente && (
                  <div className="flex">
                    <p className="w-1/4 font-medium">Fuente</p>{" "}
                    <p className="w-3/4">{lectura.current.lectura.fuente}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-5 sm:mt-0 mt-12">
              <ButtonTouch
                onClick={() => navigate(`/challengueRe/${params.id}`)}
                initialTouchColor={"initialTouchColorIntermediate"}
                className={`w-full h-10 text-lg rounded-lg bottom-0  bg-[#1cb0f6] `}
              >
                <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                  <p>Desafios</p>
                  <RiSwordLine />
                  {/* <BiArrowBack style={{ transform: "scaleX(-1)" }} /> */}
                </div>
              </ButtonTouch>
              <ButtonTouch
                onClick={() => navigate(`/paragraphs_reading/${params.id}`)}
                initialTouchColor={"initialTouchColorBasic"}
                className={`w-full h-10 text-lg rounded-lg bottom-0  bg-[#58cc02] `}
              >
                <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                  <p>Siguiente</p>
                  <TbPlayerTrackNextFilled />
                  {/* <BiArrowBack style={{ transform: "scaleX(-1)" }} /> */}
                </div>
              </ButtonTouch>
            </div>
          </div>

          {/* <div className="flex space-x-3 items-center mt-5">
            <button
              className="bg-blue-700 rounded-lg p-1 hover:bg-blue-800"
              onClick={() => setPageA(pageA - 1)}
            >
              Prev
            </button>
            <p>{pageA + "/ " + cantPage}</p>
            <button
              className="bg-blue-700 rounded-lg p-1 hover:bg-blue-800"
              onClick={() => setPageA(pageA + 1)}
            >
              Next
            </button>
          </div> */}
        </div>
      )}
      {isOpen ? (
        <button
          onClick={toggleSidebar}
          className="m-1 dark:hover:bg-slate-500 rounded-full right-0 p-1 dark:text-white block sm:hidden fixed top-0 cursor-pointer"
        >
          <MdMenu size={25} />
        </button>
      ) : (
        <div
          onClick={toggleSidebar}
          className={`sm:hidden fixed inset-0 max-h-screen z-[998] bg-[rgba(0,0,0,0.5)]`}
        ></div>
      )}
    </div>
  );
};
