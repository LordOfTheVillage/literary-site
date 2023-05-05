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

export const AdminBooksPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const params = useMemo(
    () => ({
      limit: PageConfig.LIMIT,
      offset: getOffset(currentPage, PageConfig.LIMIT),
    }),
    [currentPage]
  );
  const { books, count, refetch, verifyBook, deleteBook } = useBooks({
    disabled: false,
  });

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <div className="flex w-full flex-col items-center justify-between overflow-hidden">
      <Wrapper className="">
        {books && (
          <div className="flex flex-col gap-y-10">
            <PageWrapper isTop={true} title="Книги" className="w-full text-xl">
              {books.length ? (
                <div>
                  {books.map(({ id, img, title, description, chapters }, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b-2 pb-2"
                    >
                      <Link
                        to={`${Router.absoluteBooks}/${id}`}
                        className="flex text-lg"
                      >
                        <img
                          className="mr-5 h-32 w-32 object-cover"
                          src={processImage(img)}
                          alt=""
                          onError={handleImageError}
                        />
                        <div className="flex flex-col gap-y-2">
                          <div className="font-medium">{title}</div>
                          <div>{chapters?.length} глав</div>
                          <div className="line-clamp-2">{description}</div>
                        </div>
                      </Link>
                      <div className="w-1/4 justify-between lg:flex">
                        <Button onClick={() => verifyBook(`${id}`)}>
                          Верифицировать
                        </Button>
                        <Button onClick={() => deleteBook(`${id}`)}>
                          Удалить
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
                <h1>Нет книг для модерации</h1>
              )}
            </PageWrapper>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
