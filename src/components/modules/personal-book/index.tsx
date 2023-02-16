import { useParams } from "react-router-dom";
import { useFetchBooks } from "../../../hooks";
import { BookType } from "../../../types/types";
import { BookElement } from "../../ui/book-element";
import { PageWrapper } from "../../ui/page-wrapper";

export const PersonalBook = () => {
  const { id } = useParams();
  const { books } = useFetchBooks(id as string);

  return books ? (
    <PageWrapper title="Книги">
      <>
        {books.map((book: BookType) => (
          <BookElement
            key={book.id}
            img={book.img}
            title={book.title}
            author={book.user.name}
            annotation={book.description}
            rating={book.rating}
            categories={[]}
          ></BookElement>
        ))}
      </>
    </PageWrapper>
  ) : (
    <h1>Loading...</h1>
  );
};
