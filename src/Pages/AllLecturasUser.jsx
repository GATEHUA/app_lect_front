import { useState, useEffect } from "react";
import { getLecturasRequest } from "../api/lecturas";
import CardLectura from "../components/CardLectura";
import Camino from "../components/Camino";

export default function AllLecturasUser() {
  const [botonA, setBotonA] = useState(true);
  const [lecturas, setLecturas] = useState([]);
  // const [loading, setLoading] = useState(true);

  const getLecturas = async () => {
    try {
      const res = await getLecturasRequest();
      setLecturas(res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLecturas();
  }, []);
  useEffect(() => {
    // Función para manejar el evento mouseup en todo el documento
    const handleMouseUp = () => {
      setBotonA(true);
    };

    // Agregar un event listener para mouseup al montar el componente
    window.addEventListener("mouseup", handleMouseUp);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return (
    <div className="bg-white w-full">
      <Camino />
      <button
        className="bg-blue-500 p-7 rounded-full"
        style={
          botonA
            ? { boxShadow: "0px 6px 0px rgb(20, 52, 92)" }
            : {
                transform: "translateY(6px)",
                boxShadow: "0px 0px 0px rgb(20, 52, 92)",
              }
        }
        onMouseDown={() => {
          setBotonA(false);
        }}
      >
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/9c1469fc6d708e630b5bb53ce60377db.svg"
          alt=""
        />
      </button>
      {/* <button
        className=" bg-blue-500 p-7 rounded-full"
        style={
          botonA
            ? { boxShadow: "0px 6px 0px rgb(20, 52,92)" }
            : {
                transform: "translateY(6px)",
                boxShadow: "0px 0px 0px rgb(20, 52,92)",
              }
        }
        onMouseDown={() => {
          setBotonA(false);
        }}
        onMouseUp={() => {
          setBotonA(true);
        }}
        onMouseLeave={() => {
          setBotonA(true);
        }}
        // onBlur={() => {
        //   setBotonA(true);
        // }}
        // onFocus={() => {
        //   setBotonA(false);
        // }}
      >
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/9c1469fc6d708e630b5bb53ce60377db.svg"
          alt=""
        />
      </button> */}
      <div className="flex min-h-screen items-center justify-center dark:bg-slate-800 bg-white">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3 py-9 text-black">
          {lecturas.map((lectura) => {
            return <CardLectura key={lectura._id} lectura={lectura} />;
          })}
        </div>
      </div>
    </div>
  );
}
