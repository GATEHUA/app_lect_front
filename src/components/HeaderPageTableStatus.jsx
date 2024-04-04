import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const HeaderPageTableStatus = ({ handleChangue }) => {
  return (
    <div className="flex items-center justify-between pb-4 ">
      <div className="flex space-x-2">
        <NavLink to={`/qualify/my`} className="link  border">
          Mis Lecturas
        </NavLink>
        <NavLink to={`/qualify/all`} className="link  border">
          Todas las Lecturas
        </NavLink>
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
