import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { PageWrapper } from "../../../ui/wrappers/PageWrapper";
import { useContest } from "../../../../hooks/contests/useContest";
import { ContestType } from "../../../../types/types";
import { ContestHeader } from "../../../modules/contests/ContestHeader";

type Params = {
  id: string;
};

export type ContestContextType = {
  contest: ContestType;
};

export const ContestPage = () => {
  const { id } = useParams<Params>();
  const { contest, isLoading } = useContest({ contestId: id });
  return (
    <Wrapper>
      <PageWrapper isTop={true}>
        {contest ? (
          <ContestHeader id={id!} />
        ) : isLoading ? (
          <p>loading contest data...</p>
        ) : (
          <p>error loading contest</p>
        )}
        <Outlet context={{ contest }} />
      </PageWrapper>
    </Wrapper>
  );
};
