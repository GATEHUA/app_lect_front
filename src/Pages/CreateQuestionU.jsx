import { useParams } from "react-router-dom";

export const CreateQuestionU = () => {
  const params = useParams();
  return <div>{params.id}</div>;
};
