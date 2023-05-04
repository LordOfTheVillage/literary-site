import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEditChapter from "../../../../../hooks/account/useEditChapter";
import { Button } from "../../../../ui/buttons/Button";
import { PageWrapper } from "../../../../ui/wrappers/PageWrapper";
import { Input } from "../../../../ui/inputs/Input";
import { Textarea } from "../../../../ui/Textarea";
import { useChapter } from "../../../../../hooks/account/useChapter";
import { Spinner } from "../../../../ui/Spinner";
import { useForm } from "react-hook-form";
import {
  ErrorInputMessages,
  ErrorNotifies,
  InputNames,
} from "../../../../../utils/formUtils";
import { getChapterText, notifyError } from "../../../../../utils/utils";

export const AccountEditChapter = () => {
  const { chapterId } = useParams();
  const { chapter } = useChapter(`${chapterId}`);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  const { editChapter, isLoading, isError, error } = useEditChapter(
    `${chapterId}`
  );

  const handleSubmitForm = (data) => {
    editChapter(data);
  };

  useEffect(() => {
    if (isError && error) {
      notifyError(ErrorNotifies.CREATE_UPDATE);
    }
  }, [error, isError]);

  return chapter ? (
    <PageWrapper title="Добавить новую главу" isTop={false}>
      <Input
        placeholder="Название главы"
        value={chapter.title}
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
        value={getChapterText(chapter)}
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
    <h1>Loading...</h1>
  );
};
