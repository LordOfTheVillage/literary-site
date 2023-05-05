import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { QueryParams } from "../../types/api.types";
import { useDebounce } from "../useDebounce";

export const useContests = (params: QueryParams = {}, delay = 1000) => {
  const {
    data,
    refetch: originalRefetch,
    ...props
  } = useQuery({
    queryFn: () => API.getContests(params),
    queryKey: ["contests"],
  });
  const refetch = useDebounce(originalRefetch, delay);
  return {
    contests: data?.rows,
    count: data?.count,
    refetch,
    ...props,
  };
};
