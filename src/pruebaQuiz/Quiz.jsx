import { useQuestionStore } from "../store/QuestionStore";
import { Game } from "./Game";
import { Start } from "./start";
export const Quiz = () => {
  const questions = useQuestionStore((state) => state.questions);

  return (
    <>
      <div className="dark:bg-slate-800 font-Poppins h-screen w-full dark:text-white">
        <div className="text-2xl flex justify-center w-full h-[10vh] relative top-0 pt-6">
          Cuestionario
        </div>
        {questions.length === 0 ? <Start /> : <Game />}
      </div>
    </>
  );
};
