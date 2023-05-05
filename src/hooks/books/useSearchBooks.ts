import { useQuery } from "@tanstack/react-query";
import { QueryParams } from "../../types/api.types";
import { BookListType } from "../../types/list.types";
import { API } from "../../api/api";
import { useState } from "react";
import { useDebounce } from "../useDebounce";

export const useSearchBooks = (params: QueryParams = {}, delay = 1000) => {
  const {
    data,
    refetch: originalRefetch,
    ...props
  } = useQuery<BookListType>({
    queryKey: ["books"],
    staleTime: 0,
    queryFn: async () => API.getBooks(params),
  });
  
  const refetch = useDebounce(originalRefetch, delay);

  return {
    books: data?.rows,
    count: data?.count,
    refetch,
    ...props,
  };
};
