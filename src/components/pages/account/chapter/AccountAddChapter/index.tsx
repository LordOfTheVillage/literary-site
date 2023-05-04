import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCreateChapter } from "../../../../../hooks/account/useCreateChapter";
import { Button } from "../../../../ui/buttons/Button";
import { PageWrapper } from "../../../../ui/wrappers/PageWrapper";
import { Input } from "../../../../ui/inputs/Input";
import { Textarea } from "../../../../ui/Textarea";
import { Spinner } from "../../../../ui/Spinner";
import { useForm } from "react-hook-form";
import {
  ErrorInputMessages,
  ErrorNotifies,
  InputNames,
} from "../../../../../utils/formUtils";
import { useBook } from "../../../../../hooks/books/useBook";
import { notifyError } from "../../../../../utils/utils";

export const AccountAddChapter = () => {
  const { bookId } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  const { createChapter, isLoading, isError, error } = useCreateChapter();
  const { book } = useBook(`${bookId}`); //(! useFetchUserBooks)

  const handleSubmitForm = (data) => {
    createChapter({
      ...data,
      bookId: book?.id,
    });
  };

  useEffect(() => {
    if (isError && error) {
      notifyError(ErrorNotifies.CREATE_CHAPTER);
    }
  }, [error, isError]);

  return book ? (
    <PageWrapper title="Добавить новую главу" isTop={false}>
      <Input
        placeholder="Название главы"
        properties={{
          ...register(InputNames.TITLE, {
            required: ErrorInputMessages.REQUIRED,
            minLength: {
              value: 3,
              message: ErrorInputMessages.TITLE_LENGTH,
            },
            maxLength: {
              value: 24,
              message: ErrorInputMessages.TITLE_LENGTH,
            },
          }),
        }}
        name={InputNames.TITLE}
        errors={errors}
      />
      <Textarea
        placeholder="Содержание главы"
        properties={{
          ...register(InputNames.TEXT, {
            required: ErrorInputMessages.REQUIRED,
            maxLength: {
              value: 2500,
              message: ErrorInputMessages.TEXT_LENGTH,
            },
            minLength: {
              value: 100,
              message: ErrorInputMessages.TEXT_MIN_LENGTH,
            },
          }),
        }}
        name={InputNames.TEXT}
        errors={errors}
      ></Textarea>
      {isLoading ? (
        <Spinner className="flex w-full justify-center" />
      ) : (
        <Button onClick={handleSubmit(handleSubmitForm)}>Сохранить</Button>
      )}
    </PageWrapper>
  ) : (
    <Spinner className="flex w-full justify-center" />
  );
};
