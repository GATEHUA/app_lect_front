import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";

import Buttton from "../components/utils/Buttton";
import { AiFillQuestionCircle, AiOutlineRollback } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Label from "../components/utils/Label";
import InputText from "../components/utils/InputText";
import { useForm } from "react-hook-form";

import { AiFillFilePdf } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReadingSchema, updateReadingSchema } from "../schemas/reading";
import { toast } from "sonner";
import { IoIosAddCircle } from "react-icons/io";
import { API_URL } from "../config";

import {
  createLecturaRequest,
  getLecturaRequest,
  updateLecturaRequest,
} from "../api/lecturas";
import { useNavigate, useParams } from "react-router-dom";

export const ReadingForm = () => {
  const editor = useRef(null);

  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();
  const tituloOr = useRef(null);
  const params = useParams();
  const defSchema = useRef({
    resolver: zodResolver(createReadingSchema),
    defaultValues: {
      grado: "1° de Secundaria",
      nivelDificultad: 1,
      contenido: null,
      numpreguntasal: 5,
    },
  });
  const getReading = async (id) => {
    const { data } = await getLecturaRequest(id);
    console.log("data");
    console.log(data);
    console.log("data.texto");
    console.log(data.texto);

    setValue("grado", data.grado);
    tituloOr.current = data.titulo;
    setValue("titulo", data.titulo);
    setValue("fuente", data.fuente);
    setValue("genero", data.genero);
    setValue("texto", data.texto);
    setValue("numpreguntasal", data.numpreguntasal);
    setValue("nivelDificultad", data.nivelDificultad);
    setFileName(data.contenido);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm(defSchema.current);

  const handleClear = () => {
    setValue("contenido", null);
  };
  const handleEditorBlurJodit = (content) => {
    setValue("texto", content);
  };
  console.log(watch("texto"));
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    if (values.titulo === tituloOr.current) {
      values.titulo = null;
    }
    if (params.id) {
      toast.promise(updateLecturaRequest(params.id, values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          handleClear();
          getReading(params.id);
          return <div>Lectura Actualizada Correctamente</div>;
        },
        error: (error) => {
          const arregloError = error.response.data;
          return arregloError.map((e) => (
            <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
          ));
        },
      });
    } else {
      toast.promise(createLecturaRequest(values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: (response) => {
          // console.log(response.data._id);
          navigate(`/myreadings/${response.data._id}/paragraph/new`);
          // reset({
          //   grado: "1° de Secundaria",
          //   nivelDificultad: 1,
          //   contenido: null,
          //   titulo: "",
          //   fuente: "",
          //   genero: "",
          // });
          return <div>Lectura Creada Correctamente</div>;
        },
        error: (error) => {
          const arregloError = error.response.data;
          return arregloError.map((e) => (
            <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
          ));
        },
      });
    }
  });
  useEffect(() => {
    if (params.id) {
      getReading(params.id);
      defSchema.current = {
        resolver: zodResolver(updateReadingSchema),
      };
    } else {
      defSchema.current = {
        defaultValues: {
          generoSexo: "Hombre",
          estaVerificado: "false",
          rol: "Usuario",
        },
        resolver: zodResolver(createReadingSchema),
      };
    }
  }, []);

  return (
    <div className=" h-full w-full">
      <div className="">
        <div className="px-7 py-7 lg:px-8 h-full">
          <div className="flex justify-between items-center mb-4 gap-x-5">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {params.id ? "Editar Lectura" : "Crear Lectura"}
            </h3>
            {params.id && (
              <div className="flex space-x-2">
                <Buttton
                  onClick={() =>
                    navigate(`/myreadings/${params.id}/paragraph/new`)
                  }
                  className={`text-lg px-5 py-1.5 font-medium flex justify-center items-center gap-x-2 bg-green-600  
        hover:bg-green-700 focus:ring-green-400
        `}
                >
                  <IoIosAddCircle size={18} />
                  <p>Parrafos</p>
                </Buttton>
                <Buttton
                  onClick={() =>
                    navigate(`/myreadings/${params.id}/question/new`)
                  }
                  className={`text-lg px-3 py-1.5 font-medium flex justify-center items-center gap-x-1 bg-green-600  
          hover:bg-green-700 focus:ring-green-400
          `}
                >
                  <IoIosAddCircle size={18} />
                  <p>Preguntas</p>
                  <AiFillQuestionCircle size={18} />
                </Buttton>
              </div>
            )}
            <Buttton
              onClick={() => navigate("/myreadings")}
              className={`text-lg px-5 sm:py-1.5 py-2.5 font-medium flex justify-center items-center gap-x-2 bg-red-600  
        hover:bg-red-700 focus:ring-red-400
        `}
            >
              <p className="hidden sm:block ">Regresar</p>
              <AiOutlineRollback size={18} />
            </Buttton>
          </div>
          <form
            className="space-y-5"
            onSubmit={onSubmit}
            // encType="multipart/form-data"
          >
            <div>
              <Label htmlFor="nombres" className="dark:text-white mb-2">
                Titulo
              </Label>
              <InputText
                {...register("titulo")}
                message={errors.titulo?.message}
                id="titulo"
                placeholder="Titulo"
                className="p-1"
              />
            </div>
            <div>
              <Label htmlFor="fuente" className="dark:text-white mb-2">
                Fuente
              </Label>
              <InputText
                {...register("fuente")}
                message={errors.fuente?.message}
                id="fuente"
                placeholder="Fuente"
                className="p-1"
              />
            </div>
            <div>
              <Label htmlFor="grado" className="dark:text-white mb-2">
                Grado
              </Label>

              <InputText
                type="text"
                {...register("grado")}
                message={errors.grado?.message}
                placeholder="Grado"
                id="grado"
                className="p-1"
                list="listgrado"
              />
              <datalist id="listgrado" className="hidden">
                <option value="1° de Primaria" />
                <option value="2° de Primaria" />
                <option value="3° de Primaria" />
                <option value="4° de Primaria" />
                <option value="5° de Primaria" />
                <option value="6° de Primaria" />
                <option value="1° de Secundaria" />
                <option value="2° de Secundaria" />
                <option value="3° de Secundaria" />
                <option value="4° de Secundaria" />
                <option value="5° de Secundaria" />
              </datalist>
            </div>
            <div>
              <Label htmlFor="genero" className="dark:text-white mb-2">
                Genero
              </Label>
              <InputText
                {...register("genero")}
                message={errors.genero?.message}
                id="genero"
                placeholder="Genero"
                className="p-1"
              />
            </div>
            <div>
              <Label htmlFor="nivelDificultad" className="dark:text-white mb-2">
                Nivel de Dificultad
              </Label>

              <select
                id="nivelDificultad"
                className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
                {...register("nivelDificultad", { valueAsNumber: true })}
              >
                <option value={1}>Basico</option>
                <option value={2}>Intermedio</option>
                <option value={3}>Avanzado</option>
              </select>
              {errors.nivelDificultad && (
                <span className="text-red-500">
                  {errors.nivelDificultad.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="numpreguntasal" className="dark:text-white mb-2">
                Limite de Preguntas para el Alumno
              </Label>
              <InputText
                {...register("numpreguntasal", {
                  valueAsNumber: true,
                })}
                message={errors.numpreguntasal?.message}
                type="number"
                id="numpreguntasal"
                placeholder="N° de Preguntas"
                className="p-1"
              />
            </div>
            <div className="w-full">
              <div className="flex w-full space-x-7">
                <Label htmlFor="contenido" className="dark:text-white mb-2">
                  Contenido
                </Label>
                <div>
                  <div className="relative w-20">
                    <label htmlFor="contenido">
                      {watch("contenido")?.length === 1 &&
                      watch("contenido") ? (
                        <AiFillFilePdf className="w-20 h-24 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 rounded-lg text-red-500 bg-white" />
                      ) : fileName ? (
                        <AiFillFilePdf className="w-20 h-24 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 rounded-lg text-red-500 bg-white" />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-20 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AiOutlineCloudUpload className="w-9 h-9 mt-1 text-gray-500 dark:text-gray-400" />

                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                              <span className="font-semibold">
                                Cargue su lectura
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      <input
                        accept="application/pdf"
                        {...register("contenido")}
                        id="contenido"
                        type="file"
                        className="hidden"
                      />
                    </label>

                    {watch("contenido")?.length === 1 && watch("contenido") && (
                      <>
                        <div className="text-sm  w-[287%]">
                          {watch("contenido")[0].name}
                        </div>
                        <button
                          type="button"
                          className="top-[-7px] right-[-7px] absolute bg-red-600  
                  hover:bg-red-700 focus:ring-red-400 z-10 w-6 h-6 flex justify-center items-center rounded-md cursor-pointer text-white"
                          onClick={handleClear}
                        >
                          <AiOutlineClose />
                        </button>
                      </>
                    )}
                    {fileName && !watch("contenido") && (
                      <>
                        <div className="text-sm  w-[287%]">{fileName}</div>
                        <a
                          href={`${API_URL}/public/lectura/contenido/${fileName}`}
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
              {errors.contenido && (
                <span className="text-red-500">{errors.contenido.message}</span>
              )}
            </div>
            <div className="w-full bg-slate-800 text-black">
              <JoditEditor
                // config={{
                //   language: "es",
                // }}
                onBlur={handleEditorBlurJodit}
                value={watch("texto")}
                ref={editor}
              />
              {errors.texto && (
                <span className="text-red-500">{errors.texto.message}</span>
              )}
            </div>

            <div className="flex justify-center items-center">
              <Buttton
                type="submit"
                className={`text-lg px-5 py-1.5 font-medium bg-blue-600  
        hover:bg-blue-700 focus:ring-blue-400 flex items-center  justify-center gap-x-2
        `}
              >
                <AiFillSave />
                Guardar
              </Buttton>
            </div>
          </form>
        </div>
      </div>

      {/* <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre> */}
    </div>
  );
};
