import InputText from "../components/utils/InputText";
import { useForm } from "react-hook-form";
import Label from "../components/utils/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, recoverPasswordSchema } from "../schemas/auth";
import LoginDescription from "../components/LoginDescription";
import Buttton from "../components/utils/Buttton";
import RegisterForm from "../components/RegisterForm";
import { useState, useEffect } from "react";
import { useUserStore } from "../store/UserStore";
import { Toaster, toast } from "sonner";
import { shallow } from "zustand/shallow";
import Cookies from "js-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated, errorsRg } = useUserStore(
    (state) => ({
      user: state.user,
      errorsRg: state.errors,
      isAuthenticated: state.isAuthenticated,
    }),
    shallow
  );
  const isValidated = user.estaVerificado;

  useEffect(() => {
    if (isAuthenticated && !isValidated) navigate("/code", { replace: true });
    if (isAuthenticated && isValidated) navigate("/", { replace: true });
  }, [isAuthenticated]);

  // const { signUp, noErrors } = useUserStore();
  const { signIn, recoverPassword, recoverPasswordSend } = useUserStore();
  // console.log("user");
  // console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSumbit = handleSubmit((values) => {
    toast.promise(signIn(values), {
      className: "dark:bg-gray-700 dark:text-white",
      loading: "Cargando...",
      success: () => {
        // setDisableRegisterB(false);
        return <div>Inicio Sesion Correctamente</div>;
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
  const onShowRegisterForm = (show) => {
    setShowRegisterForm(show);
  };

  // useEffect(() => {
  //   console.log("Cookies.get()");
  //   console.log(Cookies.get());
  //   // checkAuth();
  // }, []);
  return (
    <>
      {" "}
      <div className="dark:bg-slate-800 bg-slate-200 md:space-y-0 w-full md:flex md:justify-around md:items-center h-screen grid place-items-center p-5">
        {/* {showRegisterForm ? ( */}

        {/* ) : null} */}
        <LoginDescription />
        <div className="shadow-xl w-full text-center  max-w-sm p-4 bg-white border border-gray-200 rounded-lg  sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
          <div className="space-y-4">
            <form className="space-y-4" onSubmit={onSumbit}>
              <div>
                <InputText
                  {...register("correo")}
                  // {...register2("correo")}
                  placeholder="Correo electrónico"
                  id="correo"
                  className="p-2.5"
                  type="email"
                  message={errors.correo?.message}
                />
              </div>
              <div>
                <InputText
                  {...register("contrasenia")}
                  placeholder="Contraseña"
                  id="contrasenia"
                  className="p-2.5"
                  type="password"
                  message={errors.contrasenia?.message}
                />
              </div>
              <Buttton
                // color="blue"
                type="submit"
                className="text-lg px-5 py-2 font-semibold w-full  focus:ring-blue-400 bg-blue-600 hover:bg-blue-700"
              >
                Iniciar sesión
              </Buttton>

              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="rememberAccount"
                      name="rememberAccount"
                      type="checkbox"
                      {...register("rememberAccount")}
                      className="w-4 h-4 border border-gray-300 rounded bg-red-50 focus:ring-3 focus:ring-blue-300 dark:bg-red-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    />
                  </div>

                  <Label
                    id="rememberAccount"
                    htmlFor="rememberAccount"
                    className="ml-2 dark:text-gray-300"
                  >
                    Recuerdame
                  </Label>
                </div>
                <NavLink
                  to={"/recoverAccount"}
                  type="button"
                  className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  ¿Has olvidado la contraseña?
                </NavLink>
              </div>
            </form>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <Buttton
              // color="green"
              type="button"
              onClick={() => {
                setShowRegisterForm(true);
              }}
              className="text-lg px-5 py-2 font-semibold  focus:ring-green-400 bg-green-600 hover:bg-green-700"
            >
              Crear cuenta nueva
            </Buttton>
          </div>
        </div>

        <div
          className={`h-screen w-screen bg-[rgba(0,0,0,0.5)] z-10 fixed ${
            showRegisterForm ? "grid" : "hidden"
          } place-items-center p-2 `}
        >
          {/* {showRegisterForm ? ( */}
          <RegisterForm
            // setShowRegisterForm={setShowRegisterForm}
            onShowRegisterForm={onShowRegisterForm}
          />
          {/* ) : null} */}
        </div>
      </div>
      {/* <Toaster position="top-center" /> */}
    </>
  );
};

export default LoginPage;
