import { ButtonTouch } from "../utils/ButtonTouch";
import { RiListUnordered } from "react-icons/ri";

export const SectionMain = ({ color, tittle, message }) => {
  return (
    <div
      className="md:w-[45rem]  h-28 sm:rounded-2xl mt-7 mb-6 text-white flex justify-between py-3 px-4"
      style={{
        background: color,
      }}
    >
      <div className="sm:space-y-2 md:block flex items-center">
        <h1 className="font-semibold text-2xl">{tittle}</h1>
        <p className="font-base text-sm whitespace-pre-line md:block hidden">
          {message}
        </p>
      </div>
      <div className="flex items-center">
        <ButtonTouch
          initialTouchColor={"initialTouchColorSec"}
          className="p-4 bg-transparent font-semibold border-[rgba(0,0,0,0.4)] hover:text-gray-200 border-2 rounded-lg h-11 flex justify-center items-center space-x-2"
        >
          <RiListUnordered size={20} />
          <p>Orden</p>
        </ButtonTouch>
      </div>
    </div>
  );
};
