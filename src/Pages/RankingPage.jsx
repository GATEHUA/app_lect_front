import { useEffect, useRef, useState } from "react";
import { getUsuariosEstudiantesRankRequest } from "../api/users";
import { Loading } from "../components/utils/Loading";
import { BiSolidUserCircle } from "react-icons/bi";
import { BUCKET } from "../config";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { ButtonTouch } from "../components/utils/ButtonTouch";

export const RankingPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const rank = useRef([]);
  const getUsuariosEstudiantesRank = async () => {
    const { data } = await getUsuariosEstudiantesRankRequest();
    rank.current = data;
    setLoading(false);
  };
  useEffect(() => {
    getUsuariosEstudiantesRank();
  }, []);
  console.log(rank.current);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center flex-col w-full overflow-auto">
          <div className="my-4 text-xl font-bold">CLASIFICACION</div>
          {rank.current.map((v, i) => (
            <div key={v._id}>
              <div
                data-tooltip-id={v._id}
                className="hover:bg-[rgba(0,0,0,0.2)] md:text-lg cursor-pointer flex items-center py-3 md:px-7 px-2 mb-5 md:w-[45rem] w-[22rem] text-start justify-between rounded-lg border-2 "
              >
                <p>{i + 1}</p>
                {v.fotoPerfil ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`${BUCKET}/public/usuario/foto/${v.fotoPerfil}`}
                  />
                ) : (
                  <BiSolidUserCircle className="w-10 h-10 rounded-full dark:bg-slate-500 text-gray-300" />
                )}
                <p className="md:w-[24rem] w-[14rem]">{`${v.apellidoPaterno} ${v.apellidoMaterno}, ${v.nombres}`}</p>
                <p className="w-12 flex justify-center">{`${v.puntajeTotal}`}</p>
              </div>
              <ReactTooltip
                closeOnScroll
                openOnClick
                clickable
                style={{
                  background: "#58cc02",
                  padding: "15px",
                  borderRadius: "15px",
                  zIndex: "999",
                }}
                id={v._id}
              >
                <div className={`bg-[#58cc02] w-full h-full min-w-[14.5rem]  `}>
                  <ButtonTouch
                    onClick={() => {
                      navigate(`/perfil/${v._id}`);
                    }}
                    initialTouchColor={"initialTouchColorBasicTooltip"}
                    className={`bg-white w-full mt-2 rounded-lg color-t font-medium font-sans py-1.5 text-lg hover:bg-gray-50`}
                    style={{
                      color: "[#58cc02]",
                    }}
                  >
                    {/* <a
              href={`${BUCKET}/public/lectura/contenido/${v.contenido}`}
              target="_blank"
            >
              {" "}
              Empezar
            </a> */}
                    Ver Perfil
                  </ButtonTouch>
                </div>
              </ReactTooltip>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
