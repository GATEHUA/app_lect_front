import { IoIosAddCircle } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import Buttton from "./utils/Buttton";
import {
  AiFillSave,
  AiOutlineRollback,
  AiFillFileAdd,
  AiFillQuestionCircle,
} from "react-icons/ai";
import { PiNotebookBold } from "react-icons/pi";
import { BsPatchQuestionFill } from "react-icons/bs";
import { useUserStore } from "../store/UserStore";
import { ButtonTouch } from "./utils/ButtonTouch";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export const HeaderPageTableQuestion = ({
  onShowForm,
  onShowEditReading,
  onShowFormManyQuestions,
  onShowFormQuestion,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location");

  const showButton = location.pathname.startsWith("/create_question_u/");
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-center justify-between pb-4 ">
      {showButton && (
        <div className=" fixed top-0 right-0 p-4 flex space-x-2">
          <ButtonTouch
            onClick={() => navigate(`/product_final/${params.id}`)}
            initialTouchColor={"initialTouchColorIntermediate"}
            className={`w-full h-10 text-white text-lg rounded-lg bg-[#1cb0f6] `}
          >
            <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
              <AiFillFileAdd />
              <p className="hidden lg:block">Producto</p>
            </div>
          </ButtonTouch>
          <ButtonTouch
            onClick={() => navigate(`/reading/${params.id}`)}
            initialTouchColor={"initialTouchColorBack"}
            className={`w-full h-10 text-white text-lg rounded-lg bg-[#ff4b4b] `}
          >
            <div className="flex px-3 justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
              <PiNotebookBold />
              <p className="hidden lg:block">Lectura</p>
            </div>
          </ButtonTouch>
        </div>
      )}
      <div className="flex space-x-2">
        <Buttton
          onClick={() => onShowFormQuestion(true)}
          className={`text-lg px-5 py-2 sm:py-1.5 font-medium flex justify-center items-center gap-x-2 bg-green-600  
            hover:bg-green-700 focus:ring-green-400
            `}
        >
          <p className="hidden sm:block">Agregar 1</p>
          <IoIosAddCircle size={18} />
        </Buttton>

        <Buttton
          onClick={() => onShowFormManyQuestions(true)}
          className={`text-lg px-5 py-2 sm:py-1.5 font-medium flex justify-center items-center gap-x-2 bg-green-600  
            hover:bg-green-700 focus:ring-green-400
            `}
        >
          <p className="hidden sm:block">Agregar N</p>
          <BsPatchQuestionFill size={18} />
        </Buttton>
        {user.rol !== "Usuario" && (
          <Buttton
            onClick={() => onShowEditReading()}
            className={`text-lg px-5 sm:py-1.5 py-2.5 font-medium flex justify-center items-center gap-x-2 bg-sky-600  
        hover:bg-sky-700 focus:ring-sky-400
        `}
          >
            <p className="hidden sm:block ">Editar Lectura</p>
            <AiOutlineRollback size={18} />
          </Buttton>
        )}
      </div>
      {/* <label htmlFor="table-search" className="sr-only">
        Search
      </label> */}
      {/* <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="table-search-users"
          onChange={handleChangue}
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-auto sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar..."
        />
      </div> */}
    </div>
  );
};
