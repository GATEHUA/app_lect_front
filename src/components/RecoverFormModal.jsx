import React from "react";
import InputText from "./utils/InputText";
import Buttton from "./utils/Buttton";
import { BiArrowToRight } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { verifyCodeSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../store/UserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const RecoverFormModal = ({ correo }) => {
  const navigate = useNavigate();
  const { recoverPassword } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyCodeSchema),
  });
  const onSubmit = handleSubmit((values) => {
    toast.promise(recoverPassword(correo, values), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        navigate("/", { replace: true });
        // setDisableRegisterB(false);
        return <div>Inicio Sesion Correctamente</div>;
      },
      error: (error) => {
        // setDisableRegisterB(false);
        //   console.log(error);
        const arregloError = error.response.data;
        return arregloError.map((e) => (
          <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
        ));
      },
    });
  });
  return (
    <>
      {" "}
      <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Confírmanos que este correo electrónico te pertenece. Introduce el
        código incluido en el mensaje que hemos enviado a{" "}
        <p className="font-bold text-gray-300">{correo}</p>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <InputText
            {...register("codigoVerificacion")}
            message={errors.codigoVerificacion?.message}
            id="codigoVerificacion"
            className="p-2.5 text-center mb-3"
          />
        </div>

        <div className="flex justify-end mt-3">
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
    </>
  );
};
