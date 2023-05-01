import React from "react";
import { PageWrapper } from "../../../ui/wrappers/PageWrapper";
// import { Table } from "../../../ui/Table";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { Button } from "../../../ui/buttons/Button";
import { useBooks } from "../../../../hooks/books/useBooks";
import { handleImageError, processImage } from "../../../../utils/utils";

export const AdminBooksPage = () => {
  const { books, verifyBook, deleteBook } = useBooks({ disabled: false });
  return (
    <div className="flex w-full flex-col items-center justify-between overflow-hidden">
      <Wrapper className="">
        {books && (
          <div className="flex flex-col gap-y-10">
            <PageWrapper
              isTop={true}
              title="Пользователи"
              className="w-full text-xl"
            >
              {books.map(({ id, img, title, description, chapters }, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b-2 pb-2"
                >
                  <div className="flex text-lg">
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
                  </div>
                  <div className="w-1/4 justify-between lg:flex">
                    <Button onClick={() => verifyBook(`${id}`)}>
                      Верифицировать
                    </Button>
                    <Button onClick={() => deleteBook(`${id}`)}>Удалить</Button>
                  </div>
                </div>
              ))}
            </PageWrapper>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
