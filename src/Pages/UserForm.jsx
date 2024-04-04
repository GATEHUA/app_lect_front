import { useLocation, useNavigate, useParams } from "react-router-dom";
import Buttton from "../components/utils/Buttton";
import InputText from "../components/utils/InputText";
import Label from "../components/utils/Label";
import { AiOutlineRollback } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, updateUserSchema } from "../schemas/user";
import { AiFillSave } from "react-icons/ai";

import {
  createUsuarioRequest,
  getUsuarioRequest,
  updateUsuarioRequest,
} from "../api/users";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { formatearDatetoText } from "../helpers/formateDate";
import { BUCKET } from "../config";
import { verifyTokenRequest } from "../api/auth";
import { useUserStore } from "../store/UserStore";

export const UserForm = () => {
  const user = useUserStore((state) => state.user);

  const [foto, setFoto] = useState(null);

  const correoOr = useRef(null);
  const dniOr = useRef(null);
  const idS = useRef(null);

  const location = useLocation();
  // console.log("location.pathname");
  // console.log(location.pathname);
  const defSchema = useRef({
    defaultValues: {
      generoSexo: "Hombre",
      estaVerificado: "false",
      rol: "Usuario",
    },
    resolver: zodResolver(createUserSchema),
  });
  const paramas = useParams();
  const getUser = async (id) => {
    try {
      let res;
      if (location.pathname === "/settings") {
        res = await verifyTokenRequest();
        // const { data } = res;
        // // idS.current = data._id;
        // setIds(data._id);
      } else {
        res = await getUsuarioRequest(id);
      }
      const { data } = res;
      idS.current = data._id;
      // setIds(data._id);

      setValue("fechaNacimiento", formatearDatetoText(data.fechaNacimiento));
      setValue("generoSexo", data.generoSexo);
      setValue("estaVerificado", String(data.estaVerificado));
      setValue("rol", data.rol);
      setValue("apellidoPaterno", data.apellidoPaterno);
      setValue("apellidoMaterno", data.apellidoMaterno);
      setValue("nombres", data.nombres);
      correoOr.current = data.correo;
      setValue("correo", data.correo);
      // setValue("contrasenia", data.contrasenia);
      dniOr.current = data.dni;
      setValue("dni", data.dni);
      setValue("numeroTelefonicoPersonal", data.numeroTelefonicoPersonal);
      setValue("nivel", data.nivel);
      setValue("grado", data.grado);
      setValue("seccion", data.seccion);
      // setValue("fotoPerfil", data.fotoPerfil);
      setFoto(data.fotoPerfil);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(idS.current);

  useEffect(() => {
    if (paramas.id || location.pathname === "/settings") {
      getUser(paramas.id);
      defSchema.current = {
        resolver: zodResolver(updateUserSchema),
      };
    } else {
      defSchema.current = {
        defaultValues: {
          generoSexo: "Hombre",
          estaVerificado: "false",
          rol: "Usuario",
        },
        resolver: zodResolver(createUserSchema),
      };
    }
  }, [paramas.id]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm(defSchema.current);
  const onSubmit = handleSubmit((values) => {
    // console.log(values);
    if (values.correo === correoOr.current) {
      values.correo = null;
    }
    if (values.dni === dniOr.current) {
      values.dni = null;
    }
    // console.log(values);
    if (paramas.id || location.pathname === "/settings") {
      toast.promise(updateUsuarioRequest(idS.current, values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          setValue("deleteFotoPerfil", false);
          handleClear();
          getUser(paramas.id);
          return <div>Datos Actualizado Correctamente</div>;
        },
        error: (error) => {
          // setDisableRegisterB(false);
          const arregloError = error.response.data;
          return arregloError.map((e) => (
            <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
          ));
        },
      });
    } else {
      toast.promise(createUsuarioRequest(values), {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          // setDisableRegisterB(false);
          reset({
            fechaNacimiento: null,
            generoSexo: "Hombre",
            estaVerificado: "false",
            rol: "Usuario",
            apellidoPaterno: "",
            apellidoMaterno: "",
            nombres: "",
            correo: "",
            contrasenia: "",
            dni: null,
            numeroTelefonicoPersonal: null,
            fotoPerfil: null,
            nivel: "",
            grado: "",
            seccion: "",
          });
          return <div>Usuario Creado Correctamente</div>;
        },
        error: (error) => {
          // setDisableRegisterB(false);
          const arregloError = error.response.data;
          return arregloError.map((e) => (
            <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
          ));
        },
      });
    }
  });

  const handleClear = () => {
    setValue("fotoPerfil", null);
  };

  // console.log("foto");
  // console.log(foto);
  return (
    <div className=" h-full w-full">
      <div className="">
        <div className="px-7 py-7 lg:px-8 h-full">
          <div className="flex justify-between items-center mb-4">
            {location.pathname !== "/settings" ? (
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {paramas.id ? "Editar usuario" : "Crear usuario"}
              </h3>
            ) : (
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Editar perfil
              </h3>
            )}
            {location.pathname !== "/settings" && (
              <Buttton
                onClick={() => navigate("/users")}
                className={`text-lg px-5 py-1.5 font-medium flex justify-center items-center gap-x-2 bg-red-600  
            hover:bg-red-700 focus:ring-red-400
            `}
              >
                Regresar
                <AiOutlineRollback size={18} />
              </Buttton>
            )}
          </div>
          <form
            className="space-y-2"
            onSubmit={onSubmit}
            // encType="multipart/form-data"
          >
            <div className="flex w-full space-x-2">
              <div className="w-1/2">
                <Label
                  htmlFor="apellidoPaterno"
                  className="dark:text-white mb-2"
                >
                  Apellido Paterno
                </Label>
                <InputText
                  {...register("apellidoPaterno")}
                  message={errors.apellidoPaterno?.message}
                  id="apellidoPaterno"
                  className="p-1"
                  placeholder="Apellido Paterno"
                />
              </div>
              <div className="w-1/2">
                <Label
                  htmlFor="apellidoMaterno"
                  className="dark:text-white mb-2"
                >
                  Apellido Materno
                </Label>
                <InputText
                  {...register("apellidoMaterno")}
                  message={errors.apellidoMaterno?.message}
                  id="apellidoMaterno"
                  className="p-1"
                  placeholder="Apellido Materno"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="nombres" className="dark:text-white mb-2">
                Nombres
              </Label>
              <InputText
                {...register("nombres")}
                message={errors.nombres?.message}
                id="nombres"
                placeholder="Nombres"
                className="p-1"
              />
            </div>
            <div>
              <Label htmlFor="correo" className="dark:text-white mb-2">
                Correo
              </Label>
              <InputText
                {...register("correo")}
                message={errors.correo?.message}
                id="correo"
                placeholder="Correo electrónico"
                className="p-1"
              />
            </div>
            <div>
              <Label htmlFor="contrasenia" className="dark:text-white mb-2">
                Contraseña
              </Label>
              <InputText
                {...register("contrasenia")}
                message={errors.contrasenia?.message}
                id="contrasenia"
                placeholder="Contraseña nueva"
                type="password"
                className="p-1"
              />
            </div>
            <div>
              <Label htmlFor="dni" className="dark:text-white mb-2">
                N° de DNI
              </Label>
              <InputText
                {...register("dni", { pattern: /^[0-9]+$/ })}
                message={errors.dni?.message}
                id="dni"
                placeholder="N° de DNI"
                className="p-1"
              />
            </div>
            <div>
              <Label
                htmlFor="numeroTelefonicoPersonal"
                className="dark:text-white mb-2"
              >
                N° de telefono
              </Label>
              <InputText
                {...register("numeroTelefonicoPersonal", {
                  valueAsNumber: true,
                })}
                message={errors.numeroTelefonicoPersonal?.message}
                type="number"
                id="numeroTelefonicoPersonal"
                placeholder="N° de Celular"
                className="p-1"
              />
            </div>
            <div className="flex w-full space-x-2">
              <div className="w-1/2">
                <Label
                  htmlFor="fechaNacimiento"
                  className="dark:text-white mb-2"
                >
                  Fecha de nacimiento
                </Label>
                <InputText
                  {...register("fechaNacimiento")}
                  message={errors.fechaNacimiento?.message}
                  id="fechaNacimiento"
                  placeholder="Contraseña nueva"
                  type="date"
                  className="p-1 "
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="generoSexo" className="dark:text-white mb-2">
                  Género
                </Label>

                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 sm:border-b-0 border-r dark:border-gray-600">
                    <div className="flex items-center pl-1.5">
                      <input
                        id="generoSexoH"
                        type="radio"
                        value="Hombre"
                        // className="  "
                        // checked={true}
                        name="generoSexoM"
                        {...register("generoSexo")}
                      />
                      <Label
                        htmlFor="generoSexoH"
                        className="dark:text-gray-300 w-full py-2 pr-2 ml-1.5"
                      >
                        Hombre
                      </Label>
                    </div>
                  </li>

                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-1.5">
                      <input
                        id="generoSexoM"
                        type="radio"
                        value="Mujer"
                        className=""
                        name="generoSexoM"
                        {...register("generoSexo")}
                      />
                      <Label
                        htmlFor="generoSexoM"
                        className="dark:text-gray-300 w-full py-2 pr-2 ml-1.5"
                      >
                        Mujer
                      </Label>
                    </div>
                  </li>
                </ul>
                {errors.generoSexo && (
                  <span className="text-red-500">
                    {errors.generoSexo.message}
                  </span>
                )}
              </div>
            </div>
            {user.rol != "Usuario" && (
              <div className="flex w-full space-x-2">
                <div className="w-1/2">
                  <Label htmlFor="rol" className="dark:text-white mb-2">
                    Rol
                  </Label>

                  <select
                    id="rol"
                    className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
                    {...register("rol")}
                  >
                    <option value="Usuario">Usuario</option>
                    <option value="Profesor">Profesor</option>
                    <option value="Administrador">Administrador</option>
                  </select>

                  {errors.rol && (
                    <span className="text-red-500">{errors.rol.message}</span>
                  )}
                </div>
                <div className="w-1/2">
                  <Label
                    htmlFor="estaVerificado"
                    className="dark:text-white mb-2"
                  >
                    Estado
                  </Label>
                  <select
                    id="estaVerificado"
                    className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
                    {...register("estaVerificado")}
                  >
                    <option value="true">Verificado</option>
                    <option value="false">No verificado</option>
                  </select>
                  {errors.estaVerificado && (
                    <span className="text-red-500">
                      {errors.estaVerificado.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex w-full space-x-3">
              <div className="w-1/3">
                <Label htmlFor="nivel" className="dark:text-white mb-2">
                  Nivel
                </Label>
                <select
                  id="nivel"
                  className=" bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
                  {...register("nivel")}
                >
                  <option value="">-</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  {/* <option value="No definido">No definido</option> */}
                </select>
                {errors.nivel && (
                  <span className="text-red-500">{errors.nivel?.message}</span>
                )}
              </div>
              <div className="w-1/3">
                <Label htmlFor="grado" className="dark:text-white mb-2">
                  Grado
                </Label>
                <select
                  id="grado"
                  className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
                  {...register("grado")}
                >
                  <option value="">-</option>
                  <option value="1°">1°</option>
                  <option value="2°">2°</option>
                  <option value="3°">3°</option>
                  <option value="4°">4°</option>
                  <option value="5°">5°</option>
                  {watch("nivel") === "Primaria" && (
                    <option value="6°">6°</option>
                  )}
                  {/* <option value="No definido">No definido</option> */}
                </select>
                {errors.grado && (
                  <span className="text-red-500">{errors.grado?.message}</span>
                )}
              </div>
              <div className="w-1/3">
                <Label htmlFor="seccion" className="dark:text-white mb-2">
                  Sección
                </Label>
                <select
                  id="seccion"
                  className="bg-gray-50 border-[1.7px]  text-gray-900 rounded-lg block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 p-1.5"
                  {...register("seccion")}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                  {/* <option value="No definido">No definido</option> */}
                </select>
                {errors.seccion && (
                  <span className="text-red-500">
                    {errors.seccion?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-full space-x-7">
                <Label htmlFor="fotoPerfil" className="dark:text-white mb-2">
                  Foto&nbsp;de&nbsp;perfil
                </Label>
                <div>
                  <div className="relative w-20">
                    <label htmlFor="fotoPerfil">
                      {watch("fotoPerfil")?.length === 1 &&
                      watch("fotoPerfil") ? (
                        <img
                          className="w-20 h-24 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 rounded-lg"
                          src={URL.createObjectURL(watch("fotoPerfil")[0])}
                        />
                      ) : foto && !watch("deleteFotoPerfil") ? (
                        <img
                          className="w-20 h-24 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 rounded-lg"
                          src={`${BUCKET}/public/usuario/foto/${foto}`}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-20 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AiOutlineCloudUpload className="w-9 h-9 mt-1 text-gray-500 dark:text-gray-400" />

                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                              <span className="font-semibold">
                                Cargue su foto
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      <input
                        accept="image/*"
                        {...register("fotoPerfil")}
                        id="fotoPerfil"
                        type="file"
                        className="hidden"
                      />
                    </label>

                    {watch("fotoPerfil")?.length === 1 &&
                      watch("fotoPerfil") && (
                        <>
                          <div className="text-sm  w-[287%]">
                            {watch("fotoPerfil")[0].name}
                          </div>
                          <button
                            type="button"
                            className="top-[-7px] right-[-7px] absolute bg-red-600  
                      hover:bg-red-700 focus:ring-red-400 z-10 w-6 h-6 flex justify-center items-center rounded-md cursor-pointer text-white"
                            onClick={handleClear}
                          >
                            <AiOutlineClose />
                          </button>
                        </>
                      )}
                    {foto && !watch("deleteFotoPerfil") && (
                      <div className="text-sm  w-[287%]">{foto}</div>
                    )}
                  </div>

                  {/* {watch("fotoPerfil")?.length === 1 && watch("fotoPerfil") && (
                    <>
                      <div className="flex justify-center text-sm">
                        {watch("fotoPerfil")[0].name}
                      </div>{" "}
                    </>
                  )} */}
                </div>
                {((foto && !watch("fotoPerfil")) ||
                  (foto && watch("fotoPerfil")?.length === 0)) && (
                  <div className="flex items-center ">
                    <div className="flex items-center h-5">
                      <input
                        id="deleteFotoPerfil"
                        name="deleteFotoPerfil"
                        type="checkbox"
                        {...register("deleteFotoPerfil")}
                        className="w-4 h-4 border border-gray-300 rounded bg-red-50 focus:ring-3 focus:ring-blue-300 dark:bg-red-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      />
                    </div>

                    <Label
                      id="deleteFotoPerfil"
                      htmlFor="deleteFotoPerfil"
                      className="ml-2 dark:text-gray-300"
                    >
                      Quitar foto actual
                    </Label>
                  </div>
                )}
              </div>
              {errors.fotoPerfil && (
                <span className="text-red-500">
                  {errors.fotoPerfil.message}
                </span>
              )}
            </div>

            <div className="flex justify-center items-center">
              <Buttton
                type="submit"
                className={`text-lg px-5 py-1.5 font-medium bg-blue-600  
        hover:bg-blue-700 focus:ring-blue-400 flex items-center  justify-center gap-x-2
        `}
              >
                <AiFillSave />
                Guardar
              </Buttton>
            </div>
          </form>
        </div>
      </div>

      {/* <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre> */}
    </div>
  );
};
