import { Avatar } from "../avatar";
import { ElementWrapper } from "../element-wrapper";
import { AiFillEye } from "react-icons/ai";
import React from "react";
import { fetchUserData } from "../../../api/data";
import { useQuery } from "@tanstack/react-query";

type BlogElementProps = {
  id: string;
  userId: string;
  title: string;
  text: string;
  createdAt: string;
};

export const BlogElement: React.FC<BlogElementProps> = ({
  id,
  userId,
  title,
  text,
  createdAt,
}) => {
  const userQuery = useQuery({
    queryFn: () => fetchUserData(userId),
    queryKey: ["user"],
  });
  const userData = userQuery.data!;
  return (
    <ElementWrapper className="relative flex h-40 flex-col gap-y-5 sm:h-44">
      {userQuery.isSuccess && (
        <>
          <div className="text-xl">{title}</div>
          <Avatar
            image={userData.image}
            name={userData.name}
            date={createdAt}
          ></Avatar>
          <div className="overflow-hidden overflow-ellipsis text-sm">
            {text}
          </div>
        </>
      )}
      {userQuery.isLoading && <p>loading user data...</p>}
    </ElementWrapper>
  );
};
