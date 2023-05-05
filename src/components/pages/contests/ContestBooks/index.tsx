import React from "react";
import { useContest } from "../../../../hooks/contests/useContest";
import { useParams } from "react-router-dom";
import { ContestBook } from "../../../modules/contests/ContestBook";
import { ApplicationType } from "../../../../types/types";
import { PrimaryLink } from "../../../ui/PrimaryLink";
import { useUserContext } from "../../../context/userContext";

type Params = {
  id: string;
};

export const ContestBooks = () => {
  const { id } = useParams<Params>();
  const { contest, isLoading } = useContest({ contestId: id });
  const { user } = useUserContext();

  return (
    <div className="lg:mt-4">
      {contest ? (
        <>
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <p className="mb-6 font-medium">
              Работы участников
              <span className="ml-4 rounded-md bg-gray-700 px-3 py-1 text-sm font-medium text-white">
                {
                  contest.contestApplications.filter((a) => a.status === true)
                    .length
                }
              </span>
            </p>
            <div className="flex w-9/12 flex-row-reverse items-start">
              {+contest.userId === +user!.id && (
                <PrimaryLink className=" ml-5" path={`admin`}>
                  Параметры конкурса
                </PrimaryLink>
              )}
              {(+contest.userId === +user!.id ||
                contest.contestModerations.some(
                  (m) => +m.userId === +user!.id
                )) && (
                <PrimaryLink className=" items-end" path={`moderation`}>
                  Модерация книг
                </PrimaryLink>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contest.contestApplications.map(
              (application: ApplicationType, i: number) =>
                application.status && (
                  <ContestBook key={i} id={application.bookId} />
                )
            )}
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
