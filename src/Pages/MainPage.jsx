import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";

import { ButTchTooltipt } from "../components/utils/ButTchTooltipt";

import { getLecturasMainRequest, getLecturasRequest } from "../api/lecturas";
import { SectionMain } from "../components/minicomponentes/SectionMain";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/utils/Loading";

export const MainPage = () => {
  const navigate = useNavigate();
  // const [lecturas, setLecturas] = useState({ 1: [], 2: [], 3: [] });
  const [loading, setLoading] = useState(true);
  const lecturasR = useRef({ 1: [], 2: [], 3: [] });
  const getLecturasMain = async () => {
    try {
      const res = await getLecturasMainRequest();
      setLoading(false);
      // setLecturas(res.data);
      lecturasR.current = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLecturasMain();
  }, []);
  // const onClickR = (id) => navigate(`/reading/${id}`);
  // console.log("estado");

  // console.log(lecturas);
  // console.log("ref");

  // console.log(lecturasR.current);
  //740x139
  return (
    <div className="bg-slate-200 dark:bg-[#131f24] h-full min-h-screen font-Poppins">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full justify-center">
          <div className="">
            <SectionMain
              color={"#58cc02"}
              tittle={"Nivel Basico"}
              message={`Desarrolla tus habilidades de lectura en un
                  nivel de entrada,ideal para principiantes.`}
            />
            <div className="flex justify-center">
              <div className="w-[14.4rem]">
                {lecturasR.current[1].map((v, i) => (
                  <div
                    key={v._id}
                    className={`flex w-full justify-center mb-6 
          
            `}
                  >
                    <ButTchTooltipt
                      // onClick={onClickR}
                      v={v}
                      // id={"1"}
                      className={`  ${
                        (i + 1) % 8 === 2
                          ? "ml-20"
                          : (i + 1) % 8 === 3
                          ? "ml-40"
                          : (i + 1) % 8 === 4
                          ? "ml-20"
                          : (i + 1) % 8 === 6
                          ? "mr-20"
                          : (i + 1) % 8 === 7
                          ? "mr-40"
                          : (i + 1) % 8 === 0
                          ? "mr-20"
                          : ""
                      }`}
                      colorPr={"#58cc02"}
                      initialTouchColor={"initialTouchColorBasic"}
                      initialTouchColorTool={"initialTouchColorBasicTooltip"}
                      // hoverOnCl={"#72e61c"}
                    />
                  </div>
                ))}
              </div>
            </div>
            <SectionMain
              color={"#1cb0f6"}
              tittle={"Nivel Intermedio"}
              message={`Profundiza en la comprensión lectora con 
              textos más desafiantes y temas variados.`}
            />
            <div className="flex justify-center">
              <div className="w-[14.4rem]">
                {lecturasR.current[2].map((v, i) => (
                  <div
                    key={v._id}
                    className={`flex w-full justify-center mb-6 `}
                  >
                    <ButTchTooltipt
                      v={v}
                      // id={"1"}
                      className={`  ${
                        (i + 1) % 8 === 2
                          ? "ml-20"
                          : (i + 1) % 8 === 3
                          ? "ml-40"
                          : (i + 1) % 8 === 4
                          ? "ml-20"
                          : (i + 1) % 8 === 6
                          ? "mr-20"
                          : (i + 1) % 8 === 7
                          ? "mr-40"
                          : (i + 1) % 8 === 0
                          ? "mr-20"
                          : ""
                      }`}
                      colorPr={"#1cb0f6"}
                      initialTouchColor={"initialTouchColorIntermediate"}
                      initialTouchColorTool={
                        "initialTouchColorIntermediateTooltip"
                      }
                      // hoverOnCl={"#72e61c"}
                    />
                  </div>
                ))}
              </div>
            </div>
            <SectionMain
              color={"#ff9600"}
              tittle={"Nivel Avanzado"}
              message={`Supera tus límites con textos avanzados que te 
              desafiarán y enriquecerán tus habilidades de lectura.`}
            />
            <div className="flex justify-center">
              <div className="w-[14.4rem]">
                {lecturasR.current[3].map((v, i) => (
                  <div
                    key={v._id}
                    className={`flex w-full justify-center mb-6 
          
            `}
                  >
                    <ButTchTooltipt
                      v={v}
                      // id={"1"}
                      className={`  ${
                        (i + 1) % 8 === 2
                          ? "ml-20"
                          : (i + 1) % 8 === 3
                          ? "ml-40"
                          : (i + 1) % 8 === 4
                          ? "ml-20"
                          : (i + 1) % 8 === 6
                          ? "mr-20"
                          : (i + 1) % 8 === 7
                          ? "mr-40"
                          : (i + 1) % 8 === 0
                          ? "mr-20"
                          : ""
                      }`}
                      colorPr={"#ff9600"}
                      initialTouchColor={"initialTouchColorAdvanced"}
                      initialTouchColorTool={"initialTouchColorAdvancedTooltip"}
                      // hoverOnCl={"#72e61c"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <Lottie
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
            }}
            animationData={animationData}
          /> */}
        </div>
      )}
    </div>

    // {/* <div className="flex w-full justify-center">
    //   <ButTchTooltipt
    //     id={"1"}
    //     colorPr={"#58cc02"}
    //     initialTouchColor={"initialTouchColorBasic"}
    //     initialTouchColorTool={"initialTouchColorBasicTooltip"}
    //     // hoverOnCl={"#72e61c"}
    //   />
    // </div>

    // <div className="flex w-full justify-center">
    //   <ButTchTooltipt
    //     id={"3"}
    //     colorPr={"#1cb0f6"}
    //     initialTouchColor={"initialTouchColorIntermediate"}
    //     initialTouchColorTool={"initialTouchColorIntermediateTooltip"}
    //     // hoverOnCl={"#1fc2ff"}
    //   />
    // </div>
    // <div className="flex w-full justify-center">
    //   <ButTchTooltipt
    //     id={"4"}
    //     colorPr={"#ff9600"}
    //     initialTouchColor={"initialTouchColorAdvanced"}
    //     initialTouchColorTool={"initialTouchColorAdvancedTooltip"}
    //     // hoverOnCl={"color-t"}
    //   />
    // </div>
    // <div className="flex w-full justify-center">
    //   <ButTchTooltipt
    //     id={"2"}
    //     colorPr={"#ffc800"}
    //     initialTouchColor={"initialTouchColorCompetado"}
    //     initialTouchColorTool={"initialTouchColorCompetadoTooltip"}
    //     // hoverOnCl={"#ffdc00"}
    //   />
    // </div> */}
    // {/* <ButtonTouch
    //   initialTouchColor={"initialTouchColorCompetado"}
    //   className={"bg-[#ffc800] w-[63px] h-[57px]"}
    // >
    //   <FondoLibroC className="absolute top-0 bottom-0 left-0 right-0 m-auto pointer-events-none" />
    //   <LibroC className="absolute z-10 top-0 bottom-0 left-0 right-0 m-auto pointer-events-none" />
    // </ButtonTouch>
    // <ButtonTouch
    //   initialTouchColor={"initialTouchColorBasic"}
    //   className={"bg-[#58cc02] w-[63px] h-[57px]"}
    // >
    //   <Libro className="absolute top-0 bottom-0 left-0 right-0 m-auto pointer-events-none" />
    // </ButtonTouch>
    // <ButtonTouch
    //   initialTouchColor={"initialTouchColorIntermediate"}
    //   className={"bg-[#1cb0f6] w-[63px] h-[57px]"}
    // >
    //   <Libro className="absolute top-0 bottom-0 left-0 right-0 m-auto pointer-events-none" />
    // </ButtonTouch>
    // <ButtonTouch
    //   initialTouchColor={"initialTouchColorAdvanced"}
    //   className={"bg-[#ff4b4b] w-[63px] h-[57px]"}
    // >
    //   <Libro className="absolute top-0 bottom-0 left-0 right-0 m-auto pointer-events-none" />
    // </ButtonTouch> */}
  );
};
