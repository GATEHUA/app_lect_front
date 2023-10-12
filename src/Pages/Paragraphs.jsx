import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getParrafosRequest } from "../api/parrafos";
import { Loading } from "../components/utils/Loading";
import { PartParagrahForm } from "../components/PartParagrahForm";
import { MdNavigateNext } from "react-icons/md";
import { ButtonTouch } from "../components/utils/ButtonTouch";
import { PiNotebookBold } from "react-icons/pi";
import { AiFillQuestionCircle } from "react-icons/ai";

export const Paragraphs = () => {
  //   const [parrafos, setParrafos] = useState([]);
  const navigate = useNavigate();
  const parrafos = useRef([]);
  const [currentParafo, setCurrentParafo] = useState(0);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  // const goNextParrafo = ()=>{
  //   set
  // }
  const getParrafos = async () => {
    const { data } = await getParrafosRequest(params.id);
    parrafos.current = data;
    setLoading(false);
    // console.log(data);
  };
  useEffect(() => {
    getParrafos();
  }, []);
  // console.log(currentParafo);
  // console.log(parrafos.current[currentParafo]);

  const goNextParrafo = () => {
    if (currentParafo < parrafos.current.length - 1) {
      setCurrentParafo(currentParafo + 1);
    } else {
      navigate(`/questions_reading/${params.id}`);
    }
  };
  return (
    <div className="dark:bg-slate-800 dark:text-white w-full h-full min-h-screen font-Poppins">
      {loading ? (
        <Loading />
      ) : (
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
              onClick={() => navigate(`/questions_reading/${params.id}`)}
              initialTouchColor={"initialTouchColorIntermediate"}
              className={`w-full h-10 text-lg rounded-lg bg-[#1cb0f6] `}
            >
              <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
                <AiFillQuestionCircle />
                <p className="hidden lg:block">Preguntas</p>
              </div>
            </ButtonTouch>
          </div>
          {parrafos.current.length === 0 ? (
            <div className="w-full pt-32 flex justify-center items-center">
              No hay Parrafos para mostrar{" "}
            </div>
          ) : (
            <div className="flex flex-col items-center text-justify  p-2 lg:pt-24  pb-12 md:p-0 pt-20 overflow-auto">
              <div className="w-[67%] mx-32 h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div
                  className="h-4 pt-0.5 pb-1 px-2 bg-[#58cc02] rounded-full "
                  style={{
                    width: `${
                      ((currentParafo + 1) / parrafos.current.length) * 100
                    }%`,
                  }}
                >
                  <div className=" w-full bg-[#79d635] h-1.5" />
                </div>
              </div>
              <div className="flex p-3 justify-center space-x-4 items-center">
                <ButtonTouch
                  type="button"
                  disabled={currentParafo === 0}
                  initialTouchColor={"initialTouchColorIntermediate"}
                  className={`p-1 rounded-lg bg-[#1cb0f6]  ${
                    currentParafo === 0
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => setCurrentParafo(currentParafo - 1)}
                >
                  <MdNavigateNext
                    size={30}
                    style={{ transform: "scaleX(-1)" }}
                  />
                </ButtonTouch>

                <div>
                  {currentParafo + 1} / {parrafos.current.length}
                </div>

                <ButtonTouch
                  onClick={goNextParrafo}
                  disabled={currentParafo >= parrafos.current.length - 1}
                  initialTouchColor={"initialTouchColorIntermediate"}
                  className={`p-1 rounded-lg bg-[#1cb0f6]  ${
                    currentParafo >= parrafos.current.length - 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <MdNavigateNext size={30} />
                </ButtonTouch>
              </div>
              <div className="lg:px-72 px-4 mb-5  text-lg">
                {parrafos.current[currentParafo].contenido}
              </div>
              <PartParagrahForm
                refParrafo={parrafos.current[currentParafo]._id}
                setCurrentParafo={setCurrentParafo}
                goNextParrafo={goNextParrafo}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
