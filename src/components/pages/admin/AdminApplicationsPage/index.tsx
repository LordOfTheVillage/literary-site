import { useMemo, useEffect, useState } from "react";
import { PageWrapper } from "../../../ui/wrappers/PageWrapper";
// import { Table } from "../../../ui/Table";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { Button } from "../../../ui/buttons/Button";
import { useBooks } from "../../../../hooks/books/useBooks";
import { handleImageError, processImage } from "../../../../utils/utils";
import {
  PageConfig,
  getOffset,
  getPageCount,
} from "../../../../utils/pageUtils";
import { PaginationPanel } from "../../../ui/PaginationPanel";
import { Link } from "react-router-dom";
import { Router } from "../../../router";
import { useProducerApplications } from "../../../../hooks/user/useProducerApplication";

export const AdminApplicationsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const params = useMemo(
    () => ({
      limit: PageConfig.LIMIT,
      offset: getOffset(currentPage, PageConfig.LIMIT),
    }),
    [currentPage]
  );
  const {
    applications,
    confirmApplication,
    removeApplication,
    count,
    refetch,
  } = useProducerApplications();

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <div className="flex w-full flex-col items-center justify-between overflow-hidden">
      <Wrapper className="">
        {applications && (
          <div className="flex flex-col gap-y-10">
            <PageWrapper isTop={true} title="Заявки" className="w-full text-xl">
              {applications.length ? (
                <div>
                  {applications.map(({ id, text, user }, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b-2 pb-2"
                    >
                      <div className="flex text-lg">
                        <div className="flex flex-col gap-y-2">
                          <Link
                            to={`${Router.users}/${user.id}`}
                            className="font-medium"
                          >
                            {user.name}
                          </Link>
                          <div className="line-clamp-2">{text}</div>
                        </div>
                      </div>
                      <div className="w-1/4 justify-between lg:flex">
                        <Button onClick={() => confirmApplication(`${id}`)}>
                          Подтвердить
                        </Button>
                        <Button onClick={() => removeApplication(`${id}`)}>
                          Отклонить
                        </Button>
                      </div>
                    </div>
                  ))}
                  <PaginationPanel
                    pageCount={getPageCount(Number(count), PageConfig.LIMIT)}
                    onClick={handlePageClick}
                    currentPage={currentPage}
                  />
                </div>
              ) : (
                <h1>Нет заявок для модерации</h1>
              )}
            </PageWrapper>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
