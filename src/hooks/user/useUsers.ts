import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { QueryParams } from "../../types/api.types";
import { UserListType } from "../../types/list.types";
import { notifyError, notifySuccess } from "../../utils/utils";
import {
  ErrorNotifies,
  InputNames,
  SuccessNotifies,
  createFormDataWithImage,
} from "../../utils/formUtils";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/context/userContext";
import { Router } from "../../components/router";
import { useDebounce } from "../useDebounce";

const createCustomFormData = ({ readingView, ...data }): any => {
  const formData = createFormDataWithImage(data);
  formData.append(InputNames.READING_VIEW, readingView);
  return formData;
};

export const useUsers = (params: QueryParams = {}, delay = 1000) => {
  const { user, setUser, setSelectedUser } = useUserContext();
  const navigate = useNavigate();

  const {
    data,
    refetch: originalRefetch,
    ...props
  } = useQuery<UserListType>({
    queryKey: ["users"],
    queryFn: async () => API.getUsers(params),
  });

  const { mutate: banUser, isLoading: isUpdateLoading } = useMutation({
    mutationFn: ({ id, ...body }: any) => API.banUser({ userId: +id, ...body }),
    mutationKey: ["updateUser"],
    onSuccess: () => {
      notifySuccess(SuccessNotifies.BAN_SUCCESS);
      originalRefetch();
    },
    onError: (error: AxiosError) => {
      notifyError(ErrorNotifies.BAN_ERROR);
    },
  });

  const {
    mutate: edit,
    isError: isEditError,
    isLoading: isEditLoading,
    error: editError,
  } = useMutation({
    mutationFn: (data: any) =>
      API.updateUserById(`${user?.id}`, createCustomFormData(data)),
    mutationKey: ["user", "edit-page", user?.id],
    onSuccess: (user: any) => {
      setUser(user);
      setSelectedUser(user);
      originalRefetch();
      navigate(`${Router.users}/${user.id}`);
    },
    onError: (error) => {
      throw error;
    },
  });

  const refetch = useDebounce(originalRefetch, delay);

  return {
    users: data?.rows,
    count: data?.count,
    banUser,
    edit,
    isEditLoading,
    isEditError,
    editError,
    isUpdateLoading,
    refetch,
    ...props,
  };
};
