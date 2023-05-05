import { FC } from "react";
import { useUserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";
import { Router } from "../../router";
import { PersonalProducerApplication } from "../../pages/account/personal/PersonalProducerApplication";

export interface ProducerProtectedRouteProps {
  children: JSX.Element;
}

export const ProducerProtectedRoute: FC<ProducerProtectedRouteProps> = ({
  children,
}) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to={Router.login} />;
  }

  if (user.role.value === "USER") {
    return <PersonalProducerApplication />;
  }

  return children;
};
