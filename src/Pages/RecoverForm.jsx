import { useState } from "react";
import InputText from "../components/utils/InputText";
import Buttton from "../components/utils/Buttton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { recoverPasswordSchema } from "../schemas/auth";
import { useUserStore } from "../store/UserStore";
import { toast } from "sonner";
import { Modal } from "../components/Modal";
import { RecoverFormModal } from "../components/RecoverFormModal";

export const RecoverForm = () => {
  const [showRecoverAccountForm, setShowRecoverAccountForm] = useState(false);
  const { recoverPassword, recoverPasswordSend } = useUserStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recoverPasswordSchema),
  });
  const onShowRecoverAccountForm = (value) => {
    setShowRecoverAccountForm(value);
  };
  const onSumbit = handleSubmit((values) => {
    setShowRecoverAccountForm(false);
    toast.promise(recoverPasswordSend(values), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        setShowRecoverAccountForm(true);

        return <div>Codigo enviado exitosamente</div>;
      },
      error: (error) => {
        // setDisableRegisterB(false);
        console.log(error);
        const arregloError = error.response.data;
        return arregloError.map((e) => (
          <div key={e}>{`${arregloError.length > 1 ? "•" : ""}${e}`}</div>
        ));
      },
    });
  });
  console.log(showRecoverAccountForm);
  let correoValue = watch("correo");
  console.log(correoValue);
  return (
    <>
      <div className="bg-slate-200 dark:bg-slate-800 grid place-items-center h-screen p-2">
        <div className=" max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ingrese su correo electrónico
          </h5>

          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Confírmaremos que este correo electrónico te pertenece. Te
            enviaremos un codigo para poder Iniciar sesión de manera segura
            <p className="font-bold text-gray-300"></p>
          </div>
          <form onSubmit={onSumbit}>
            <div>
              <InputText
                {...register("correo")}
                placeholder="Correo electrónico"
                id="correo"
                className="p-2.5"
                type="email"
                message={errors.correo?.message}
              />
            </div>

            <div className="flex justify-end mt-3">
              <Link
                to={"/login"}
                className="text-white focus:outline-none rounded-lg focus:ring-4 text-sm inline-flex items-center px-3 py-2 text-center font-medium focus:ring-gray-400 bg-gray-500 hover:bg-gray-600"
              >
                Regresar
                <BiArrowToLeft className="w-3.5 h-3.5 ml-2" />
              </Link>
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
        <div
          className={`h-screen w-screen bg-[rgba(0,0,0,0.5)] z-10 fixed ${
            showRecoverAccountForm ? "grid" : "hidden"
          } place-items-center p-2 `}
        >
          <Modal
            onShowForm={onShowRecoverAccountForm}
            titleModal={"Recupera tu cuenta"}
            className={" max-w-sm "}
          >
            <RecoverFormModal correo={correoValue} />
          </Modal>
        </div>
      </div>
    </>
  );
};
