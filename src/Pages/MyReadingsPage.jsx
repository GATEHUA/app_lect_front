import { useRef, useState, useEffect } from "react";
import { deleteLecturaRequest, getMyLecturasRequest } from "../api/lecturas";
import { HeaderPageTable } from "../components/HeaderPageTable";
import { ReadingsTable } from "../components/ReadingsTable";
import { useNavigate } from "react-router-dom";
import { searchFunction } from "../helpers/search";
import { toast } from "sonner";

export const MyReadingsPage = () => {
  const navigate = useNavigate();
  const readings = useRef([]);
  const search = useRef(null);

  const [results, setResults] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(35);
  const onShowReadingForm = () => {
    navigate("/myreadings/new");
  };

  const getMyReadings = async () => {
    const { data } = await getMyLecturasRequest();
    const lecturasConcatenados = data.map((lectura) => ({
      ...lectura,
      nivelDifString:
        lectura.nivelDificultad === 1
          ? "Basico (1)"
          : lectura.nivelDificultad === 2
          ? "Intermedio (2)"
          : lectura.nivelDificultad === 3
          ? "Avanzado (3)"
          : null,
    }));
    readings.current = lecturasConcatenados;
    if (search.current) {
      const filteredResults = searchFunction(readings.current, search.current);
      setResults(filteredResults);
    } else {
      setResults(lecturasConcatenados);
    }
  };
  function handleChangue(e) {
    search.current = e.target.value;
    const filteredResults = searchFunction(readings.current, search.current);
    setResults(filteredResults);
  }
  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 35);
  };
  const handleShowMoreInit = () => {
    setItemsToShow(35);
  };
  useEffect(() => {
    getMyReadings();
  }, []);
  const handleDeleteReading = ({ _id, titulo }) => {
    toast(`¿Está seguro que deseas eliminar la lectura de ${titulo}?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deleteLecturaRequest(_id), {
            className: "dark:bg-gray-700 dark:text-white",

            loading: "Cargando...",
            success: () => {
              getMyReadings();
              return <div>Eliminado Correctamente</div>;
            },
            error: (error) => {
              const arregloError = error.response.data;
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
    <>
      <div className="p-4">
        <HeaderPageTable
          handleChangue={handleChangue}
          onShowForm={onShowReadingForm}
        />
        <ReadingsTable
          readings={results}
          itemsToShow={itemsToShow}
          handleShowMore={handleShowMore}
          handleShowMoreInit={handleShowMoreInit}
          handleDeleteReading={handleDeleteReading}
        />
      </div>
    </>
  );
};
