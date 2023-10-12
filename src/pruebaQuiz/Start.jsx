import Buttton from "../components/utils/Buttton";
import { useQuestionStore } from "../store/QuestionStore";

export const Start = () => {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);

  return (
    <Buttton
      className="ml-2 mt-8 text-sm inline-flex items-center px-3 py-2 text-center font-medium focus:ring-blue-400 bg-blue-600 hover:bg-blue-700"
      onClick={() => fetchQuestions(5)}
    >
      Empezar
    </Buttton>
  );
};
