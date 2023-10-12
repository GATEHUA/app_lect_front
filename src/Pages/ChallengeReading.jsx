import { useNavigate, useParams } from "react-router-dom";
import { getMyPreguntasChallengueRequest } from "../api/preguntas";
import { useEffect, useRef, useState } from "react";
import { Loading } from "../components/utils/Loading";
import { useUserStore } from "../store/UserStore";
export const ChallengeReading = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const dataQ = useRef([]);
  const getMyPreguntasChallengue = async () => {
    const { data } = await getMyPreguntasChallengueRequest(params.id);
    dataQ.current = data;
    setLoading(false);
    // data.current.forEach((v) => dataF[]);
  };
  //   const getDataUser = (nivelSep) => {
  //     return dataPr.filter((v) => v.nivelSep === nivelSep);
  //   };

  useEffect(() => {
    getMyPreguntasChallengue();
  }, []);
  console.log(dataQ.current);

  return (
    <div className="w-full min-h-screen h-full dark:bg-slate-800 dark:text-white font-Poppins overflow-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          {dataQ.current.length > 0 ? (
            <div className="grid grid-cols-4 gap-8 p-8">
              {dataQ.current.map((v) => (
                <button
                  key={v._id}
                  onClick={() => {
                    navigate(`/challengueRe/${params.id}/${v._id}`);
                  }}
                  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {`${v.apellidoPaterno} ${v.apellidoMaterno}, ${v.nombres}`}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    ¡Hola {user.nombres}! Te invito a responder mis preguntas.
                    Cada respuesta correcta te otorgará 5 puntos. ¡Buena suerte!
                    ✅
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center pt-8">
              No existen desafios por el momento
            </div>
          )}
        </>
      )}
    </div>
  );
};
