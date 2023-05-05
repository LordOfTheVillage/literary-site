import { useParams } from "react-router-dom";
import { PageWrapper } from "../../../../ui/wrappers/PageWrapper";
import { useContest } from "../../../../../hooks/contests/useContest";
import { ContestElement } from "../../../../modules/elements/ContestElement";
import { createDate, processImage } from "../../../../../utils/utils";
import { Spinner } from "../../../../ui/Spinner";

export const PersonalContest = () => {
  const { id } = useParams();
  const { userContest: contest, isUserContestLoading } = useContest({
    userId: id,
  });

  return (
    <PageWrapper title="Книги">
      {contest ? (
        <ContestElement
          key={contest.id}
          id={contest.id}
          title={contest.title}
          prize={contest.prize as string}
          imageUrl={processImage(contest.img)}
          startDate={createDate(contest.createdAt)}
          endDate={createDate(contest.date)}
          resultsDate={createDate(contest.date)}
          booksAmount={contest.contestApplications.length}
        />
      ) : isUserContestLoading ? (
        <Spinner className="flex w-full justify-center" />
      ) : (
        <p>Пользователь пока не объявил конкурс</p>
      )}
    </PageWrapper>
  );
};
