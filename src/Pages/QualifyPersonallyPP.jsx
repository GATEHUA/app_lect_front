import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPartParrafosRequest } from "../api/status";
import { QualyNavLayout } from "../layouts/QualyNavLayout";
import { PPTable } from "../components/PPTable";
import { Loading } from "../components/utils/Loading";
import {
  deletePartParrafoRequest,
  updatePartParrafoRequest,
} from "../api/partParrafo";
import { toast } from "sonner";

export const QualifyPersonallyPP = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { idl, idu } = useParams();
  const getPartParrafos = async () => {
    const { data: dataPP } = await getPartParrafosRequest(idl, idu);
    setData(dataPP);
    // setLoading(false);
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

    toast.promise(updatePartParrafoRequest(id, { puntos: inputValue }), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        getPartParrafos();
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
          toast.promise(deletePartParrafoRequest(id), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              getPartParrafos();
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
    getPartParrafos();
  }, []);
  return (
    <div>
      <QualyNavLayout idl={idl} idu={idu} />
      {/* {loading ? <Loading /> : <PPTable data={data} />} */}
      <PPTable
        data={data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};
