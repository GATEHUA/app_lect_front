import { useParams, useNavigate } from "react-router-dom";
import { ButtonTouch } from "../components/utils/ButtonTouch";
import { PiNotebookBold } from "react-icons/pi";
import { HiOutlineHome } from "react-icons/hi2";
import Label from "../components/utils/Label";
import {
  AiOutlineCloudUpload,
  AiOutlineClose,
  AiFillFilePdf,
} from "react-icons/ai";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductoFinal } from "../schemas/productF";
import { toast } from "sonner";
import {
  createProductoFinalRequest,
  getProductoFinalRequest,
} from "../api/productoFinal";
import { API_URL } from "../config";

export const ProductFinal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dataPF = useRef(null);
  const [audioEs, setAudioEs] = useState(null);
  const [archivoNameEs, setArchivoNameEs] = useState(null);

  function blobToFile(blob, fileName) {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }
  const getProductoFinal = async () => {
    const { data } = await getProductoFinalRequest(params.id);
    dataPF.current = data;
    setValue("texto", data.texto);
    setAudioEs(data.audio);
    setArchivoNameEs(data.archivo);
  };
  const addAudioElement = (blob, parentElement) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.id = parentElement.id + "Audio";
    audio.src = url;
    audio.controls = true;
    parentElement.appendChild(audio);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductoFinal),
    defaultValues: {
      texto: "",
      archivo: null,
      audio: null,
    },
  });
  //   { resolver: zodResolver(  ) }
  const onSubmit = handleSubmit((values) => {
    toast.promise(createProductoFinalRequest(values, params.id), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        removeAudioElement(
          document.getElementById("audioAudio"),
          document.getElementById("audio")
        );
        getProductoFinal();
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
  });
  const removeAudioElement = (audioElement, parentElement) => {
    if (
      parentElement &&
      audioElement &&
      audioElement.parentNode === parentElement
    ) {
      parentElement.removeChild(audioElement);
    }
  };
  useEffect(() => {
    removeAudioElement(
      document.getElementById("audioAudio"),
      document.getElementById("audio")
    );
    getProductoFinal();
  }, []);

  console.log(dataPF.current);
  console.log(audioEs);

  return (
    <div className="w-full min-h-screen h-full dark:bg-slate-800 dark:text-white font-Poppins overflow-auto">
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

        <div className=" fixed top-0 right-0 p-5">
          <ButtonTouch
            onClick={() => navigate(`/`)}
            initialTouchColor={"initialTouchColorIntermediate"}
            className={`w-full h-10 text-lg rounded-lg bg-[#1cb0f6] `}
          >
            <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
              <HiOutlineHome />
              <p className="hidden lg:block">Inicio</p>
            </div>
          </ButtonTouch>
        </div>
        <div className=" flex justify-center items-center min-h-screen h-full">
          <form onSubmit={onSubmit} className="w-full md:px-48 sm:px-8 px-4">
            <div className="text-center text-xl font-semibold pb-4">
              Ingrese su producto final (texto y audio opcionales, archivo en
              pdf)
            </div>
            <div>
              <Label htmlFor="texto" className="dark:text-white mb-2 w-full">
                Texto
              </Label>
              <textarea
                {...register("texto")}
                disabled={dataPF.current}
                id="texto"
                rows="5"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ingresa aquí el texto"
              />
              {errors.texto && (
                <span className="text-red-500">{errors.texto.message}</span>
              )}
            </div>
            <div className="pb-6 ">
              <div
                htmlFor="audio"
                className="dark:text-white mb-2 w-full block text-sm font-medium text-gray-900"
              >
                Audio
              </div>
              <div className="flex justify-center w-full space-x-2 ">
                {watch("audio") === null && audioEs === undefined && (
                  <AudioRecorder
                    onRecordingComplete={(blob) => {
                      setValue("audio", blobToFile(blob, "audioAudio.webm"));
                      addAudioElement(blob, document.getElementById("audio"));
                    }}
                    // audioTrackConstraints={{
                    //   noiseSuppression: true,
                    //   echoCancellation: true,
                    // }}
                    onNotAllowedOrFound={(err) => console.table(err)}
                    downloadOnSavePress={false}
                    downloadFileExtension="webm"
                    mediaRecorderOptions={{
                      audioBitsPerSecond: 128000,
                    }}
                    showVisualizer={true}
                  />
                )}
                <div id="audio">
                  {audioEs !== undefined &&
                    (audioEs === null ? (
                      <div>No se cargó un audio</div>
                    ) : (
                      <audio
                        src={`${API_URL}/public/lectura/audio/${audioEs}`}
                        controls
                      />
                    ))}
                </div>
                {/* {watch("audio") !== undefined && !dataPP.current && ( */}
                {watch("audio") !== null && !dataPF.current && (
                  <ButtonTouch
                    onClick={() => {
                      setValue("audio", null);
                      removeAudioElement(
                        document.getElementById("audioAudio"),
                        document.getElementById("audio")
                      );
                    }}
                    type="button"
                    initialTouchColor={"initialTouchColorBack"}
                    className={`w-auto h-10 text-lg rounded-lg bg-[#ff4b4b] `}
                  >
                    <div className="flex justify-center p-3 items-center hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                      <AiOutlineClose />
                    </div>
                  </ButtonTouch>
                )}
              </div>
              {errors.audio && watch("audio") === null && !dataPF.current && (
                <span className="text-red-500">{errors.audio.message}</span>
              )}
            </div>

            <div className="w-full">
              <div className="flex w-full space-x-7">
                <Label htmlFor="archivo" className="dark:text-white mb-2">
                  Archivo
                </Label>
                <div>
                  <div className="relative w-20">
                    <label htmlFor="archivo">
                      {watch("archivo")?.length === 1 && watch("archivo") ? (
                        <AiFillFilePdf className="w-20 h-24 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 rounded-lg text-red-500 bg-white" />
                      ) : archivoNameEs ? (
                        <AiFillFilePdf className="w-20 h-24 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 rounded-lg text-red-500 bg-white" />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-20 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AiOutlineCloudUpload className="w-9 h-9 mt-1 text-gray-500 dark:text-gray-400" />

                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                              <span className="font-semibold">
                                Cargue su archivo
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      <input
                        accept="application/pdf"
                        disabled={dataPF.current}
                        {...register("archivo")}
                        id="archivo"
                        type="file"
                        className="hidden"
                      />
                    </label>

                    {watch("archivo")?.length === 1 &&
                      watch("archivo") &&
                      !dataPF.current && (
                        <>
                          <div className="text-sm  w-[287%]">
                            {watch("archivo")[0].name}
                          </div>
                          <button
                            type="button"
                            className="top-[-7px] right-[-7px] absolute bg-red-600  
                  hover:bg-red-700 focus:ring-red-400 z-10 w-6 h-6 flex justify-center items-center rounded-md cursor-pointer text-white"
                            onClick={() => {
                              setValue("archivo", null);
                            }}
                          >
                            <AiOutlineClose />
                          </button>
                        </>
                      )}
                    {archivoNameEs && dataPF.current && (
                      <>
                        <div className="text-sm  w-[287%]">{archivoNameEs}</div>
                        <a
                          href={`${API_URL}/public/lectura/archivo/${archivoNameEs}`}
                          target="_blank"
                          className="hover:text-sky-500"
                        >
                          ver Archivo
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {errors.archivo && (
                <span className="text-red-500">{errors.archivo.message}</span>
              )}
            </div>
            {dataPF.current ? (
              <ButtonTouch
                type="button"
                initialTouchColor={"initialTouchColorBasic"}
                onClick={() => navigate(`/`)}
                className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7  bg-[#58cc02] mt-4 `}
              >
                <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                  <p>Ir a Inicio</p>
                </div>
              </ButtonTouch>
            ) : (
              <ButtonTouch
                initialTouchColor={"initialTouchColorBasic"}
                className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7  bg-[#58cc02] mt-4 `}
              >
                <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                  <p>Guardar Producto</p>
                </div>
              </ButtonTouch>
            )}
          </form>
        </div>
      </>
    </div>
  );
};
