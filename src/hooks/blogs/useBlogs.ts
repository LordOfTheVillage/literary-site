import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { QueryParams } from "../../types/api.types";
import { useDebounce } from "../useDebounce";

export const useBlogs = (params: QueryParams = {}, delay = 1000) => {
  const {
    data,
    refetch: originalRefetch,
    ...props
  } = useQuery({
    queryFn: () => API.getBlogs(params),
    queryKey: ["allBlogs"],
  });

  const refetch = useDebounce(originalRefetch, delay);

  return {
    blogs: data?.rows,
    count: data?.count,
    refetch,
    ...props,
  };
};
