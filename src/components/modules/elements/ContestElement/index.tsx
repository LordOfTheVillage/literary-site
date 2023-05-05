//TODO: responsive mobile version
import React from "react";
import { FaTrophy } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Button } from "../../../ui/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { DetailsElement } from "../DetailsElement";
import { handleImageError } from "../../../../utils/utils";
import avatar from "../../../../common/assets/images/avatar.png";
import { Router } from "../../../router";

type ContestElementProps = {
  id: string;
  title: string;
  prize: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  resultsDate: string;
  booksAmount?: number;
};

export const ContestElement: React.FC<ContestElementProps> = ({
  id,
  title,
  prize,
  imageUrl,
  startDate,
  endDate,
  resultsDate,
  booksAmount = 0,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex w-full gap-6 pb-6">
        <img
          className="hidden aspect-[6.5/10] w-full max-w-[175px] rounded-md border object-cover sm:block"
          src={imageUrl || avatar}
          alt="contest"
          onError={handleImageError}
        />
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex justify-between lg:mb-6 ">
            <p className="text-xl font-medium">{title}</p>
            <p className="font-medium">{booksAmount} книг</p>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-md border border-slate-300 p-2 sm:flex-row lg:gap-12 lg:p-6">
            <DetailsElement
              title="Приз"
              description={`Победитель получит: выплаты от ${prize} руб.; рекламную поддержку; коммерческий статус.`}
              icon={FaTrophy}
              className="flex shrink-0 grow-0 basis-2/5"
            />

            <DetailsElement
              title="Срок приема работ"
              description={`${startDate} - ${endDate}`}
              icon={RiCalendarEventFill}
            />

            <DetailsElement
              title="Оглашение результатов"
              description={`До ${resultsDate}`}
              icon={AiOutlineClockCircle}
            />
          </div>
          <div className="mt-4 flex gap-4 sm:mt-auto">
            <Button onClick={() => navigate(`${Router.contests}/${id}`)}>
              Перейти к работам
            </Button>
            <Button
              type="secondary"
              onClick={() => navigate(`${Router.contests}/${id}/rules`)}
            >
              Правила конкурса
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-slate-300"></div>
    </div>
  );
};
