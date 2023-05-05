import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { PageWrapper } from "../../../ui/wrappers/PageWrapper";
import { ContestElement } from "../../../modules/elements/ContestElement";
import { createDate, processImage } from "../../../../utils/utils";
import { Spinner } from "../../../ui/Spinner";
import { useContests } from "../../../../hooks/contests/useContests";
import { PaginationPanel } from "../../../ui/PaginationPanel";
import {
  PageConfig,
  getOffset,
  getPageCount,
} from "../../../../utils/pageUtils";
import { Input } from "../../../ui/inputs/Input";

export const Contests = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string>("");
  const params = useMemo(
    () => ({
      limit: PageConfig.LIMIT,
      offset: getOffset(currentPage, PageConfig.LIMIT),
    }),
    [currentPage]
  );
  const { contests, count, refetch, isLoading } = useContests({
    search,
    ...params,
  });

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(`${e.target.value}`);
  };

  useEffect(() => {
    refetch();
  }, [params, search]);

  return (
    <Wrapper>
      <PageWrapper title="Конкурсы" isTop={true}>
        {contests ? (
          <div className="flex flex-col gap-6">
            <div className="">
              <h2 className="mb-3 text-xl">Введите название конкурса</h2>
              <Input
                type="text"
                placeholder="Поиск конкурса"
                onChange={handleSearch}
              ></Input>
            </div>
            {contests.map((contest) => (
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
            ))}
            <PaginationPanel
              pageCount={getPageCount(count, PageConfig.LIMIT)}
              onClick={handlePageClick}
              currentPage={currentPage}
            />
          </div>
        ) : isLoading ? (
          <Spinner className="flex w-full justify-center" />
        ) : (
          <p>error loading contests</p>
        )}
      </PageWrapper>
    </Wrapper>
  );
};
