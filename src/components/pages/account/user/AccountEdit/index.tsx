import { ChangeEvent, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../../../context/userContext";
import { Button } from "../../../../ui/buttons/Button";
import { FileInput } from "../../../../ui/inputs/FileInput";
import { PageWrapper } from "../../../../ui/wrappers/PageWrapper";
import { Input } from "../../../../ui/inputs/Input";
import { Textarea } from "../../../../ui/Textarea";
import {
  createFormData,
  ErrorInputMessages,
  InputNames,
} from "../../../../../utils/formUtils";
import { Spinner } from "../../../../ui/Spinner";
import { useEditUserPage } from "../../../../../hooks/account/useEditUserPage";
import { notifyError } from "../../../../../hooks";

export const AccountEdit = () => {
  const { user } = useUserContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  const [file, setFile] = useState<File | null>(null);
  const [readingView, setReadingView] = useState(user?.readingView || "");
  const { edit, isError, isLoading, error } = useEditUserPage();

  const handleSetFile = (e?: ChangeEvent<HTMLInputElement>) => {
    const files = (e?.target as HTMLInputElement)?.files;
    if (files) setFile(files[0]);
  };

  const createCustomFormData = (data: Record<string, string>): any => {
    const formData = createFormData(data);
    if (file) formData.append("img", file);
    formData.append("readingView", readingView);
    return formData;
  };

  const handleSubmitForm = async (data) => {
    edit(createCustomFormData(data));
  };

  useEffect(() => {
    if (isError && error) {
      notifyError("Произошла непредвиденная ошибка, повторите позднее");
    }
  }, [error, isError]);

  return (
    <PageWrapper title="Редактирование профиля">
      <FileInput className="h-32 w-32" onChange={handleSetFile}></FileInput>
      <Input
        placeholder="Логин"
        value={user?.name}
        properties={{
          ...register(InputNames.NAME, {
            required: ErrorInputMessages.REQUIRED,
          }),
        }}
        name={InputNames.NAME}
        errors={errors}
      />
      <Input
        invalid={isError}
        placeholder="Email"
        value={user?.email}
        properties={{
          ...register(InputNames.EMAIL, {
            required: ErrorInputMessages.REQUIRED,
          }),
        }}
        name={InputNames.EMAIL}
        errors={errors}
      />
      <Textarea
        placeholder="О себе"
        value={user?.autobiography}
        properties={{
          ...register(InputNames.AUTOBIOGRAPHY, {
            maxLength: {
              value: 400,
              message: ErrorInputMessages.TEXT_LENGTH,
            },
          }),
        }}
        name={InputNames.AUTOBIOGRAPHY}
        errors={errors}
      />
      <div className="flex flex-col">
        <p className="mb-2 text-lg">Вид чтения: разбить на страницы?</p>
        <div className="flex gap-x-2">
          <input
            type="radio"
            name="view"
            value="yes"
            id="yes"
            defaultChecked
            onClick={() => setReadingView("pages")}
          />
          <label htmlFor="yes">Да</label>
        </div>
        <div className="flex gap-x-2">
          <input
            type="radio"
            name="view"
            value="no"
            id="no"
            onClick={() => setReadingView("chapters")}
          />
          <label htmlFor="no">Нет</label>
        </div>
      </div>
      {isLoading ? (
        <Spinner className="flex w-full justify-center" />
      ) : (
        <Button onClick={handleSubmit(handleSubmitForm)}>Сохранить</Button>
      )}
    </PageWrapper>
  );
};
