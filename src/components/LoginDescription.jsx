import { useTypewriter, Cursor } from "react-simple-typewriter";

const LoginDescription = () => {
  const [text] = useTypewriter({
    words: [
      "Fortalecer las habilidades de lectura ➡️ 💪📖",
      "Ampliar el dominio de la lectura ➡️ 📚🌐",
      "Incrementar las destrezas de lectura ➡️ 📈📖",
      "Desarrollar la competencia lectora ➡️ 📚🧠",
    ],
    loop: {},
    typeSpeed: 100,
    delaySpeed: 2000,
  });
  return (
    <div className="md:flex md:items-center text-center md:text-left mx-auto">
      <a href="/">
        {/* <div className="rounded-full bg-white p-2"> */}
        <img src="./images/fondo.png" className="w-40  m-auto" alt="" />
        {/* </div> */}
      </a>
      <div className="md:ml-4 md:mt-0 mt-2">
        <h1 className="dark:text-white text-blue-500 text-4xl font-bold">
          EL CAMINAR LECTOR CAPACHO
        </h1>
        <h1 className="dark:text-gray-300 text-gray-700 text-xl font-medium hidden md:block">
          Buscamos: <span className="text-blue-500">{text}</span>
          <span className="text-red-600">
            <Cursor cursorStyle="|" />
          </span>
        </h1>
      </div>
    </div>
  );
  a;
};

export default LoginDescription;
