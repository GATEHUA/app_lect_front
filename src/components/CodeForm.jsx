import Buttton from "./utils/Buttton";
import InputText from "./utils/InputText";
import { toast } from "sonner";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import { useUserStore } from "../store/UserStore";
import { shallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema } from "../schemas/auth";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const CodeForm = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated } = useUserStore(
    (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
    shallow
  );

  const { checkVerify, signOut, generateCode } = useUserStore();
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyCodeSchema),
  });

  // console.log(errors.codigoVerificacion?.message);

  const onGenerateCode = () => {
    setDisabled(true);
    toast.promise(generateCode(user.correo), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        // setDisableRegisterB(false);
        // navigate("/", { replace: true });

        return (
          <div>
            Codigo reenviado.
            <p>Asegúrate de consultar la carpeta de spam</p>
          </div>
        );
      },
      error: (error) => {
        // setDisableRegisterB(false);
        const arregloError = error.response.data;
        return arregloError.map((e) => (
          <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
        ));
      },
      finally: () => {
        setDisabled(false);
      },
    });
  };

  const onSumbit = handleSubmit((values) => {
    // console.log(values);
    // checkVerify(user.correo, values);
    toast.promise(checkVerify(user.correo, values), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        // setDisableRegisterB(false);
        // navigate("/", { replace: true });
        return <div>Codigo Correcto</div>;
      },
      error: (error) => {
        // setDisableRegisterB(false);
        const arregloError = error.response.data;
        return arregloError.map((e) => (
          <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
        ));
      },
    });
  });
  useEffect(() => {
    if (!isAuthenticated && !user.estaVerificado)
      navigate("/login", { replace: true });
    if (isAuthenticated && user.estaVerificado)
      navigate("/", { replace: true });
  }, [isAuthenticated, user]);
  const onLogout = () => {
    toast.promise(signOut(), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: "Cierre de Sesión Exisitoso",
      error: "Ocurrio un error",
    });
  };
  return (
    <>
      {/* <Modal /> */}
      <div className="bg-slate-200 dark:bg-slate-800 grid place-items-center h-screen p-2">
        <div className=" max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Introduce el código que aparece en el correo electrónico
          </h5>

          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Confírmanos que este correo electrónico te pertenece. Introduce el
            código incluido en el mensaje que hemos enviado a{" "}
            <p className="font-bold text-gray-300">{user.correo}</p>
          </div>
          <form onSubmit={onSumbit}>
            <div>
              <InputText
                {...register("codigoVerificacion")}
                message={errors.codigoVerificacion?.message}
                id="codigoVerificacion"
                className="p-2.5 text-center mb-3"
              />
            </div>
            <button
              disabled={disabled}
              type="button"
              onClick={onGenerateCode}
              className={`text-blue-600 dark:text-blue-500 ${
                disabled ? "cursor-not-allowed " : " hover:underline"
              }`}
            >
              Volver a enviar correo
            </button>
            <div className="flex justify-end mt-3">
              <Buttton
                onClick={onLogout}
                type="button"
                className=" text-sm inline-flex items-center px-3 py-2 text-center font-medium focus:ring-gray-400 bg-gray-500 hover:bg-gray-600"
              >
                Cambiar de cuenta
                <BiArrowToLeft className="w-3.5 h-3.5 ml-2" />
              </Buttton>
              <Buttton
                type="submit"
                href="#"
                className="ml-2 text-sm inline-flex items-center px-3 py-2 text-center font-medium focus:ring-blue-400 bg-blue-600 hover:bg-blue-700"
              >
                Continuar
                <BiArrowToRight className="w-3.5 h-3.5 ml-2" />
              </Buttton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CodeForm;
