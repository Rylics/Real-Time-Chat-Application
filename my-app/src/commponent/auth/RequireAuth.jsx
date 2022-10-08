import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ChatOpen } from "../../app";

export function RequireAuth() {
  const { token } = useContext(ChatOpen);

  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
