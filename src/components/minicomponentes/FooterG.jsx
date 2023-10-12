import { useQuestionStore } from "../../store/QuestionStore";
export const FooterG = () => {
  const questions = useQuestionStore((state) => state.questions);
  let correct = 0;
  let incorrect = 0;
  let unansewered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == null) {
      unansewered++;
    } else if (userSelectedAnswer === correctAnswer) {
      correct++;
    } else {
      incorrect++;
    }
  });
  return (
    <footer style={{ marginTop: "10px" }}>
      <strong>{`✅ ${correct} - ❌ ${incorrect} - ❓ ${unansewered}`}</strong>
    </footer>
  );
};
