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
          <form className="space-y-4" onSubmit={onSumbit}>
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
                {...register("dni", { valueAsNumber: true })}
                type="number"
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
