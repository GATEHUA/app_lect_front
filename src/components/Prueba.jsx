import { useParams } from "react-router-dom";
export const Prueba = () => {
  const paramas = useParams();
  return <div>{paramas.id}</div>;
};
