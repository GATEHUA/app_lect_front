import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiSwordLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi2";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";
import { FaRankingStar } from "react-icons/fa6";
import { BiUser } from "react-icons/bi";
import { MdMenu } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { ImExit } from "react-icons/im";
import { useUserStore } from "../../store/UserStore";
import { toast } from "sonner";

export const SideBar = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { signOut } = useUserStore();
  const onLogout = () => {
    toast("¿Está seguro de que desea Cerrar Sesión?", {
      className: "dark:bg-gray-700 dark:text-white",
      action: {
        label: "Sí, salir",
        onClick: () => {
          toast.promise(signOut(), {
            className: "dark:bg-gray-700 dark:text-white",
            loading: "Cargando...",
            success: () => {
              navigate("/login", { replace: true });
              return (
                <>
                  <AiFillCheckCircle />
                  <p> Cierre de Sesión Exitoso</p>
                </>
              );
            },
            error: "Ocurrió un error",
          });
        },
      },
      duration: Infinity,
    });
  };
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClass = isOpen ? "sidebar-open" : "sidebar-closed";
  const arrowClass = isOpen ? "" : "rotate-180";

  return (
    <>
      {" "}
      <div>
        <div
          className={`bg-white dark:bg-slate-800 text-gray shadow-2xl z-[999] max-w-[16rem] h-screen overflow-hidden fixed sm:sticky top-0 left-0 ${sidebarClass} `}
        >
          <div className="flex items-center gap-7 font-medium border-b text-2xl border-slate-300 py-3 mx-2.5">
            <img src="/images/i_c.png" alt="" width={40} />
            <span className="text-xl whitespace-pre">C.N.I.3 - A.R.L.</span>
          </div>
          <div className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-3  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
              <>
                <li>
                  <NavLink to={"/"} className="link">
                    <HiOutlineHome size={23} className="min-w-max" />
                    Inicio
                  </NavLink>
                </li>
                {user.rol == "Administrador" && (
                  <li>
                    <NavLink to={"/users"} className="link ">
                      <PiUsersThree size={23} className="min-w-max" />
                      Usuarios
                    </NavLink>
                  </li>
                )}
                {user.rol !== "Usuario" && (
                  <li>
                    <NavLink to={"/myreadings"} className="link">
                      <LiaSwatchbookSolid size={23} className="min-w-max" />
                      Mis Lecturas
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink to={"/ranking"} className="link">
                    <FaRankingStar size={23} className="min-w-max" />
                    Clasificación
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/challenges"} className="link">
                    <RiSwordLine size={23} className="min-w-max" />
                    Desafios
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/perfil/:id"} className="link">
                    <BiUser size={23} className="min-w-max" />
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/settings"} className="link">
                    <SlSettings size={23} className="min-w-max" />
                    Configuración
                  </NavLink>
                </li>
              </>
            </ul>
            <div className="flex-1 text-sm z-50 max-h-48 my-auto w-full  whitespace-pre  font-medium">
              <div className=" border-y border-slate-300 py-2 px-2.5 ">
                <div className="overflow-hidden">
                  <button className="link w-full" onClick={onLogout}>
                    <ImExit size={23} className="min-w-max" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={toggleSidebar}
            className={`absolute w-fit h-fit z-50 right-2.5 hover:bg-slate-700 rounded-full  p-2.5 bottom-5 cursor-pointer sm:block hidden ${arrowClass}`}
          >
            <IoIosArrowBack size={25} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <button
          onClick={toggleSidebar}
          className="m-1 dark:hover:bg-slate-500 rounded-full p-1 dark:text-white block sm:hidden fixed top-0 cursor-pointer"
        >
          <MdMenu size={25} />
        </button>
      ) : (
        <div
          onClick={toggleSidebar}
          className={`sm:hidden fixed inset-0 max-h-screen z-[998] bg-[rgba(0,0,0,0.5)]`}
        ></div>
      )}
      {children}
    </>
  );
};

<>
  <li>
    <NavLink to={"/"} className="link">
      <HiOutlineHome size={23} className="min-w-max" />
      Inicio
    </NavLink>
  </li>
  <li>
    <NavLink to={"/users"} className="link ">
      <PiUsersThree size={23} className="min-w-max" />
      Usuarios
    </NavLink>
  </li>
  <li>
    <NavLink to={"/myreadings"} className="link">
      <LiaSwatchbookSolid size={23} className="min-w-max" />
      Mis Lecturas
    </NavLink>
  </li>
  <li>
    <NavLink to={"/ranking"} className="link">
      <FaRankingStar size={23} className="min-w-max" />
      Clasificación
    </NavLink>
  </li>
  <li>
    <NavLink to={"/challenges"} className="link">
      <RiSwordLine size={23} className="min-w-max" />
      Desafios
    </NavLink>
  </li>
  <li>
    <NavLink to={"/perfil/:id"} className="link">
      <BiUser size={23} className="min-w-max" />
      Perfil
    </NavLink>
  </li>
  <li>
    <NavLink to={"/settings"} className="link">
      <SlSettings size={23} className="min-w-max" />
      Configuración
    </NavLink>
  </li>
</>;
