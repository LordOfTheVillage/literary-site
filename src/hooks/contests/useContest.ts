import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { ContestType } from "../../types/types";

export const useContest = ({ contestId = "", userId = "" }) => {
  const { data, ...props } = useQuery<ContestType>({
    queryFn: () => API.getContestById(contestId),
    queryKey: [contestId, "contest"],
  });

  const { data: userContest, isLoading: isUserContestLoading } =
    useQuery<ContestType>({
      queryFn: () => API.getContestByUserId(userId),
      queryKey: [userId, "user", "contest"],
    });

  return { contest: data, userContest, isUserContestLoading, ...props };
};
