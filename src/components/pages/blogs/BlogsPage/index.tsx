import { useMemo, useState, useEffect, ChangeEvent } from "react";
import { PageWrapper } from "../../../ui/wrappers/PageWrapper";
import { BlogElement } from "../../../modules/elements/BlogElement";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { createDate } from "../../../../utils/utils";
import { Spinner } from "../../../ui/Spinner";
import { useBlogs } from "../../../../hooks/blogs/useBlogs";
import { PaginationPanel } from "../../../ui/PaginationPanel";
import {
  PageConfig,
  getOffset,
  getPageCount,
} from "../../../../utils/pageUtils";
import { Input } from "../../../ui/inputs/Input";

export const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string>("");
  const params = useMemo(
    () => ({
      limit: PageConfig.LIMIT,
      offset: getOffset(currentPage, PageConfig.LIMIT),
    }),
    [currentPage]
  );
  const { blogs, count, refetch, isLoading } = useBlogs({
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
    <Wrapper className="flex items-start">
      {blogs ? (
        <PageWrapper title="Литературные блоги" isTop={true}>
          <div className="">
            <h2 className="mb-3 text-xl">Введите название блога</h2>
            <Input
              type="text"
              placeholder="Поиск блога"
              onChange={handleSearch}
            ></Input>
          </div>
          {blogs.length ? (
            <>
              {blogs.map((blog) => (
                <BlogElement
                  key={blog.id}
                  id={blog.id}
                  userId={blog.userId}
                  title={blog.title}
                  text={blog.text}
                  createdAt={createDate(blog.createdAt)}
                />
              ))}
              <PaginationPanel
                pageCount={getPageCount(Number(count), PageConfig.LIMIT)}
                onClick={handlePageClick}
                currentPage={currentPage}
              />
            </>
          ) : (
            <h1>Блоги пока не написаны</h1>
          )}
        </PageWrapper>
      ) : isLoading ? (
        <Spinner className="flex w-full justify-center" />
      ) : (
        <p>error loading blogs</p>
      )}
    </Wrapper>
  );
};
