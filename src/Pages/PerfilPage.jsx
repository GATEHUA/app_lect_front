import { useNavigate, useParams } from "react-router-dom";
import { getPerfilUsuarioRequest, updatePointsRequest } from "../api/users";
import { useEffect, useRef, useState } from "react";
import { BUCKET } from "../config";
import { Loading } from "../components/utils/Loading";
import { BiSolidUserCircle, BiSolidBookReader } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone, BsFillQuestionCircleFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ImParagraphCenter } from "react-icons/im";
import { RiSwordLine, RiDragMove2Fill } from "react-icons/ri";
import { GrProductHunt } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";

import { formatearFechaText } from "../helpers/formateDate";
import { CardProfile } from "../components/minicomponentes/CardProfile";
import { useUserStore } from "../store/UserStore";
import { ButtonTouch } from "../components/utils/ButtonTouch";
import { toast } from "sonner";

export const PerfilPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  // const perfil = useRef(null);
  const [perfil, setPerfil] = useState({});

  const user = useUserStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const getPerfilUsuario = async () => {
    const { data } = await getPerfilUsuarioRequest(params.id);
    console.log(data);
    // perfil = data;
    setPerfil(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getPerfilUsuario();
  }, [params.id]);
  const updatePoints = async () => {
    toast.promise(
      updatePointsRequest(params.id, {
        points: perfil.puntajeTotalSum,
      }),
      {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          // perfil.puntajeTotal = perfil.puntajeTotalSum;
          setPerfil({ ...perfil, puntajeTotal: perfil.puntajeTotalSum });
          return <div>Actualizado correctamente</div>;
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
  console.log(perfil?.puntajeTotal);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="md:px-16 pl-10 pr-6">
          <div className="md:flex md:justify-between py-10  text-lg ">
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold">{`${perfil.apellidoPaterno} ${perfil.apellidoMaterno}, ${perfil.nombres}`}</h1>
              <div className="flex items-center space-x-3">
                <HiOutlineMail size={20} />
                <p className="text-">{perfil.correo}</p>
              </div>
              <div className="flex items-center space-x-3">
                <BsTelephone size={20} />
                <p>{perfil.numeroTelefonicoPersonal}</p>
              </div>
              <div className="flex items-center space-x-3">
                <AiOutlineClockCircle size={20} />
                <p>Se unió el {formatearFechaText(perfil.createdAt)}</p>
              </div>
            </div>

            {perfil.fotoPerfil ? (
              <img
                className="w-44 h-44 rounded-full border-2 mt-5 md:mt-0"
                src={`${BUCKET}/public/usuario/foto/${perfil.fotoPerfil}`}
              />
            ) : (
              <BiSolidUserCircle className="w-44 h-44 rounded-full dark:bg-slate-500 text-gray-300" />
            )}
          </div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="py-4 ">
            {perfil.rol === "Usuario" ? (
              <>
                <h1 className="text-2xl font-semibold mb-3">Estadísticas: </h1>
                <div className=" md:flex justify-between items-center space-y-3">
                  <p className="text-lg font-semibold">
                    Puntaje Total : {perfil.puntajeTotal}
                  </p>

                  {user._id === params.id &&
                    perfil.puntajeTotal !== perfil.puntajeTotalSum && (
                      <>
                        <p className="text-lg font-semibold">
                          Puntaje Total Actual: {perfil.puntajeTotalSum}
                        </p>
                        <ButtonTouch
                          onClick={updatePoints}
                          initialTouchColor={"initialTouchColorIntermediate"}
                          className={`w-72 h-10 text-lg rounded-lg bottom-0  bg-[#1cb0f6] `}
                        >
                          <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                            <RxUpdate />
                            <p>Actualizar Puntaje</p>
                          </div>
                        </ButtonTouch>
                      </>
                    )}
                </div>

                <div className="md:grid grid-cols-3 gap-y-3 gap-x-48 space-y-3 mt-5 w-full p-2">
                  <CardProfile
                    text={"Puntaje por creación de preguntas"}
                    pts={perfil.puntosPregunta}
                  >
                    <BsFillQuestionCircleFill className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-3" />
                  </CardProfile>
                  <CardProfile
                    text={"Puntaje por folio giratorio (parrafos)"}
                    pts={perfil.puntosPartParrafo}
                  >
                    <ImParagraphCenter className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-3" />
                  </CardProfile>
                  <CardProfile
                    text={"Puntaje por producto final"}
                    pts={perfil.puntosProductoFinal}
                  >
                    <GrProductHunt className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-3" />
                  </CardProfile>
                  <CardProfile
                    text={"Puntaje por preguntas de lecturas"}
                    pts={perfil.puntosRespuestasPre}
                  >
                    <BiSolidBookReader className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-3" />
                  </CardProfile>
                  <CardProfile
                    text={"Puntaje por preguntas de desafios"}
                    pts={perfil.puntosRespuestasDes}
                  >
                    <RiSwordLine className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-3" />
                  </CardProfile>
                  <CardProfile
                    text={"Puntaje Clasificacion de niveles"}
                    pts={perfil.puntosSepNivPregunta}
                  >
                    <RiDragMove2Fill className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-3" />
                  </CardProfile>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold mb-3">Lecturas: </h1>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 p-8">
                  {perfil.lecturas.map((v) => (
                    <button
                      key={v._id}
                      onClick={() => {
                        navigate(`/reading/${v._id}`);
                      }}
                      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {v.titulo}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {`Nivel ${v.nivelDificultad}`}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
