import { useForm } from "react-hook-form";
import { createLecturaRequest } from "../api/lecturas";
export default function LecturaFormPage() {
  console.log("asdhajks");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  // console.log(errors);
  // const {
  //   titulo,
  //   contenidoUrl,
  //   description,
  //   fuente,
  //   portadaUrl,
  //   grado,
  //   nivelDificultad,
  //   genero,
  // } = lectura;
  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    const res = await createLecturaRequest(data);
    console.log(res);
  });

  return (
    <div className="bg-slate-500 w-full h-screen p-5 flex justify-center items-center">
      {/* <label class="block">
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Email
        </span>
        <input
          type="email"
          name="email"
          class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="you@example.com"
        />
      </label> */}
      <form className="" onSubmit={onSubmit} encType="multipart/form-data">
        <label className="block ">
          Titulo
          <input
            type="text"
            {...register("titulo", {
              required: {
                value: true,
                message: "Titulo es Requerido",
              },
              minLength: {
                value: 2,
                message: "Titulo debe tener almenos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "Titulo no debe exceder de 20 caracteres",
              },
            })}
          />
        </label>
        {errors.titulo && <span>{errors.titulo.message}</span>}

        <label className="block mt-5">
          Contenido
          <input
            type="file"
            // {...register("contenido")}
            onChange={(e) => {
              setValue("contenido", e.target.files[0]);
            }}
          />
        </label>
        <label className="block mt-5">
          Descripcion
          <input type="text" {...register("description")} />
        </label>
        <label className="block mt-5">
          Portada
          <input
            type="file"
            // {...register("portada")}
            onChange={(e) => {
              setValue("portada", e.target.files[0]);
            }}
          />
        </label>
        <label className="block mt-5">
          Grado
          <input type="text" {...register("grado")} />
        </label>
        <label className="block mt-5">
          Nivel de Dificultad
          <select {...register("nivelDificultad")}>
            <option value={1}>Basico</option>
            <option value={2}>Intermedio</option>
            <option value={3}>Avanzado</option>
          </select>
        </label>
        <label className="block mt-5">
          Genero
          <input type="text" {...register("genero")} />
        </label>
        <button className="block mt-5" type="submit">
          Agregar Lectura
        </button>
        {/* <pre className="bg-black text-white" style={{ width: "400px" }}>
          {JSON.stringify(watch(), null, 2)}
        </pre> */}
      </form>
    </div>
  );
}
