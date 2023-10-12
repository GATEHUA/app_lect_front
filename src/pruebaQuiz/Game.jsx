import { useRef, useState } from "react";
import { AlternativeG } from "../components/minicomponentes/AlternativeG";
import { ButtonTouch } from "../components/utils/ButtonTouch";
import { useQuestionStore } from "../store/QuestionStore";
import { Question } from "./Question";
import { GrNext, GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

import { ImNext2 } from "react-icons/im";
import { FooterG } from "../components/minicomponentes/FooterG";

const getBackgroundColor = (questionInfo, index) => {
  const { userSelectedAnswer, correctAnswer } = questionInfo;
  if (userSelectedAnswer == null) {
    return "transparent";
  }
  if (index !== correctAnswer && index !== userSelectedAnswer) {
    return "transparent";
  }
  if (index === correctAnswer) {
    return "green";
  }
  if (index === userSelectedAnswer) {
    return "red";
  }
  return "transparent";
};

export const Game = () => {
  // const select = useRef(null);
  const [select, setSelect] = useState(null);
  const questions = useQuestionStore((state) => {
    return state.questions;
  });
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];
  const { selectAnswer, goNextQuestion, goPreviousQuestion } =
    useQuestionStore();
  const createHandleClick = (answerIndex) => () => {
    selectAnswer(questionInfo.id, answerIndex);
  };

  console.log(questions.length);
  console.log(currentQuestion);

  return (
    <div className="max-heigth-full  w-full ">
      <div className="h-[74vh] relative top-0 overflow-auto  md:px-96">
        <div className="flex p-3 justify-center space-x-4 items-center">
          <button
            onClick={() => {
              setSelect(null);
              goPreviousQuestion();
            }}
            disabled={currentQuestion === 0}
            className={`border-2 rounded-full p-3 text-white ${
              currentQuestion === 0 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <MdNavigateNext style={{ transform: "scaleX(-1)" }} />
          </button>
          <div>
            {currentQuestion + 1} / {questions.length}
          </div>
          <button
            onClick={() => {
              setSelect(null);
              goNextQuestion();
            }}
            disabled={currentQuestion >= questions.length - 1}
            className={`border-2 rounded-full p-3 text-white ${
              currentQuestion >= questions.length - 1
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <MdNavigateNext />
          </button>
        </div>
        <Question info={questionInfo} />
        <br />
        <ul className=" space-y-4">
          {questionInfo.answers.map((answer, index) => (
            <AlternativeG
              name={questionInfo.id}
              checked={select == index}
              className={
                questionInfo.userSelectedAnswer != null
                  ? "cursor-not-allowed"
                  : "cursor-pointer dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:bg-gray-800 hover:bg-gray-100 bg-white"
              }
              disabled={questionInfo.userSelectedAnswer != null}
              style={{ background: getBackgroundColor(questionInfo, index) }}
              onChange={() => {
                // console.log(index);
                // select.current = index;
                setSelect(index);
              }}
              key={index}
            >
              {answer}
            </AlternativeG>
          ))}
        </ul>
        <div className="flex justify-center">
          <FooterG />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 h-[16vh] w-full justify-around flex px-6 py-10 border-t-2 dark:border-gray-500">
        <ButtonTouch
          initialTouchColor={"initialTouchColorGame"}
          className={`w-64  h-10 text-lg font-medium rounded-lg bottom-0 bg-transparent border border-[rgba(0,0,0,0.3)] `}
        >
          <div className="flex justify-center items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
            <p>Saltar</p>
          </div>
        </ButtonTouch>
        <ButtonTouch
          onClick={
            createHandleClick(select)
            // console.log(select.current);
          }
          initialTouchColor={"initialTouchColorBasic"}
          className={`w-64 h-10 text-lg rounded-lg bottom-0  bg-[#58cc02] `}
        >
          <div className="flex justify-center font-medium items-center space-x-2 hover:bg-[rgba(0,0,0,0.05)] h-full rounded-lg">
            <p>Comprobar</p>
          </div>
        </ButtonTouch>
      </div>
    </div>
  );
};
