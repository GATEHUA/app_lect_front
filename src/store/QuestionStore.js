import { create } from "zustand";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

export const useQuestionStore = create(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit) => {
          const res = await fetch("http://localhost:5173/data.json");
          const json = await res.json();
          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          // set({ questions });
          set((state) => {
            return {
              ...state,
              questions,
            };
          });
        },
        selectAnswer: (questionId, answerIndex) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];
          const isCorrectAnswer = questionInfo.correctAnswer === answerIndex;
          if (isCorrectAnswer) {
            confetti();
          }
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectAnswer,
            userSelectedAnswer: answerIndex,
          };
          set((state) => {
            return {
              ...state,
              questions: newQuestions,
            };
          });
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;
          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },
      };
    },
    { name: "questions" }
  )
);
