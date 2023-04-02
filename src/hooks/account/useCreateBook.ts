import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addBook } from "../../api/service";
import { Router } from "../../components/router";
import { useUserContext } from "../../components/context/userContext";

const useCreateBook = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const {
    mutate: createBook,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: (data: any) => addBook(data),
    mutationKey: ["users", user?.id, "books"],
    onSuccess: () => {
      navigate(`${Router.users}/${user?.id}/${Router.books}`);
    },
  });

  return { createBook, isError, isLoading };
};

export default useCreateBook;
