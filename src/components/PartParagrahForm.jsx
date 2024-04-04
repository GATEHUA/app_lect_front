import Label from "./utils/Label";
import { AiOutlineClose } from "react-icons/ai";

import { AudioRecorder } from "react-audio-voice-recorder";
import { useForm } from "react-hook-form";
import { ButtonTouch } from "./utils/ButtonTouch";
import {
  createPartParrafoRequest,
  getPartParrafoRequest,
} from "../api/partParrafo";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPartParrafoSchema } from "../schemas/partParrafo";
import { useEffect, useRef, useState } from "react";
import { BUCKET } from "../config";

export const PartParagrahForm = ({ refParrafo, goNextParrafo }) => {
  // console.log("refParrafo");

  // console.log(refParrafo);
  const [disableRegisterB, setDisableRegisterB] = useState(false);

  const [leeOralEs, setLeeOralEs] = useState(null);
  const [explicaOralEs, setExplicaOralEs] = useState(null);
  const [resumenOralEs, setResumenOralEs] = useState(null);
  const [fraseOralEs, setFraseOralEs] = useState(null);

  const dataPP = useRef(null);
  function blobToFile(blob, fileName) {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }
  const addAudioElement = (blob, parentElement) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.id = parentElement.id + "Audio";
    audio.src = url;
    audio.controls = true;
    parentElement.appendChild(audio);
  };
  const getPartParrafo = async () => {
    const { data } = await getPartParrafoRequest(refParrafo);
    dataPP.current = data;
    if (data) {
      // console.log(dataPP.current);
      setValue("resumenEscrito", data.resumenEscrito);
      setValue("frase", data.frase);
      setLeeOralEs(data.leeOral);
      setExplicaOralEs(data.explicaOral);
      setResumenOralEs(data.resumenOral);
      setFraseOralEs(data.fraseOral);
    } else {
      setValue("resumenEscrito", "");
      setValue("frase", "");
      setValue("leeOral", undefined);
      setValue("explicaOral", undefined);
      setValue("resumenOral", undefined);
      setValue("fraseOral", undefined);
      setLeeOralEs(null);
      setExplicaOralEs(null);
      setResumenOralEs(null);
      setFraseOralEs(null);
    }
  };
  useEffect(() => {
    removeAudioElement(
      document.getElementById("leeOralAudio"),
      document.getElementById("leeOral")
    );
    removeAudioElement(
      document.getElementById("explicaOralAudio"),
      document.getElementById("explicaOral")
    );
    removeAudioElement(
      document.getElementById("resumenOralAudio"),
      document.getElementById("resumenOral")
    );
    removeAudioElement(
      document.getElementById("fraseOralAudio"),
      document.getElementById("fraseOral")
    );
    getPartParrafo();
  }, [refParrafo]);

  const removeAudioElement = (audioElement, parentElement) => {
    if (
      parentElement &&
      audioElement &&
      audioElement.parentNode === parentElement
    ) {
      parentElement.removeChild(audioElement);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createPartParrafoSchema) });
  // console.log(errors);
  // console.log("refParrafo");
  // console.log(refParrafo);
  // console.log(dataPP.current);

  const onSubmit = handleSubmit((values) => {
    setDisableRegisterB(true);
    // console.log("values2");
    // console.log(values);
    toast.promise(createPartParrafoRequest(values, refParrafo), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        setDisableRegisterB(false);
        goNextParrafo();
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
  return (
    <div className="w-full lg:px-72 px-4">
      <form onSubmit={onSubmit}>
        <div className=" md:flex justify-between w-full ">
          <div className="md:w-1/2  pb-6 md:border-r-2 md:pr-6">
            <div className="dark:text-white mb-2 w-full block text-sm font-medium text-gray-900">
              Lea el Parrafo (Grabelo)
            </div>
            <div className="flex justify-center w-full space-x-2">
              {watch("leeOral") === undefined && leeOralEs === null && (
                <AudioRecorder
                  onRecordingComplete={(blob) => {
                    setValue("leeOral", blobToFile(blob, "leeOralAudio.webm"));
                    addAudioElement(blob, document.getElementById("leeOral"));
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
              <div id="leeOral">
                {leeOralEs !== null && (
                  <audio
                    src={`${BUCKET}/public/lectura/leeOral/${leeOralEs}`}
                    controls
                  />
                )}
              </div>
              {watch("leeOral") !== undefined && !dataPP.current && (
                <ButtonTouch
                  type="button"
                  initialTouchColor={"initialTouchColorBack"}
                  className={`w-auto h-10 text-lg rounded-lg bg-[#ff4b4b] `}
                  onClick={() => {
                    setValue("leeOral", undefined);
                    removeAudioElement(
                      document.getElementById("leeOralAudio"),
                      document.getElementById("leeOral")
                    );
                  }}
                >
                  <div className="flex justify-center items-center p-3 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                    <AiOutlineClose />
                  </div>
                </ButtonTouch>
              )}
            </div>
            {errors.leeOral &&
              watch("leeOral") === undefined &&
              !dataPP.current && (
                <span className="text-red-500">{errors.leeOral.message}</span>
              )}
          </div>
          <div className="md:w-1/2  pb-6 md:pl-6">
            <div
              //   htmlFor="explicaOral"
              className="dark:text-white mb-2 w-full block text-sm font-medium text-gray-900"
            >
              Explique el Parrafo (Grabelo)
            </div>
            <div className="flex justify-center w-full space-x-2 ">
              {watch("explicaOral") === undefined && explicaOralEs === null && (
                <AudioRecorder
                  onRecordingComplete={(blob) => {
                    setValue(
                      "explicaOral",
                      blobToFile(blob, "explicaOralAudio.webm")
                    );
                    addAudioElement(
                      blob,
                      document.getElementById("explicaOral")
                    );
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
              <div id="explicaOral">
                {explicaOralEs !== null && (
                  <audio
                    src={`${BUCKET}/public/lectura/explicaOral/${explicaOralEs}`}
                    controls
                  />
                )}
              </div>
              {watch("explicaOral") !== undefined && !dataPP.current && (
                <ButtonTouch
                  onClick={() => {
                    setValue("explicaOral", undefined);
                    removeAudioElement(
                      document.getElementById("explicaOralAudio"),
                      document.getElementById("explicaOral")
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
            {errors.explicaOral &&
              watch("explicaOral") === undefined &&
              !dataPP.current && (
                <span className="text-red-500">
                  {errors.explicaOral.message}
                </span>
              )}
          </div>
        </div>

        <div className=" md:flex justify-between w-full md:border-t-2 ">
          <div className="md:w-1/2  pb-6 pt-6 md:border-r-2 md:pr-6">
            <div className="dark:text-white mb-2 w-full block text-sm font-medium text-gray-900">
              Resumen Oral (Grabelo)
            </div>
            <div className="flex justify-center w-full space-x-2">
              {watch("resumenOral") === undefined && resumenOralEs === null && (
                <AudioRecorder
                  onRecordingComplete={(blob) => {
                    setValue(
                      "resumenOral",
                      blobToFile(blob, "resumenOralAudio.webm")
                    );
                    addAudioElement(
                      blob,
                      document.getElementById("resumenOral")
                    );
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
              <div id="resumenOral">
                {resumenOralEs !== null && (
                  <audio
                    src={`${BUCKET}/public/lectura/resumenOral/${resumenOralEs}`}
                    controls
                  />
                )}
              </div>
              {watch("resumenOral") !== undefined && !dataPP.current && (
                <ButtonTouch
                  type="button"
                  initialTouchColor={"initialTouchColorBack"}
                  className={`w-auto h-10 text-lg rounded-lg bg-[#ff4b4b] `}
                  onClick={() => {
                    setValue("resumenOral", undefined);
                    removeAudioElement(
                      document.getElementById("resumenOralAudio"),
                      document.getElementById("resumenOral")
                    );
                  }}
                >
                  <div className="flex justify-center items-center p-3 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                    <AiOutlineClose />
                  </div>
                </ButtonTouch>
              )}
            </div>
            {errors.resumenOral &&
              watch("resumenOral") === undefined &&
              !dataPP.current && (
                <span className="text-red-500">
                  {errors.resumenOral.message}
                </span>
              )}
          </div>
          <div className="md:w-1/2  pb-6 pt-6 md:pl-6">
            <div
              //   htmlFor="fraseOral"
              className="dark:text-white mb-2 w-full block text-sm font-medium text-gray-900"
            >
              Frase Oral (Grabelo)
            </div>
            <div className="flex justify-center w-full space-x-2 ">
              {watch("fraseOral") === undefined && fraseOralEs === null && (
                <AudioRecorder
                  onRecordingComplete={(blob) => {
                    setValue(
                      "fraseOral",
                      blobToFile(blob, "fraseOralAudio.webm")
                    );
                    addAudioElement(blob, document.getElementById("fraseOral"));
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
              <div id="fraseOral">
                {fraseOralEs !== null && (
                  <audio
                    src={`${BUCKET}/public/lectura/fraseOral/${fraseOralEs}`}
                    controls
                  />
                )}
              </div>
              {watch("fraseOral") !== undefined && !dataPP.current && (
                <ButtonTouch
                  onClick={() => {
                    setValue("fraseOral", undefined);
                    removeAudioElement(
                      document.getElementById("fraseOralAudio"),
                      document.getElementById("fraseOral")
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
            {errors.fraseOral &&
              watch("fraseOral") === undefined &&
              !dataPP.current && (
                <span className="text-red-500">{errors.fraseOral.message}</span>
              )}
          </div>
        </div>

        <div className=" md:flex justify-between w-full md:border-t-2   ">
          <div className="md:w-1/2 md:border-r-2 pt-6 md:pr-6">
            <Label
              htmlFor="resumenEscrito"
              className="dark:text-white mb-2 w-full"
            >
              Resumen
            </Label>
            <textarea
              {...register("resumenEscrito")}
              disabled={dataPP.current}
              id="resumenEscrito"
              rows="5"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingresa aquí el resumen del parrafo"
            />
            {errors.resumenEscrito && !dataPP.current && (
              <span className="text-red-500">
                {errors.resumenEscrito.message}
              </span>
            )}
          </div>
          <div className="md:w-1/2 pt-6 md:pl-6">
            <Label htmlFor="frase" className="dark:text-white mb-2 w-full">
              Frase
            </Label>
            <textarea
              {...register("frase")}
              disabled={dataPP.current}
              id="frase"
              rows="5"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingresa aquí la frase del parrafo"
            />
            {errors.frase && !dataPP.current && (
              <span className="text-red-500">{errors.frase.message}</span>
            )}
          </div>
        </div>
        {!dataPP.current && (
          <ButtonTouch
            initialTouchColor={"initialTouchColorBasic"}
            className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7  bg-[#58cc02] mt-4 ${
              disableRegisterB ? "cursor-not-allowed " : "cursor-pointer"
            }`}
            disabled={disableRegisterB}
          >
            <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
              <p>Guardar y Siguiente</p>
            </div>
          </ButtonTouch>
        )}
      </form>
    </div>
  );
};
