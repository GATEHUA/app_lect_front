import { PiNotebookBold } from "react-icons/pi";
import { HiOutlineHome } from "react-icons/hi2";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ButtonTouch } from "../components/utils/ButtonTouch";
import {
  createStatusRequest,
  getStatusQueryRequest,
  getStatusRequest,
  updateStatusRequest,
} from "../api/status";
import { useEffect, useRef, useState } from "react";
import { Loading } from "../components/utils/Loading";
import { toast } from "sonner";
import { useUserStore } from "../store/UserStore";
import { Modal } from "../components/Modal";
import { ObservacionFormModal } from "../components/ObservacionFormModal";
import { ObsTable } from "../components/ObsTable";
import { deleteObservacionRequest } from "../api/observaciones";

export const ReadingStatus = ({ idl, idu }) => {
  const user = useUserStore((state) => state.user);
  // const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const dataEstado = useRef(null);

  const params = useParams();
  const [estado, setEstado] = useState({});
  const [estadoLec, setEstadoLec] = useState("Revisión");
  const [showFormObservacion, setShowFormObservacion] = useState(false);

  const [loading, setLoading] = useState(true);
  const getStatus = async () => {
    if (idl && idu) {
      const { data } = await getStatusQueryRequest(idl, idu);
      console.log("data");

      console.log(data);
      setEstado(data);
      setEstadoLec(data?.lecturacompletal[0].estado);
      console.log(estadoLec);
    } else {
      const { data } = await getStatusRequest(params.id);
      console.log(data);
      setEstado(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getStatus();

    // console.log(estado);
  }, [params.id]);

  // const canContinue =
  //   estado.respartParrafos.length !== estado.nparrafos.length &&
  //   estado.respuestas.length !== estado.preguntas.length &&
  //   estado.resSepNivPreguntas.length !== estado.preguntas.length &&
  //   estado.mispreguntasuser.length !== estado.limitpreguser.numpreguntasal &&
  //   !estado.productFinalFound;
  const onShowFormObservacion = (e, val) => {
    dataEstado.current = val;
    setShowFormObservacion(e);
  };

  const updateLectAl = () => {
    let primpor =
      (estado.respartParrafos.length / estado.nparrafos.length) * 20;
    let segmpor = (estado.respuestas.length / estado.preguntas.length) * 20;
    let termpor =
      (estado.resSepNivPreguntas.length / estado.preguntas.length) * 20;
    let cuarpor =
      (estado.mispreguntasuser.length / estado.limitpreguser.numpreguntasal) *
      20;
    let quinpor = estado.productFinalFound ? 20 : 0;

    let porTotal = primpor + segmpor + termpor + cuarpor + quinpor;

    // console.log(porTotal);
    let content;

    if (user.rol == "Usuario" && porTotal !== 100) {
      content = {
        estado: "Observado",
        porcentaje: parseFloat(porTotal.toFixed(2)),
      };
    } else if (user.rol !== "Usuario" || porTotal == 100) {
      content = {
        estado: estadoLec,
        porcentaje: parseFloat(porTotal.toFixed(2)),
      };
    }

    toast.promise(
      updateStatusRequest(estado.lecturacompletal[0]._id, content),
      {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          getStatus();
          return <div>Estado Actualizado Correctamente</div>;
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

  const completLectAl = () => {
    let primpor =
      (estado.respartParrafos.length / estado.nparrafos.length) * 20;
    let segmpor = (estado.respuestas.length / estado.preguntas.length) * 20;
    let termpor =
      (estado.resSepNivPreguntas.length / estado.preguntas.length) * 20;
    let cuarpor =
      (estado.mispreguntasuser.length / estado.limitpreguser.numpreguntasal) *
      20;
    let quinpor = estado.productFinalFound ? 20 : 0;

    let porTotal = primpor + segmpor + termpor + cuarpor + quinpor;

    // console.log(porTotal);
    const content = {
      estado: porTotal == 100 ? "Revisión" : "En proceso",
      porcentaje: porTotal,
    };
    console.log(content);
    toast.promise(createStatusRequest(params.id, content), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        getStatus();
        return <div>Datos almacenados correctamente</div>;
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

  const handleDeleteObservacion = (id, refStatus) => {
    toast(`¿Está seguro que deseas eliminar la observación?`, {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí",
        onClick: () => {
          toast.promise(deleteObservacionRequest(id, refStatus), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              // getStatusRespuestas();
              getStatus();
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
    <div className="w-full dark:bg-slate-800 dark:text-white px-7 font-Poppins overflow-auto">
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <>
            {!idl && !idu && (
              <>
                <div className=" fixed top-0 left-0 p-5">
                  <ButtonTouch
                    onClick={() => navigate(`/reading/${params.id}`)}
                    initialTouchColor={"initialTouchColorBack"}
                    className={`w-full h-10 text-lg rounded-lg bg-[#ff4b4b] `}
                  >
                    <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                      <PiNotebookBold />
                      <p className="hidden lg:block">Lectura</p>
                    </div>
                  </ButtonTouch>
                </div>
                <div className=" fixed top-0 right-0 p-5">
                  <ButtonTouch
                    onClick={() => navigate(`/`)}
                    initialTouchColor={"initialTouchColorIntermediate"}
                    className={`w-full h-10 text-lg rounded-lg bg-[#1cb0f6] `}
                  >
                    <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                      <HiOutlineHome />
                      <p className="hidden lg:block">Inicio</p>
                    </div>
                  </ButtonTouch>
                </div>
              </>
            )}

            {user.rol == "Usuario" && <div className="h-16"></div>}
            <div className="sm:flex w-full justify-center items-center  sm:space-x-4 min-h-[89.7vh] ">
              <div className="md:space-y-7 space-y-5  pt-16 sm:w-1/3">
                <div>
                  <div className="text-xl font-bold">
                    Lectura compartida - Folio giratorio (Desarrollo por
                    parrafos):
                  </div>
                  <div>
                    Llevas {estado.respartParrafos.length} de{" "}
                    {estado.nparrafos.length}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold">Preguntas :</div>
                  <div>
                    Llevas {estado.respuestas.length} de{" "}
                    {estado.preguntas.length}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    Estrella Preguntona - Clasificacion de preguntas por niveles
                    :
                  </div>
                  <div>
                    Llevas {estado.resSepNivPreguntas.length} de{" "}
                    {estado.preguntas.length}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    Creación de preguntas para desafios
                  </div>
                  <div>
                    Llevas {estado.mispreguntasuser.length} de{" "}
                    {estado.limitpreguser.numpreguntasal}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold">Producto creativo</div>
                  <div>Llevas {estado.productFinalFound ? 1 : 0} de 1</div>
                </div>
                {idl && idu && (
                  <div>
                    <label className="text-xl font-bold" htmlFor="nivel">
                      Estado
                    </label>
                    <select
                      id="nivel"
                      value={estadoLec}
                      onChange={(e) => setEstadoLec(e.target.value)}
                      className=" bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
                      // {...register("nivel")}
                    >
                      <option value="Observado">Observado</option>
                      <option value="Revisión">Revisión</option>
                      <option value="Completo">Completo</option>
                      {/* <option value="No definido">No definido</option> */}
                    </select>
                  </div>
                )}
                {estado.lecturacompletal.length === 0 ? (
                  <>
                    <ButtonTouch
                      onClick={completLectAl}
                      disabled={
                        !(
                          estado.respartParrafos.length ===
                            estado.nparrafos.length &&
                          estado.respuestas.length ===
                            estado.preguntas.length &&
                          estado.resSepNivPreguntas.length ===
                            estado.preguntas.length &&
                          estado.mispreguntasuser.length ===
                            estado.limitpreguser.numpreguntasal &&
                          estado.productFinalFound
                        )
                      }
                      initialTouchColor={
                        estado.respartParrafos.length ===
                          estado.nparrafos.length &&
                        estado.respuestas.length === estado.preguntas.length &&
                        estado.resSepNivPreguntas.length ===
                          estado.preguntas.length &&
                        estado.mispreguntasuser.length ===
                          estado.limitpreguser.numpreguntasal &&
                        estado.productFinalFound &&
                        "initialTouchColorBasic"
                      }
                      className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7 mt-8 ${
                        estado.respartParrafos.length ===
                          estado.nparrafos.length &&
                        estado.respuestas.length === estado.preguntas.length &&
                        estado.resSepNivPreguntas.length ===
                          estado.preguntas.length &&
                        estado.mispreguntasuser.length ===
                          estado.limitpreguser.numpreguntasal &&
                        estado.productFinalFound
                          ? "bg-[#58cc02]"
                          : "cursor-not-allowed bg-[#37464f] text-[#52656d]"
                      }`}
                    >
                      <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                        <p>Calificar</p>
                      </div>
                    </ButtonTouch>

                    <div>
                      {" "}
                      <div className="">
                        Envía a calificar la lectura para obtener puntos
                      </div>
                      <div> en secciones con evaluación. 👍</div>
                    </div>
                  </>
                ) : (idl && idu) ||
                  estado.lecturacompletal[0]?.estado == "Observado" ? (
                  <ButtonTouch
                    type="button"
                    onClick={updateLectAl}
                    initialTouchColor={"initialTouchColorIntermediate"}
                    className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7 mt-8 bg-[#1cb0f6]`}
                    // disabled={
                    //   !(
                    //     estado.respartParrafos.length ===
                    //       estado.nparrafos.length &&
                    //     estado.respuestas.length === estado.preguntas.length &&
                    //     estado.resSepNivPreguntas.length ===
                    //       estado.preguntas.length &&
                    //     estado.mispreguntasuser.length ===
                    //       estado.limitpreguser.numpreguntasal &&
                    //     estado.productFinalFound
                    //   )
                    // }
                  >
                    <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                      <p>Actualizar</p>
                    </div>
                  </ButtonTouch>
                ) : (
                  <ButtonTouch
                    type="button"
                    onClick={() => navigate(`/`)}
                    initialTouchColor={"initialTouchColorBasic"}
                    className={`w-full h-10 text-lg rounded-lg bottom-0 mb-7 mt-8 bg-[#58cc02]`}
                  >
                    <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                      <p>Ir a inicio</p>
                    </div>
                  </ButtonTouch>
                )}
              </div>
              {estado.lecturacompletal[0] && (
                <div className="sm:w-2/3 w-full  sm:mt-0 mt-4 ">
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold mb-3">
                      Retroalimentación:
                    </div>
                    {user.rol != "Usuario" && (
                      <ButtonTouch
                        type="button"
                        onClick={() => setShowFormObservacion(true)}
                        initialTouchColor={"initialTouchColorBasic"}
                        className={`h-10 text-lg rounded-lg bottom-0 mb-5 bg-[#58cc02]`}
                      >
                        <div className="flex sm:px-4 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                          <p>Agregar</p>
                        </div>
                      </ButtonTouch>
                    )}
                  </div>
                  {estado.lecturacompletal[0] && (
                    <ObsTable
                      data={estado.lecturacompletal[0]?.refObservaciones}
                      refStatus={estado.lecturacompletal[0]?._id}
                      handleDeleteObservacion={handleDeleteObservacion}
                      onShowFormObservacion={onShowFormObservacion}
                      // data={}
                    />
                  )}
                </div>
              )}
            </div>
          </>
          {estado.lecturacompletal[0] && (
            <div
              className={`h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 fixed ${
                showFormObservacion ? "grid" : "hidden"
              } place-items-center p-2 `}
            >
              <Modal
                onShowForm={onShowFormObservacion}
                titleModal={
                  dataEstado.current
                    ? "Editar Observación"
                    : "Crear Observación"
                }
                className={" max-w-lg"}
              >
                <ObservacionFormModal
                  refStatus={estado.lecturacompletal[0]?._id}
                  dataObservacion={dataEstado.current}
                  getStatus={getStatus}
                />
                {/* <AlternativeForm
                getMyQuestions={getYouPreguntas}
                dataAlternative={dataAlternative.current}
                idPregunta={idPregunta.current}
              /> */}
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
