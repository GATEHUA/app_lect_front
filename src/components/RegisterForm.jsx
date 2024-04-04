import Buttton from "./utils/Buttton";
import InputText from "./utils/InputText";
import Label from "./utils/Label";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth";
import { toast } from "sonner";
import { useUserStore } from "../store/UserStore";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useState } from "react";
// import shallow from 'zustand/shallow'

// nombreUsuario
// apellidoPaterno
// apellidoMaterno
// nombres
// fechaNacimiento
// dni
// numeroTelefonicoPersonal
// generoSexo
// fotoPerfil
// correo
// rol
// contrasenia
// puntajeTotal
// estaVerificado
// codigoVerificacion

const RegisterForm = ({ onShowRegisterForm }) => {
  const [disableRegisterB, setDisableRegisterB] = useState(false);

  const { signUp } = useUserStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { generoSexo: "Hombre" },
    resolver: zodResolver(registerSchema),
  });

  const onSumbit = handleSubmit((values) => {
    setDisableRegisterB(true);

    toast.promise(signUp(values), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        setDisableRegisterB(false);
        return <div>Registrado Correctamente</div>;
      },
      error: (error) => {
        setDisableRegisterB(false);
        console.log(error);
        const arregloError = error.response.data;
        return arregloError.map((e) => (
          <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
        ));
      },
    });
  });
  return (
    <div className="relative w-full max-w-sm max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          onClick={() => {
            onShowRegisterForm(false);
          }}
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
        >
          <AiOutlineClose className="h-5 w-5" />
        </button>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Registrarte
          </h3>
          <form className="md:space-y-4 space-y-2" onSubmit={onSumbit}>
            <div className="flex w-full space-x-2">
              <div className="w-1/2">
                <InputText
                  {...register("apellidoPaterno")}
                  message={errors.apellidoPaterno?.message}
                  id="apellidoPaterno"
                  className="p-1"
                  placeholder="Apellido Paterno"
                />
              </div>
              <div className="w-1/2">
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
              <InputText
                {...register("nombres")}
                message={errors.nombres?.message}
                id="nombres"
                placeholder="Nombres"
                className="p-1"
              />
            </div>
            <div>
              <InputText
                {...register("correo")}
                message={errors.correo?.message}
                id="correoR"
                placeholder="Correo electrónico"
                className="p-1"
              />
            </div>
            <div>
              <InputText
                {...register("contrasenia")}
                message={errors.contrasenia?.message}
                id="contraseniaR"
                placeholder="Contraseña nueva"
                type="password"
                className="p-1"
              />
            </div>
            <div>
              <InputText
                {...register("dni", { pattern: /^[0-9]+$/ })}
                message={errors.dni?.message}
                id="dni"
                placeholder="N° de DNI"
                className="p-1"
              />
            </div>
            <div>
              <InputText
                {...register("numeroTelefonicoPersonal", {
                  valueAsNumber: true,
                })}
                type="number"
                message={errors.numeroTelefonicoPersonal?.message}
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
              <div>
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
              </div>
            </div>
            <div className="flex w-full space-x-1">
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

            <p className="text-xs text-left leading-relaxed text-gray-500 dark:text-gray-400">
              Al hacer clic en Registrarte, te enviaremos un código de
              confirmación al correo electrónico que nos proporciones para
              completar tu registro.
            </p>
            <div className="flex justify-center items-center">
              <Buttton
                disabled={disableRegisterB}
                className={`text-lg px-5 py-1.5 font-medium bg-green-600  ${
                  disableRegisterB
                    ? "cursor-not-allowed "
                    : "hover:bg-green-700 focus:ring-green-400 "
                }`}
              >
                Registrarte
              </Buttton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
