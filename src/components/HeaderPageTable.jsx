import { IoIosAddCircle } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import Buttton from "./utils/Buttton";

export const HeaderPageTable = ({ onShowForm, handleChangue }) => {
  return (
    <div className="flex items-center justify-between pb-4 ">
      <div>
        <Buttton
          onClick={() => onShowForm()}
          className={`text-lg px-5 py-2 sm:py-1.5 font-medium flex justify-center items-center gap-x-2 bg-green-600  
            hover:bg-green-700 focus:ring-green-400
            `}
        >
          <p className="hidden sm:block">Agregar</p>
          <IoIosAddCircle size={18} />
        </Buttton>
      </div>
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
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
      </div>
    </div>
  );
};
