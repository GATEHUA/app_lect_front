import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllLecturasUser from "./Pages/AllLecturasUser";
import LecturaFormPage from "./Pages/LecturaFormPage";
import PreguntaFormPage from "./Pages/PreguntaFormPage";
import LoginPage from "./Pages/LoginPage";
import { shallow } from "zustand/shallow";
import { Toaster } from "sonner";
import CodeForm from "./components/CodeForm";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useUserStore } from "./store/UserStore";
import { RecoverForm } from "./Pages/RecoverForm";
import { MainPage } from "./Pages/MainPage";
import { RootLayout } from "./layouts/RootLayout";
import { ProtectedRouteVerify } from "./routes/ProtectedRouteVerify";
import { MyReadingsPage } from "./Pages/MyReadingsPage";
import { ChallenguesPage } from "./Pages/ChallenguesPage";
import { UsersPage } from "./Pages/UsersPage";
import { RankingPage } from "./Pages/RankingPage";
import { PerfilPage } from "./Pages/PerfilPage";
import { SettingsPage } from "./Pages/SettingsPage";
import { UserForm } from "./Pages/UserForm";
import { Prueba } from "./components/Prueba";
import { ReadingForm } from "./Pages/ReadingForm";
import { ParrafosPage } from "./Pages/ParrafosPage";
import { QuestionsPage } from "./Pages/QuestionsPage";
import { ReadingPage } from "./Pages/ReadingPage";
import { Loading } from "./components/utils/Loading";
import { Paragraphs } from "./Pages/Paragraphs";
import { QuestionxAnswer } from "./Pages/QuestionxAnswer";
import { CreateQuestionU } from "./Pages/CreateQuestionU";
import { LevelSQuestions } from "./Pages/LevelSQuestions";
import { ChallengeReading } from "./Pages/ChallengeReading";
import { PrubTemp } from "./Pages/PrubTemp";
import { ProductFinal } from "./Pages/ProductFinal";
import { Qualify } from "./Pages/Qualify";
import { ReadingStatus } from "./Pages/ReadingStatus";
import { QualifyPersonally } from "./Pages/QualifyPersonally";
import { QualifyPersonallyPP } from "./Pages/QualifyPersonallyPP";
import { QualifyPersonallyRes } from "./Pages/QualifyPersonallyRes";
import { QualifyPersonallySN } from "./Pages/QualifyPersonallySN";
import { QualifyPersonallyYP } from "./Pages/QualifyPersonallyYP";
import { QualifyPersonallyPF } from "./Pages/QualifyPersonallyPF";
import { useThemeStore } from "./store/ThemeSore";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function App() {
  // const [loading, setLoading] = useState(false);

  const { user, isAuthenticated, isLoading } = useUserStore(
    (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
    }),
    shallow
  );
  const theme = useThemeStore((state) => state.theme);

  const { checkAuth } = useUserStore();

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function onWindowMatch() {
    if (theme == "dark" || (theme == "system" && darkQuery.matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    onWindowMatch();
    // if (theme == "dark") {
    //   document.documentElement.classList.add("dark");
    // } else if (theme == "") {
    //   document.documentElement.classList.remove("dark");
    // } else if (theme == "system") {
    //   onWindowMatch();
    // }
    // const handleDarkQueryChange = () => {
    //   onWindowMatch();
    // };
    darkQuery.addEventListener("change", onWindowMatch);
    return () => {
      darkQuery.removeEventListener("change", onWindowMatch);
    };
  }, [theme]);

  useEffect(() => {
    checkAuth();
  }, []);

  // darkQuery.addEventListener("change", (e) => {
  //   if (theme == "system") {
  //     if (e.matches) {
  //       document.documentElement.classList.add("dark");
  //     } else {
  //       document.documentElement.classList.remove("dark");
  //     }
  //   }
  // });

  if (isLoading) {
    return (
      <div className="bg-slate-200 dark:bg-slate-800 h-full min-h-screen font-Poppins">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" closeButton richColors />
      <Routes>
        <Route path="*" element={<h1>404</h1>} />
        <Route
          element={
            <ProtectedRoute isAllowed={!isAuthenticated} redirectTo={"/code"} />
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recoverAccount" element={<RecoverForm />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectTo={"/login"} />
          }
        >
          <Route path="/code" element={<CodeForm />} />
        </Route>

        <Route
          element={
            <ProtectedRouteVerify
              isAllowed={isAuthenticated}
              redirectTo={"/login"}
            />
          }
        >
          <Route path="/" element={<RootLayout />}>
            <Route index element={<MainPage />} />

            <Route path="/myreadings" element={<MyReadingsPage />} />
            <Route path="/myreadings/new" element={<ReadingForm />} />
            <Route path="/myreadings/:id/edit" element={<ReadingForm />} />
            <Route
              path="/myreadings/:id/paragraph/new"
              element={<ParrafosPage />}
            />
            <Route
              path="/myreadings/:id/question/new"
              element={<QuestionsPage />}
            />
            <Route path="/qualify/my" element={<Qualify />} />
            <Route path="/qualify/all" element={<Qualify />} />

            <Route
              path="/qualify/estado/:idu/:idl"
              element={<QualifyPersonally />}
            />
            <Route
              path="/qualify/partparrafo/:idu/:idl"
              element={<QualifyPersonallyPP />}
            />
            <Route
              path="/qualify/responseq/:idu/:idl"
              element={<QualifyPersonallyRes />}
            />
            <Route
              path="/qualify/clasifpregun/:idu/:idl"
              element={<QualifyPersonallySN />}
            />
            <Route
              path="/qualify/youpreguntas/:idu/:idl"
              element={<QualifyPersonallyYP />}
            />
            <Route
              path="/qualify/productfinal/:idu/:idl"
              element={<QualifyPersonallyPF />}
            />

            <Route path="/qualify/lectcomp" element={<Qualify />} />

            <Route path="/reading/new" element={<LecturaFormPage />} />
            {/* <Route path="/readings" element={<AllLecturasUser />} /> */}

            <Route path="/challenges" element={<ChallenguesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/:id/edit" element={<UserForm />} />
            <Route path="/settings" element={<UserForm />} />

            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/perfil/:id" element={<PerfilPage />} />
            <Route path="/pregunta/new" element={<PreguntaFormPage />} />
          </Route>
          <Route path="/reading/:id" element={<ReadingPage />} />
          <Route path="/paragraphs_reading/:id" element={<Paragraphs />} />
          <Route path="/questions_reading/:id" element={<QuestionxAnswer />} />
          <Route
            path="/separation_question/:id"
            element={<LevelSQuestions />}
          />
          <Route path="/challengueRe/:id" element={<ChallengeReading />} />
          {/* <Route path="/challengueRe/:id/:uid" element={<PrubTemp />} /> */}
          <Route path="/challengueRe/:id/:uid" element={<QuestionxAnswer />} />

          <Route
            path="/create_question_u/:id"
            element={
              <div className="dark:bg-slate-800 min-h-screen">
                <QuestionsPage />
              </div>
            }
          />
          <Route path="/product_final/:id" element={<ProductFinal />} />
          <Route path="/readingstatus/:id" element={<ReadingStatus />} />
        </Route>
      </Routes>
    </>
  );
}
