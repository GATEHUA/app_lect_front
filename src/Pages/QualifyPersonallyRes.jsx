import { useParams } from "react-router-dom";

import { QualyNavLayout } from "../layouts/QualyNavLayout";
import { useEffect, useState } from "react";
import { getStatusRespuestasRequest } from "../api/status";
import { ResTable } from "../components/ResTable";
import {
  deleteRespuestaRequest,
  updateRespuestaRequest,
} from "../api/respuesta";
import { toast } from "sonner";

export const QualifyPersonallyRes = () => {
  const { idl, idu } = useParams();
  const [data, setData] = useState([]);
  const getStatusRespuestas = async () => {
    const { data: dataRes } = await getStatusRespuestasRequest(idl, idu);
    console.log(dataRes);
    setData(dataRes);
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

    toast.promise(updateRespuestaRequest(id, { puntos: inputValue }), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        getStatusRespuestas();
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

  const handleDelete = (id) => {
    toast(`¿Está seguro que deseas eliminar su respuesta?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deleteRespuestaRequest(id), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              getStatusRespuestas();
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
    getStatusRespuestas();
  }, []);

  return (
    <div>
      <QualyNavLayout idl={idl} idu={idu} />
      <ResTable
        data={data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};
