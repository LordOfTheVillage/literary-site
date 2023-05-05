import { useForm } from "react-hook-form";
import { useUserContext } from "../../../../context/userContext";
import { ErrorInputMessages, InputNames } from "../../../../../utils/formUtils";
import { Wrapper } from "../../../../ui/wrappers/Wrapper";
import { PageWrapper } from "../../../../ui/wrappers/PageWrapper";
import { Textarea } from "../../../../ui/Textarea";
import { Spinner } from "../../../../ui/Spinner";
import { Button } from "../../../../ui/buttons/Button";
import { useProducerApplications } from "../../../../../hooks/user/useProducerApplication";

export const PersonalProducerApplication = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  const { user } = useUserContext();
  const { createApplication, isCreateLoading } = useProducerApplications();

  const handleSubmitForm = (data) => {
    createApplication({ userId: user!.id, ...data });
  };

  return (
    <Wrapper>
      <PageWrapper title="Заявка на продюсирование">
        {user && !user.producerApplication ? (
          <div className="">
            <p className="mb-3 text-lg">
              Конкурс может объявить только продюсер, чтобы администрация
              рассмотрела вашу кандидатуру оставьте заявку в форме ниже
            </p>
            <Textarea
              placeholder="Причина заявки"
              properties={{
                ...register(InputNames.TEXT, {
                  required: ErrorInputMessages.REQUIRED,
                  maxLength: {
                    value: 1000,
                    message: ErrorInputMessages.TEXT_LENGTH,
                  },
                }),
              }}
              name={InputNames.TEXT}
              errors={errors}
            />
            <div className="mt-3 w-full">
              {isCreateLoading ? (
                <Spinner className="flex w-full justify-center" />
              ) : (
                <Button
                  className="w-full"
                  onClick={handleSubmit(handleSubmitForm)}
                >
                  Сохранить
                </Button>
              )}
            </div>
          </div>
        ) : (
          <h1>Вы уже подали заявку, ожидайте её рассмотрения</h1>
        )}
      </PageWrapper>
    </Wrapper>
  );
};
