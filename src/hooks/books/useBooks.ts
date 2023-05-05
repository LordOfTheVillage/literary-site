import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryParams } from "../../types/api.types";
import { API } from "../../api/api";
import { BookListType } from "../../types/list.types";
import { notifyError, notifySuccess } from "../../utils/utils";
import { AxiosError } from "axios";
import { ErrorNotifies, SuccessNotifies } from "../../utils/formUtils";

export const useBooks = (params: QueryParams = {}) => {
  const {
    data,
    refetch,
    ...props
  } = useQuery<BookListType>({
    queryKey: ["books", params],
    staleTime: 0,
    queryFn: async () => API.getBooks(params),
  });

  const { mutate: verifyBook } = useMutation({
    mutationFn: (id: string) => API.verifyBook(id),
    mutationKey: ["verifyBook"],
    onSuccess: () => {
      notifySuccess(SuccessNotifies.VERIFY_BOOK);
      refetch();
    },
    onError: (error: AxiosError) => {
      notifyError(ErrorNotifies.ERROR_VERIFY_BOOK);
    },
  });

  const { mutate: deleteBook } = useMutation({
    mutationFn: (id: string) => API.deleteBookById(id),
    mutationKey: ["deleteBook"],
    onSuccess: () => {
      notifySuccess(SuccessNotifies.DELETE_BOOK);
      refetch();
    },
    onError: (error: AxiosError) => {
      notifyError(ErrorNotifies.ERROR_DELETE_BOOK);
    },
  });

  return {
    books: data?.rows,
    count: data?.count,
    verifyBook,
    deleteBook,
    refetch,
    ...props,
  };
};
