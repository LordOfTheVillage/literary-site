import { FC } from "react";
import { useUserContext } from "../../context/userContext";
import { Navigate, useParams } from "react-router-dom";
import { useContest } from "../../../hooks/contests/useContest";
import { Spinner } from "../../ui/Spinner";
import { Router } from "../../router";

export interface ModerationProtectedRouteProps {
  children: JSX.Element;
}

export const ModerationProtectedRoute: FC<ModerationProtectedRouteProps> = ({
  children,
}) => {
  const { user } = useUserContext();
  const { id: contestId } = useParams();
  const { contest, isLoading } = useContest({ contestId });

  if (isLoading) return <Spinner />;

  return contest &&
    (+contest.userId === user?.id ||
      contest.contestModerations.some((m) => +m.userId === user?.id)) ? (
    children
  ) : (
    <Navigate to={Router.main} />
  );
};
