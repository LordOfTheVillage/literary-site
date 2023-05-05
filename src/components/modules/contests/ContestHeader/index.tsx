import React from "react";
import { FaTrophy } from "react-icons/fa";
import { Button } from "../../../ui/buttons/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleImageError } from "../../../../utils/utils";
import { useContest } from "../../../../hooks/contests/useContest";
import contestBackground from "../../../../common/assets/images/contestBackground1.png";
import { Router } from "../../../router";

type ContestHeaderProps = {
  id: string;
  back?: boolean;
};

export const ContestHeader: React.FC<ContestHeaderProps> = ({ id, back }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  if (
    path[path.length - 1] === "rules" ||
    path[path.length - 1] === "participate"
  ) {
    back = true;
  }
  const { contest, isLoading } = useContest({ contestId: id });
  return (
    <>
      {contest ? (
        <div
          className="flex aspect-[3.8/1] w-full items-center bg-cover bg-no-repeat px-8 py-6"
          style={{
            background: `linear-gradient(rgba(51,51,51,.6), rgba(51,51,51,.6)), url(${contestBackground}) center`,
          }}
          onError={handleImageError}
        >
          <div className="flex h-32 flex-1 flex-col sm:h-28  lg:h-32">
            <h3 className="mb-2 text-xl font-medium text-white lg:text-2xl">
              {contest.title}
            </h3>
            <p className="mb-2 text-sm text-white md:mb-0 lg:text-base">
              {contest.description}
            </p>
            <div className="mt-auto flex gap-4">
              {back ? (
                <Button
                  className=""
                  onClick={() => navigate(`${Router.contests}/${id}`)}
                >
                  К работам
                </Button>
              ) : (
                <>
                  {" "}
                  <Link to="rules">
                    <Button onClick={() => navigate("rules")}>
                      Правила конкурса
                    </Button>
                  </Link>
                  <Button
                    onClick={() => navigate("participate")}
                    type="secondary"
                    className="border-white text-[#ffffff] hover:text-white"
                  >
                    Участвовать в конкурсе
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="hidden h-32 flex-1 items-start justify-between rounded border border-white p-6 lg:flex">
            <FaTrophy
              className="grow-1 mr-1 shrink-0 lg:mr-3"
              size="20px"
              color="white"
            />
            <div>
              <p className="mb-2 text-xs uppercase text-white">Приз</p>
              <p className="text-sm text-white">{`Победитель получит: выплату от ${contest.prize} руб.; шанс на экранизацию`}</p>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <p>loading contest data</p>
      ) : (
        <p>error loading data</p>
      )}
    </>
  );
};
