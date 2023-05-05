import React from "react";
import { useContest } from "../../../../hooks/contests/useContest";
import { useParams } from "react-router-dom";
import { ApplicationType } from "../../../../types/types";
import { PrimaryLink } from "../../../ui/PrimaryLink";
import { useUserContext } from "../../../context/userContext";
import { Router } from "../../../router";
import { ContestModeratedBook } from "../../../modules/contests/ContestModeratedBook";
import { useApplications } from "../../../../hooks/contests/useApplications";

type Params = {
  id: string;
};

export const ContestModerationPage = () => {
  const { id } = useParams<Params>();
  const { contest, isLoading } = useContest({ contestId: id });
  const { user } = useUserContext();
  const { applications, updateApplication, removeApplication } =
    useApplications(id!, { disabled: false });
  return (
    <div className="lg:mt-4">
      {contest && applications ? (
        <>
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <p className="mb-6 font-medium">
              Открытые заявки
              <span className="ml-4 rounded-md bg-gray-700 px-3 py-1 text-sm font-medium text-white">
                {applications.length}
              </span>
            </p>
            <div className="flex w-9/12 flex-row-reverse items-start">
              {+contest.userId === +user!.id && (
                <PrimaryLink
                  className=" ml-5"
                  path={`${Router.contests}/${id}/admin`}
                >
                  Параметры конкурса
                </PrimaryLink>
              )}
              {(+contest.userId === +user!.id ||
                contest.contestModerations.some(
                  (m) => +m.userId === +user!.id
                )) && (
                <PrimaryLink
                  className=" items-end"
                  path={`${Router.contests}/${id}/moderation`}
                >
                  Модерация книг
                </PrimaryLink>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((application: ApplicationType, i: number) => (
              <ContestModeratedBook
                key={i}
                id={application.bookId}
                onConfirm={() =>
                  updateApplication({ id: application.id, status: true })
                }
                onCancel={() => removeApplication(application.id)}
              />
            ))}
          </div>
        </>
      ) : isLoading ? (
        <p>loading contest data</p>
      ) : (
        <p>error loading data</p>
      )}
    </div>
  );
};
