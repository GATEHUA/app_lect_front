import { useParams } from "react-router-dom";
import { getMyPreguntasChallengueUserRequest } from "../api/preguntas";
import { useRef, useState, useEffect } from "react";
import { Loading } from "../components/utils/Loading";

export const PrubTemp = () => {
  const [loading, setLoading] = useState(true);
  const dataQU = useRef([]);

  const params = useParams();
  const getPreguntaschallengueuser = async () => {
    const { data } = await getMyPreguntasChallengueUserRequest(
      params.id,
      params.uid
    );
    dataQU.current = data;
    setLoading(false);
  };
  useEffect(() => {
    getPreguntaschallengueuser();
  }, []);
  console.log(dataQU.current);
  return (
    <div className="w-full min-h-screen h-full dark:bg-slate-800 dark:text-white font-Poppins overflow-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>{params.id}</div>
          <div>{params.uid}</div>
        </>
      )}
    </div>
  );
};
