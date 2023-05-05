import { useEffect, useMemo, useState, ChangeEvent } from "react";
import { PageWrapper } from "../../../ui/wrappers/PageWrapper";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { BookElement } from "../../../modules/elements/BookElement";
import { Spinner } from "../../../ui/Spinner";
import { useParams } from "react-router-dom";
import { PaginationPanel } from "../../../ui/PaginationPanel";
import {
  PageConfig,
  getOffset,
  getPageCount,
} from "../../../../utils/pageUtils";
import { Input } from "../../../ui/inputs/Input";
import { useSearchBooks } from "../../../../hooks/books/useSearchBooks";

export const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string>("");
  const { genreName } = useParams();
  const params = useMemo(
    () => ({
      limit: PageConfig.LIMIT,
      offset: getOffset(currentPage, PageConfig.LIMIT),
    }),
    [currentPage]
  );
  const { books, count, refetch, isLoading } = useSearchBooks({
    search,
    genre: genreName!,
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
      <PageWrapper title={genreName} isTop={true}>
        {books ? (
          <div className="flex flex-col gap-4">
            <div className="">
              <h2 className="mb-3 text-xl">Введите название книги</h2>
              <Input
                type="text"
                placeholder="Поиск книги"
                onChange={handleSearch}
              ></Input>
            </div>
            {books!.length > 0 ? (
              <div>
                {books!.map((book) => (
                  <BookElement
                    id={book.id}
                    key={book.id}
                    img={book.img}
                    title={book.title}
                    author={book.user.name}
                    authorId={book.userId}
                    annotation={book.description}
                    rating={book.rating}
                    categories={book.genres.map((genre) => genre.name)}
                  />
                ))}
                <PaginationPanel
                  pageCount={getPageCount(Number(count), PageConfig.LIMIT)}
                  onClick={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <p>Книги не найдены</p>
            )}
          </div>
        ) : isLoading ? (
          <Spinner className="flex w-full items-center justify-center" />
        ) : (
          <p>Непредвиденные проблемы</p>
        )}
      </PageWrapper>
    </Wrapper>
  );
};
