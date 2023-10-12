import { Navigate, Outlet } from "react-router-dom";
// import { useUserStore } from "./store/UserStore";

export const ProtectedRoute = ({ redirectTo, isAllowed }) => {
  // const user = useUserStore((state) => state.user);
  // const isValidated = user.estaVerificado;

  if (!isAllowed) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};
