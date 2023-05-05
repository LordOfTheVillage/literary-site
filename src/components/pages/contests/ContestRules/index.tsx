import React from "react";
import { TiSortAlphabetically } from "react-icons/ti";
import { RiCalendarEventFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CommentSection } from "../../../modules/CommentsSection";
import { Button } from "../../../ui/buttons/Button";
import { useParams } from "react-router-dom";
import { useContest } from "../../../../hooks/contests/useContest";
import { createDate } from "../../../../utils/utils";
import { useComments } from "../../../../hooks/comments/useComments";
import { DetailsElement } from "../../../modules/elements/DetailsElement";
import { CommentTypes } from "../../../../hooks/comments/usePostComment";
import { GenreType } from "../../../../types/types";

export const ContestRules = () => {
  const { id } = useParams();
  const { contest } = useContest({ contestId: id });
  const { comments, isLoading: commentsLoading } = useComments(
    CommentTypes.CONTEST,
    id!,
    contest
  );
  return (
    <div>
      {contest ? (
        <>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-0">
            <div className="flex-1">
              <p className="mb-4 text-lg font-medium">Сроки проведения</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                <DetailsElement
                  title="Срок приема работ"
                  description={`${createDate(contest.createdAt)} - ${createDate(
                    contest.date
                  )}`}
                  icon={RiCalendarEventFill}
                />
                <DetailsElement
                  title="Оглашение результатов"
                  description={createDate(contest.date)}
                  icon={AiOutlineClockCircle}
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="mb-4 text-lg font-medium">Детали</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                <DetailsElement
                  title="Размер"
                  description={`От ${contest.countCharacters} символов`}
                  icon={RiCalendarEventFill}
                />
                <DetailsElement
                  title="Жанры"
                  description={contest.genres
                    .map((g: GenreType) => g.name)
                    .join(", ")}
                  icon={TiSortAlphabetically}
                />
              </div>
            </div>
          </div>

          <hr className="mb-12 mt-4" />

          <div>
            <p className="mb-2 text-lg font-medium lg:text-xl">О конкурсе</p>
            <p className="mb-8 text-sm lg:text-base">{contest.description}</p>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-lg font-medium lg:text-xl">
              Как принять участие
            </p>
            <ol className="flex list-inside list-decimal flex-col gap-4 text-sm lg:text-base">
              <li>Зарегистрируйтесь на платформе Литнет</li>
              <li>
                Разместите уже написанную часть своего произведения объемом не
                меньше {contest.countCharacters} знаков с пробелами либо
                произведение целиком.
              </li>
              <li>
                Зайдите на страницу конкурса и добавьте свое произведение, нажав
                на кнопку “Участвовать в конкурсе”. Напоминаем, что один автор
                может подать на конкурс не больше одного произведения.
              </li>
              <li>
                Ожидайте прохождения модерации. После этого ваша книга появится
                на странице конкурса.
              </li>
            </ol>
          </div>

          <Button className="mb-6">Участвовать в конкурсе</Button>

          {comments ? (
            <CommentSection
              comments={comments}
              type={CommentTypes.CONTEST}
              id={id!}
            />
          ) : commentsLoading ? (
            <p>loading comments...</p>
          ) : (
            <p>error loading comments</p>
          )}
        </>
      ) : (
        <p>loading contest data...</p>
      )}
    </div>
  );
};
