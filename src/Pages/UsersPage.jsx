import React, { useEffect, useRef, useState } from "react";
import { getUsuariosRequest } from "../api/users";
import { UsersTable } from "../components/UsersTable";
import { useNavigate } from "react-router-dom";
import { calcularEdad, formatearFecha } from "../helpers/formateDate";
import { toast } from "sonner";
import { deleteUsuarioRequest } from "../api/users";
import { searchFunction } from "../helpers/search";
import { HeaderPageTable } from "../components/HeaderPageTable";

export const UsersPage = () => {
  const navigate = useNavigate();
  const users = useRef([]);
  const search = useRef(null);

  const [itemsToShow, setItemsToShow] = useState(35);
  const [results, setResults] = useState([]);

  const onShowUserForm = () => {
    navigate("/users/new");
  };

  const getUsers = async () => {
    const { data } = await getUsuariosRequest();
    const usuariosConcatenados = data.map((usuario) => ({
      ...usuario,
      nombreCompleto: `${usuario.apellidoPaterno} ${usuario.apellidoMaterno}, ${usuario.nombres}`,
      fechaNacimientoFormat: formatearFecha(usuario.fechaNacimiento),
      verificado: usuario.estaVerificado ? "Verificado ✓" : "No verificado ✗",
      edad: calcularEdad(usuario.fechaNacimiento),
    }));
    users.current = usuariosConcatenados;

    if (search.current) {
      const filteredResults = searchFunction(users.current, search.current);
      setResults(filteredResults);
    } else {
      // console.log("HOLA2");
      setResults(usuariosConcatenados);
    }
  };

  function handleChangue(e) {
    search.current = e.target.value;
    const filteredResults = searchFunction(users.current, search.current);
    setResults(filteredResults);
  }

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 35);
  };
  const handleShowMoreInit = () => {
    setItemsToShow(35);
  };

  useEffect(() => {
    getUsers();
  }, []);
  const handleDeleteUser = ({ _id, nombreCompleto }) => {
    toast(
      `¿Está seguro que deseas eliminar el registro de ${nombreCompleto}?`,
      {
        className: "dark:bg-gray-700 dark:text-white",
        action: {
          label: "Sí",
          onClick: () => {
            toast.promise(deleteUsuarioRequest(_id), {
              className: "dark:bg-gray-700 dark:text-white",

              loading: "Cargando...",
              success: () => {
                getUsers();
                return <div>Eliminado Correctamente</div>;
              },
              error: (error) => {
                const arregloError = error.response.data;
                return arregloError.map((e) => (
                  <div key={e}>{`${
                    arregloError.length > 1 ? "•" : ""
                  }${e}`}</div>
                ));
              },
            });
          },
        },
        duration: Infinity,
      }
    );
  };

  return (
    <>
      <div className="px-4 py-2.5 w-full">
        <HeaderPageTable
          handleChangue={handleChangue}
          onShowForm={onShowUserForm}
        />
        <UsersTable
          users={results}
          itemsToShow={itemsToShow}
          handleShowMore={handleShowMore}
          handleShowMoreInit={handleShowMoreInit}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
    </>
  );
};
