import { NavLink } from "react-router-dom";

export const QualyNavLayout = ({ idl, idu }) => {
  return (
    <div className="md:flex justify-between p-4 grid grid-cols-3 text-xs">
      <NavLink to={`/qualify/estado/${idu}/${idl}`} className="link  border">
        Estado
      </NavLink>
      <NavLink
        to={`/qualify/partparrafo/${idu}/${idl}`}
        className="link  border"
      >
        Parrafos
      </NavLink>
      <NavLink to={`/qualify/responseq/${idu}/${idl}`} className="link  border">
        Respuestas
      </NavLink>
      <NavLink
        to={`/qualify/clasifpregun/${idu}/${idl}`}
        className="link  border"
      >
        Clasificación por niveles
      </NavLink>
      <NavLink
        to={`/qualify/youpreguntas/${idu}/${idl}`}
        className="link  border"
      >
        Preguntas creadas
      </NavLink>
      <NavLink
        to={`/qualify/productfinal/${idu}/${idl}`}
        className="link  border"
      >
        Producto Final
      </NavLink>
    </div>
  );
};
