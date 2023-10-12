import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/UserStore";

export const ProtectedRouteVerify = ({ redirectTo, isAllowed }) => {
  const user = useUserStore((state) => state.user);
  const isValidated = user.estaVerificado;

  if (!isValidated && !isAllowed) return <Navigate to={redirectTo} replace />;

  if (!isValidated && isAllowed) return <Navigate to="/code" replace />;

  // if (isValidated && isAllowed) {
  //   return <Navigate to="/learn" replace />;
  // }

  return <Outlet />;
};
