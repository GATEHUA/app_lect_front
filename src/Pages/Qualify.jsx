import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { getUsuariosEstudiantesRequest } from "../api/users";
import { Loading } from "../components/utils/Loading";
import { getStatusAllRequest, getStatusMyAllRequest } from "../api/status";
import { EstudiantesTable } from "../components/EstudiantesTable";
import { calcularEdad, formatearFecha } from "../helpers/formateDate";
import { HeaderPageTableStatus } from "../components/HeaderPageTableStatus";
import { searchFunctionStatus } from "../helpers/search";

export const Qualify = () => {
  const location = useLocation();
  console.log(location);
  // const navigate = useNavigate();
  const [itemsToShow, setItemsToShow] = useState(35);

  const [loading, setLoading] = useState(true);
  const data = useRef([]);
  const search = useRef(null);
  const [results, setResults] = useState([]);

  const getUsuariosEstudiantes = async () => {
    let getdatar;
    if (location.pathname == "/qualify/my") {
      getdatar = getStatusMyAllRequest;
    } else {
      getdatar = getStatusAllRequest;
    }
    const { data: dataU } = await getdatar();
    const estudiantesConcatenados = dataU.map((usuario) => ({
      ...usuario,
      refUsuario: {
        ...usuario.refUsuario,
        nombreCompleto: `${usuario.refUsuario.apellidoPaterno} ${usuario.refUsuario.apellidoMaterno}, ${usuario.refUsuario.nombres}`,
        fechaNacimientoFormat: formatearFecha(
          usuario.refUsuario.fechaNacimiento
        ),
        edad: calcularEdad(usuario.refUsuario.fechaNacimiento),
        aula: `${usuario.refUsuario.grado} ${usuario.refUsuario.seccion} ${usuario.refUsuario.nivel}`,
      },
    }));
    data.current = estudiantesConcatenados;
    if (search.current) {
      const filteredResults = searchFunctionStatus(
        data.current,
        search.current
      );
      setResults(filteredResults);
    } else {
      setResults(estudiantesConcatenados);
    }
    setLoading(false);
  };

  function handleChangue(e) {
    search.current = e.target.value;
    const filteredResults = searchFunctionStatus(data.current, search.current);
    setResults(filteredResults);
  }

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 35);
  };
  const handleShowMoreInit = () => {
    setItemsToShow(35);
  };
  useEffect(() => {
    getUsuariosEstudiantes();
  }, [location.pathname]);
  console.log(data.current);

  return (
    <div className="dark:bg-slate-800 dark:text-white w-full h-full min-h-screen font-Poppins">
      {loading ? (
        <Loading />
      ) : (
        <div className="py-2.5 px-4 w-full">
          <HeaderPageTableStatus handleChangue={handleChangue} />
          <EstudiantesTable
            data={results}
            itemsToShow={itemsToShow}
            handleShowMore={handleShowMore}
            handleShowMoreInit={handleShowMoreInit}
          />
        </div>
      )}
    </div>
  );
};
