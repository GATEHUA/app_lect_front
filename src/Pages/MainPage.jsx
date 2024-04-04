import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import In1 from "../assets/animations/animation_lmutenw4.json";
import In2 from "../assets/animations/animation_lmuw077w.json";
import A1 from "../assets/animations/animation_lmuw10bo.json";
import A2 from "../assets/animations/animation_lmuw1h0m.json";
import A3 from "../assets/animations/animation_lmuw1rtu.json";
import A4 from "../assets/animations/animation_lmuw26zc.json";
import A5 from "../assets/animations/animation_lmuw34bx.json";
import A6 from "../assets/animations/animation_lmuw3hvt.json";
import A7 from "../assets/animations/animation_lmuw467d.json";
import Ba2 from "../assets/animations/animation_lmuw730u.json";
import A9 from "../assets/animations/animation_lmuw7nk5.json";
import A10 from "../assets/animations/animation_lmuw7zlm.json";
import Ba1 from "../assets/animations/animation_lmuw95zv.json";

import { ButTchTooltipt } from "../components/utils/ButTchTooltipt";

import { getLecturasMainRequest, getLecturasRequest } from "../api/lecturas";
import { SectionMain } from "../components/minicomponentes/SectionMain";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/utils/Loading";
import { RiH1 } from "react-icons/ri";

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

  const licons = (c) => {
    return Math.floor((c + 3) / 8);
  };
  const ricons = (c) => {
    return Math.floor((c - 1) / 8);
  };
  const l1 = licons(lecturasR.current[1].length);
  const r1 = ricons(lecturasR.current[1].length);
  const l2 = licons(lecturasR.current[2].length);
  const r2 = ricons(lecturasR.current[2].length);
  const l3 = licons(lecturasR.current[3].length);
  const r3 = ricons(lecturasR.current[3].length);
  // console.log("(lecturasR.current[2] + 3) / 8");

  // console.log((lecturasR.current[2].length + 3) / 8);

  // const onClickR = (id) => navigate(`/reading/${id}`);
  // console.log("estado");

  // console.log(lecturas);
  // console.log("ref");

  // console.log(lecturasR.current);
  //740x139
  const RepetirComponente = ({ cantidadVeces, icon }) => {
    const componentesRepetidos = [];

    for (let i = 0; i < cantidadVeces; i++) {
      componentesRepetidos.push(
        <div
          key={i}
          className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center"
        >
          <Lottie animationData={icon} />
        </div>
      );
    }

    return <>{componentesRepetidos}</>;
  };

  return (
    <div className="bg-slate-200 dark:bg-[#131f24] h-full min-h-screen font-Poppins">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full justify-center">
          <div className="">
            <SectionMain
              color={"#58cc02"}
              tittle={"Nivel 1"}
              message={`Desarrolla tus habilidades de lectura en un
                  nivel de entrada,ideal para principiantes.`}
            />
            <div className="flex justify-center">
              {/* <div className="mt-[10.626rem] space-y-[30.004rem]"> */}
              {/* 45.629   42.504 */}
              <div className="mt-[7.501rem] sm:block hidden space-y-[30.004rem] min-w-[200px]">
                <RepetirComponente cantidadVeces={l1} icon={Ba1} />

                {/* <Lottie
                  // marginTop: "10.626rem",
                  style={{
                    // position: "absolute",
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                  animationData={Ba1}
                />
                <Lottie
                  // marginTop: "53.13rem",
                  // marginTop: "30.004rem",
                  style={{
                    // position: "absolute",
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                  animationData={Ba1}
                /> */}
                {/* <Lottie
                  // marginTop: "10.626rem",
                  style={{
                    // position: "absolute",
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                  animationData={Ba1}
                /> */}
              </div>
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
              <div className="mt-[28.753rem] sm:block hidden space-y-[30.004rem] min-w-[200px]">
                <RepetirComponente cantidadVeces={r1} icon={Ba2} />

                {/* <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie animationData={Ba2} />
                </div> */}
                {/* <div className="max-w-[12.5rem] max-h-[12.5rem] flex justify-center items-center">
                  <Lottie
                    // style={{
                    //   maxWidth: "200px",
                    //   maxHeight: "200px",
                    // }}
                    animationData={Ba2}
                  />
                </div>
                <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie
                    // style={{
                    //   maxWidth: "200px",
                    //   maxHeight: "200px",
                    // }}
                    animationData={Ba2}
                  />
                </div> */}
                {/* <Lottie
                  // marginTop: "28.753rem",
                  style={{
                    // position: "absolute",
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                  animationData={Ba2}
                />
                <Lottie
                  // marginTop: "28.753rem",
                  style={{
                    // position: "absolute",
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                  animationData={Ba2}
                /> */}
              </div>
            </div>
            <SectionMain
              color={"#1cb0f6"}
              tittle={"Nivel 2"}
              message={`Profundiza en la comprensión lectora con 
              textos más desafiantes y temas variados.`}
            />
            <div className="flex justify-center">
              <div className="mt-[7.501rem] sm:block hidden space-y-[30.004rem] min-w-[200px]">
                <RepetirComponente cantidadVeces={l2} icon={In1} />

                {/* <Lottie
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                  animationData={In1}
                />
                <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie animationData={A1} />
                </div>
                <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie animationData={In1} />
                </div> */}
              </div>
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
              <div className="mt-[28.753rem] sm:block hidden space-y-[30.004rem] min-w-[200px]">
                <RepetirComponente cantidadVeces={r2} icon={In2} />
                {/* 
                <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie animationData={In2} />
                </div>
                <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie animationData={A3} />
                </div>
                <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie animationData={A2} />
                </div> */}
              </div>
            </div>
            <SectionMain
              color={"#ff9600"}
              tittle={"Nivel 3"}
              message={`Supera tus límites con textos avanzados que te 
              desafiarán y enriquecerán tus habilidades de lectura.`}
            />
            <div className="flex justify-center">
              <div className="mt-[7.501rem] sm:block hidden space-y-[30.004rem] min-w-[200px]">
                <RepetirComponente cantidadVeces={l3} icon={A9} />

                {/* <Lottie
                  // marginTop: "10.626rem",
                  style={{
                    // position: "absolute",
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                  animationData={A9}
                /> */}
              </div>
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
              <div className="mt-[28.753rem] sm:block hidden space-y-[30.004rem] min-w-[200px]">
                <RepetirComponente cantidadVeces={r3} icon={A10} />

                {/* <div className="max-w-[12.5rem] h-[12.5rem] flex justify-center items-center">
                  <Lottie animationData={A10} />
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col">
            <Lottie
              style={{
                // maxWidth: "200px",
                // maxHeight: "200px",
                width: "200px",
                height: "200px",
              }}
              animationData={In1}
            />

            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={In2}
            />
            <Lottie
              size={200}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A1}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A2}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A3}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A4}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A5}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A6}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A7}
            />
            <Lottie
              style={{
                maxWidth: "12.5rem",
                maxHeight: "12.5rem",
              }}
              animationData={Ba2}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A9}
            />
            <Lottie
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              animationData={A10}
            />
          </div> */}
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
