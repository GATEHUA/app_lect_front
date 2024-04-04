import { useParams } from "react-router-dom";
// import Buttton from "./utils/Buttton";
import Buttton from "../components/utils/Buttton";
import HTMLReactParser from "html-react-parser";

import { QualyNavLayout } from "../layouts/QualyNavLayout";
import { getProductoFinalRequest } from "../api/status";
import { useEffect, useState } from "react";
import Label from "../components/utils/Label";
import { BUCKET } from "../config";
import {
  deleteProductoFinalQueryRequest,
  updateProductoFinalPuntosQueryRequest,
} from "../api/productoFinal";
import { toast } from "sonner";

export const QualifyPersonallyPF = () => {
  const { idl, idu } = useParams();
  const [data, setData] = useState({});
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const getProductoFinal = async () => {
    const { data: dataPF } = await getProductoFinalRequest(idl, idu);

    setData(dataPF);
  };
  console.log("dataPF");
  console.log(data);

  useEffect(() => {
    getProductoFinal();
  }, []);

  const handleUpdate = () => {
    setIsInputDisabled(true);

    const inputElement = document.getElementById("myInput"); // Obtén el campo de entrada por su ID
    let inputValue;
    if (inputElement) {
      inputValue = inputElement.value;
    }
    console.log("Valor del campo de entrada:", inputValue);

    toast.promise(
      updateProductoFinalPuntosQueryRequest(data._id, { puntos: inputValue }),
      {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getProductoFinal();
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
      }
    );
  };

  const handleDelete = () => {
    toast(`¿Está seguro que deseas eliminar su producto final?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deleteProductoFinalQueryRequest(data._id), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              // getProductoFinal();
              setData({});
              return <div>Eliminado Correctamente</div>;
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
        },
      },
      duration: Infinity,
    });
  };
  return (
    <div>
      <QualyNavLayout idl={idl} idu={idu} />
      {Object.keys(data).length === 0 ? (
        <div>No existe producto final</div>
      ) : (
        <div className="space-y-7 p-7">
          <div>
            <Label htmlFor="texto" className="dark:text-white mb-2 w-full">
              Texto o enlace de video
            </Label>
            <textarea
              value={data?.texto}
              disabled
              id="texto"
              rows="5"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="No ingreso texto"
            />
          </div>
          <div className="pb-6 ">
            <div
              htmlFor="audio"
              className="dark:text-white mb-2 w-full block text-sm font-medium text-gray-900"
            >
              Audio
            </div>
            <div className="flex justify-center w-full space-x-2 ">
              <div id="audio">
                {data.audio !== undefined &&
                  (data.audio === null ? (
                    <div>No se cargó un audio</div>
                  ) : (
                    <audio
                      src={`${BUCKET}/public/lectura/audio/${data.audio}`}
                      controls
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex w-full space-x-7">
              <Label htmlFor="archivo" className="dark:text-white mb-2">
                Archivo
              </Label>
              <div>
                <div className="relative ">
                  {data.archivo && (
                    <>
                      <div className="text-sm  w-[287%]">{data.archivo}</div>
                      <a
                        href={`${BUCKET}/public/lectura/archivo/${data.archivo}`}
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
          </div>
          <div className="w-full">
            <div className="w-full space-x-7">
              <Label htmlFor="archivo" className="dark:text-white mb-2">
                Texto Enriquecido
              </Label>
              <div>
                <div className="relative ">
                  {data.textoEnri ? (
                    <div>{HTMLReactParser(data.textoEnri)}</div>
                  ) : (
                    <div className="flex justify-center pt-2">
                      No existe formato enriquecido
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex w-full space-x-7">
              <Label htmlFor="archivo" className="dark:text-white mb-2">
                Puntos
              </Label>
              <div>
                {isInputDisabled ? (
                  <div>{data.puntos}</div>
                ) : (
                  <input
                    defaultValue={data.puntos}
                    id="myInput"
                    type="number"
                    className={`  bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 `}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center space-x-5">
            {isInputDisabled ? (
              <Buttton
                onClick={() => setIsInputDisabled(false)}
                className={`text-lg px-5 py-2 sm:py-1.5 font-medium flex justify-center items-center gap-x-2 bg-green-600  
          hover:bg-green-700 focus:ring-green-400
          `}
              >
                <p className="hidden sm:block">Puntuar</p>
              </Buttton>
            ) : (
              <Buttton
                onClick={handleUpdate}
                className={`text-lg px-5 py-2 sm:py-1.5 font-medium flex justify-center items-center gap-x-2 bg-blue-600  
          hover:bg-blue-700 focus:ring-blue-400
          `}
              >
                <p className="hidden sm:block">Actualizar</p>
              </Buttton>
            )}
            <Buttton
              onClick={handleDelete}
              className={`text-lg px-5 py-2 sm:py-1.5 font-medium flex justify-center items-center gap-x-2 bg-red-600  
          hover:bg-red-700 focus:ring-red-400
          `}
            >
              <p className="hidden sm:block">Borrar</p>
            </Buttton>
          </div>
        </div>
      )}
    </div>
  );
};
