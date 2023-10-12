import { ButtonTouch } from "./ButtonTouch";
import { Libro } from "../../icons/icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../config";

export const ButTchTooltipt = ({
  // onClick,
  colorPr,
  initialTouchColor,
  initialTouchColorTool,
  className,
  v,
  // hoverOnCl,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <ButtonTouch
        data-tooltip-id={v._id}
        initialTouchColor={initialTouchColor}
        className={` w-[67px] h-[61px] rounded-full ${className}`}
        style={{
          background: colorPr,
        }}
      >
        <Libro className="absolute top-0 bottom-0 left-0 right-0 m-auto pointer-events-none" />
      </ButtonTouch>
      <ReactTooltip
        id={v._id}
        closeOnScroll
        openOnClick
        clickable
        style={{
          background: colorPr,
          padding: "15px",
          borderRadius: "15px",
          zIndex: "999",
        }}
      >
        <div className={`bg-[${colorPr}] w-full h-full min-w-[14.5rem]  `}>
          <div
            className="text-base font-semibold tracking-tight mb-1"
            style={{ wordSpacing: "-0.2em" }}
          >
            {v.titulo}
          </div>
          <div className="flex text-sm">
            <p className="font-semibold">Grado:&nbsp;</p>
            <p>{v.grado}</p>
          </div>

          <ButtonTouch
            onClick={() => {
              navigate(`/reading/${v._id}`);
            }}
            initialTouchColor={initialTouchColorTool}
            className={`bg-white w-full mt-2 rounded-lg color-t font-medium font-sans py-1.5 text-lg hover:bg-gray-50`}
            style={{
              color: colorPr,
            }}
          >
            {/* <a
              href={`${API_URL}/public/lectura/contenido/${v.contenido}`}
              target="_blank"
            >
              {" "}
              Empezar
            </a> */}
            Empezar
          </ButtonTouch>
        </div>
      </ReactTooltip>
    </>
  );
};
