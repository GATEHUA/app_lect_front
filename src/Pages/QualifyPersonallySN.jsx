import { useParams } from "react-router-dom";
import { QualyNavLayout } from "../layouts/QualyNavLayout";
import { getSepNivRequest } from "../api/status";
import { SNTable } from "../components/SNTable";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  updateSepNivPreguntaRequest,
  deleteFilteredSepNivPreguntasRequest,
} from "../api/sepNivPreguntas";
import Buttton from "../components/utils/Buttton";
import { RiDeleteBin2Line } from "react-icons/ri";

export const QualifyPersonallySN = () => {
  const { idl, idu } = useParams();
  const [data, setData] = useState([]);

  const getSepNiv = async () => {
    const { data: dataSN } = await getSepNivRequest(idl, idu);
    console.log(dataSN);
    setData(dataSN);
  };

  const handleUpdate = (id, idinputP, setShowEditPuntos) => {
    setShowEditPuntos(true);
    const inputElement = document.getElementById(idinputP); // Obtén el campo de entrada por su ID
    let inputValue;
    if (inputElement) {
      inputValue = inputElement.value;
    }
    console.log("desde :", idinputP);
    console.log("Valor del campo de entrada:", inputValue);

    toast.promise(updateSepNivPreguntaRequest(id, { puntosSep: inputValue }), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        getSepNiv();
        return <div>Puntaje Actualizada Correctamente</div>;
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
  };

  const handleDelete = () => {
    toast(`¿Está seguro que deseas eliminar su separción por niveles?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deleteFilteredSepNivPreguntasRequest(idl, idu), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              getSepNiv();
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

  useEffect(() => {
    getSepNiv();
  }, []);

  return (
    <div>
      <QualyNavLayout idl={idl} idu={idu} />
      <div className="p-4">
        <Buttton
          onClick={handleDelete}
          className={`text-lg px-5 py-2 sm:py-1.5 font-medium flex justify-center items-center gap-x-2 bg-red-600  
            hover:bg-red-700 focus:ring-red-400
            `}
        >
          <p className="hidden sm:block">Rehacer</p>
          <RiDeleteBin2Line size={18} />
        </Buttton>
      </div>

      <SNTable data={data} handleUpdate={handleUpdate} />
    </div>
  );
};
