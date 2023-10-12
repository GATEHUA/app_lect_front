import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Game } from "./Game";

export const Question = ({ info }) => {
  return (
    <div className="text-2xl w-full font-medium space-y-4 ">
      <div>{info.question}</div>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
    </div>
  );
};
