import { Link } from "react-router-dom";
import { useMemo } from "react";
import { PrimaryLink } from "../PrimaryLink";
import { Router } from "../../router";
import { Button } from "../buttons/Button";
import { BookType, ChapterType } from "../../../types/types";
import { useUserContext } from "../../context/userContext";
import { usePostBookmark } from "../../../hooks/reader/usePostBookmark";
import { useDeleteBookmark } from "../../../hooks/reader/useDeleteBookmark";

interface ReadingBlockProps {
  chapters: ChapterType[] | undefined;
  bookId: string;
  book: BookType;
}

export const ReadingBlock: React.FC<ReadingBlockProps> = ({
  chapters,
  bookId,
  book,
}) => {
  const { user } = useUserContext();
  const { createBookmark } = usePostBookmark();
  const { mutate: deleteBookmark } = useDeleteBookmark();

  const userBookmark = useMemo(() => {
    return user?.bookmarks
      ? user?.bookmarks.find((b) => b.bookId === Number(bookId))
      : undefined;
  }, [bookId, user]);

  const addedBook = useMemo(() => !!userBookmark, [userBookmark]);
  const pageId = useMemo(() => {
    if (!book || !chapters || !book.chapters![0]) return 1;
    const chapter = chapters?.find((ch) => ch.id === book.chapters![0].id);
    return chapter && chapter.pages && chapter.pages[0] && chapter.pages[0].id
      ? chapter.pages[0].id
      : 1;
  }, [chapters, book]);

  const handleAddBookmark = () => {
    createBookmark({
      userId: user!.id,
      bookId: Number(bookId),
      chapterId: book.chapters![0].id,
      pageId: pageId,
    });
  };

  return chapters && chapters?.length > 0 ? (
    user ? (
      <div className="flex gap-x-5 justify-self-end">
        <Button
          type="secondary"
          className={`w-1/2`}
          onClick={() => {
            if (addedBook) deleteBookmark(`${userBookmark?.id}`);
            else handleAddBookmark();
          }}
        >
          {addedBook ? "Удалить из библиотеки" : "Добавить в библиотеку"}
        </Button>
        <PrimaryLink
          path={`${Router.reader}/${bookId}`}
          className="w-1/2 text-center"
        >
          Читать онлайн
        </PrimaryLink>
      </div>
    ) : (
      <div className="w-full text-center">
        {" "}
        Пожалуйста,{" "}
        <Link
          to={`${Router.login}`}
          className="w-1/2 text-center text-blue-800 hover:underline"
        >
          авторизируйтесь
        </Link>{" "}
        для чтения книги
      </div>
    )
  ) : (
    <div className="w-full text-center">
      В книге недостаточно глав для чтения
    </div>
  );
};
