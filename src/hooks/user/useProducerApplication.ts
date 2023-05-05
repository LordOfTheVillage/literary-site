import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryParams } from "../../types/api.types";
import { API } from "../../api/api";
import { notifyError, notifySuccess } from "../../utils/utils";
import { ErrorNotifies, SuccessNotifies } from "../../utils/formUtils";
import { AxiosError } from "axios";
import { ProducerApplicationListType } from "../../types/list.types";
import { useNavigate } from "react-router-dom";
import { Router } from "../../components/router";
import { useUserContext } from "../../components/context/userContext";

export const useProducerApplications = (params: QueryParams = {}) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data, refetch, ...props } = useQuery<ProducerApplicationListType>({
    queryFn: () => API.getProducerApplications(params),
    queryKey: ["applications"],
  });

  const { mutate: createApplication, isLoading: isCreateLoading } = useMutation(
    {
      mutationFn: (body: any) => API.createProducerApplication(body),
      mutationKey: ["createApplication"],
      onSuccess: () => {
        notifySuccess(SuccessNotifies.CREATE_APPLICATION);
        refetch();
        navigate(`${Router.users}/${user!.id}`);
      },
      onError: (error: AxiosError) => {
        notifyError(ErrorNotifies.ERROR_CREATING_APPLICATION);
      },
    }
  );

  const { mutate: confirmApplication } = useMutation({
    mutationFn: (id: string) => API.confirmProducerApplication(id),
    mutationKey: ["confirmApplication"],
    onSuccess: () => {
      notifySuccess(SuccessNotifies.UPDATE_APPLICATION);
      refetch();
    },
    onError: (error: AxiosError) => {
      notifyError(ErrorNotifies.ERROR_UPDATING_APPLICATION);
    },
  });

  const { mutate: removeApplication } = useMutation({
    mutationFn: (id: string) => API.removeProducerApplication(id),
    mutationKey: ["removeApplication"],
    onSuccess: () => {
      notifySuccess(SuccessNotifies.REMOVE_APPLICATION);
      refetch();
    },
    onError: (error: AxiosError) => {
      notifyError(ErrorNotifies.ERROR_REMOVING_APPLICATION);
    },
  });

  return {
    applications: data?.rows,
    count: data?.count,
    createApplication,
    confirmApplication,
    removeApplication,
    refetch,
    isCreateLoading,
    ...props,
  };
};
